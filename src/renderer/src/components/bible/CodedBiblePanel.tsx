import {
  panelTextSizeAtom,
  bookAtom,
  chapterAtom,
  verseAtom,
  lexicalCodeAtom,
  hasAutoScrolledBasePanelAtom
} from '@renderer/store'
import { isLight } from '@renderer/utils/contrastColor'
import { BIBLE_COUNT_INFO } from '@shared/constants'
import { normalizeLexicalCode } from '@shared/lexicalCode'
import { Bible } from '@shared/models'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { Neutral } from '../common/Neutral'

type CodedBiblePanelProps = {
  version: string
  isBase: boolean
  backgroundColor: string
  textColor: string
}

export default function CodedBiblePanel({
  version,
  isBase,
  backgroundColor,
  textColor
}: CodedBiblePanelProps): JSX.Element {
  const verseRefs = useRef<null[] | HTMLElement[]>([]) // 각 절 HTML 요소의 참조 리스트

  const panelTextSize = useAtomValue(panelTextSizeAtom)
  const [hasAutoScrolled, setHasAutoScrolled] = useAtom(hasAutoScrolledBasePanelAtom)
  const book = useAtomValue(bookAtom)
  const chapter = useAtomValue(chapterAtom)
  const [verse, setVerse] = useAtom(verseAtom)
  const setLexicalCodeRaw = useSetAtom(lexicalCodeAtom)
  const setLexicalCode = useCallback(
    (code: string): void => {
      setLexicalCodeRaw(normalizeLexicalCode(code))
    },
    [setLexicalCodeRaw]
  )

  const [bibleData, setBibleData] = useState<Bible[]>()
  const [lastVerse, setLastVerse] = useState<number>(0)
  const [visibleVerseList, setVisibleVerseList] = useState<number[]>([]) // 화면에 보이는 절 숫자 리스트

  // 각 절 렌더링
  const renderVerseList = (): JSX.Element[] | null => {
    const result: JSX.Element[] = []
    let verseCursor = 1

    if (!bibleData) return null

    bibleData.forEach(({ verse, btext }) => {
      for (let i = verseCursor; i < verse; i++) {
        result.push(
          <CodedBibleText
            key={`empty-${i}`}
            ref={(el) => (verseRefs.current[i] = el)}
            version={version}
            verse={i}
            btext="없음"
            isLight={isLight(backgroundColor)}
            setLexicalCode={setLexicalCode}
          />
        )
      }

      result.push(
        <CodedBibleText
          key={verse}
          ref={(el) => (verseRefs.current[verse] = el)}
          version={version}
          verse={verse}
          btext={btext}
          isLight={isLight(backgroundColor)}
          setLexicalCode={setLexicalCode}
        />
      )

      verseCursor = verse + 1
    })

    for (let i = verseCursor; i <= lastVerse; i++) {
      result.push(
        <CodedBibleText
          key={`empty-${i}`}
          ref={(el) => (verseRefs.current[i] = el)}
          version={version}
          verse={i}
          btext="없음"
          isLight={isLight(backgroundColor)}
          setLexicalCode={setLexicalCode}
        />
      )
    }

    return result
  }

  // 옵저버 콜백 함수
  const handleObserver = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        setVisibleVerseList((prev) =>
          entry.isIntersecting
            ? [...prev, Number(entry.target.dataset.verse)]
            : prev.filter((el) => el !== Number(entry.target.dataset.verse))
        )
      })
    },
    [bibleData]
  )

  // 옵저버
  const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 })

  useEffect(() => {
    const fetchBible = async (): Promise<void> => {
      const result = await window.context.findBible(version, book, chapter)
      setBibleData(result)
    }
    if (version && book && chapter) fetchBible()
  }, [version, book, chapter])

  useEffect(() => {
    setLastVerse(
      BIBLE_COUNT_INFO.filter((el) => el.book === book).filter((el) => el.chapter === chapter)[0]
        .lastVerse || 0
    )
  }, [book, chapter])

  // 각 절에 옵저버 적용
  // 선택한 절이 최상단에 보이도록 처리
  useEffect(() => {
    verseRefs.current.forEach((el) => {
      if (el instanceof HTMLElement) observer.observe(el)
    })

    if (bibleData && bibleData.length > 0) {
      const currentVerseRef = verseRefs.current
        .filter((el) => el instanceof HTMLElement)
        .find((el) => Number(el?.dataset?.verse) === verse)

      if (currentVerseRef) {
        currentVerseRef.scrollIntoView(true)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [bibleData])

  // 최상단에 보이는 절을 기준으로 verse State 업데이트
  useEffect(() => {
    if (isBase && bibleData && bibleData.length > 0) {
      const topMostVisibleVerse = visibleVerseList.sort((a, b) => a - b)[0]
      if (topMostVisibleVerse) {
        setVerse(topMostVisibleVerse)
      }
    }
  }, [isBase, bibleData, visibleVerseList])

  useEffect(() => {
    if (bibleData && bibleData.length > 0) {
      const currentVerseRef = verseRefs.current
        .filter((el) => el instanceof HTMLElement)
        .find((el) => Number(el?.dataset?.verse) === verse)

      if (isBase && !hasAutoScrolled && currentVerseRef) {
        currentVerseRef.scrollIntoView(true)
        setHasAutoScrolled(true)
      }

      if (!isBase && currentVerseRef) {
        currentVerseRef.scrollIntoView(true)
      }
    }
  }, [isBase, bibleData, verse])

  return (
    <div className="overflow-y-auto" style={{ backgroundColor }}>
      {bibleData && (
        <div className={`px-16pxr text-[${panelTextSize}px]`} style={{ color: textColor }}>
          {renderVerseList()}
        </div>
      )}
      <div className="h-screen" />
    </div>
  )
}

// 원본 텍스트 파싱
const parseRawText = (
  rawText: string,
  isLight: boolean,
  onCodeClick: (code: string) => void
): (string | JSX.Element)[] => {
  const regex = /<W(H|G)(\d+[a-z]?)>/g
  const parts = rawText.split(regex) // WH001 -> ['Text ', 'H', '001', ' More Text']

  return parts.map((part, index) => {
    if (index % 3 === 1) {
      const type = part // 'H' 또는 'G'
      const number = parts[index + 1] // '001'
      const code = `${type}${number}` // 'H001'

      return (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onCodeClick(code)
          }}
          css={[tw`px-[0.2em] cursor-pointer`, isLight ? tw`text-blue-600` : tw`text-white`]}
        >
          {code}
        </a>
      )
    } else if (index % 3 === 2) {
      return ''
    }

    return part
  })
}

// 원본 텍스트 파싱 ('원어분해' 데이터 전용)
const parseRawTextForLexicon = (
  rawText: string,
  isLight: boolean,
  onCodeClick: (code: string) => void
): (string | JSX.Element)[] => {
  return rawText.split('*').map((line) => {
    const regex = /^\[(.*?)\] \((.*?) <W(H\d+[a-z]?|G\d+[a-z]?)> \[(.*?)\] (.*?)\)@(.*?) # (.*?)$/
    const match = line.trim().match(regex)

    if (!match) {
      return ''
    }

    const [, mainText, type, code, rootText, pronunciation, grammar, meaning] = match

    return (
      <>
        <a
          dir={code?.[0] === 'H' ? 'rtl' : undefined}
          style={{
            fontFamily: code?.[0] === 'H' ? 'Noto Serif Hebrew' : 'Noto Serif',
            unicodeBidi: code?.[0] === 'H' ? 'plaintext' : undefined
          }}
          className="text-[1.5em]"
        >
          {mainText}
        </a>
        ({type}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onCodeClick(code)
          }}
          css={[tw`px-[0.2em] cursor-pointer`, isLight ? tw`text-blue-600` : tw`text-white`]}
        >
          {code}
        </a>
        <span
          dir={code?.[0] === 'H' ? 'rtl' : undefined}
          style={{
            fontFamily: code?.[0] === 'H' ? 'Noto Serif Hebrew' : 'Noto Serif',
            unicodeBidi: code?.[0] === 'H' ? 'plaintext' : undefined
          }}
          className="text-[1.5em]"
        >
          {rootText}
        </span>
        {pronunciation})
        <br />
        <Neutral>→&nbsp;</Neutral>
        <span>{grammar}</span>
        <Neutral>&nbsp;:&nbsp;</Neutral>
        <span className="font-bold text-red-500">{meaning}</span>
        <br />
      </>
    )
  })
}

type CodedBibleTextProps = {
  version: string
  verse: number
  btext: string
  isLight: boolean
  setLexicalCode: (code: string) => void
}

const CodedBibleText = forwardRef<HTMLDivElement, CodedBibleTextProps>(
  ({ version, verse, btext, isLight, setLexicalCode: setLexicalCode }, ref) => {
    return (
      <div
        ref={ref}
        data-verse={verse}
        css={[tw`pl-[1em] mb-[0.25rem] -indent-[1em]`, verse === 1 && tw`pt-[0.25rem]`]}
      >
        <span css={[tw`whitespace-pre font-bold`, isLight ? tw`text-red-600` : tw`text-red-300`]}>
          {verse}{' '}
        </span>
        <span>
          {version === '원어분해'
            ? parseRawTextForLexicon(btext, isLight, setLexicalCode)
            : parseRawText(btext, isLight, setLexicalCode)}
        </span>
      </div>
    )
  }
)
CodedBibleText.displayName = 'CodedBibleText'
