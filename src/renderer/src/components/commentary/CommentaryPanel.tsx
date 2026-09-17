import { panelTextSizeAtom, bookAtom, chapterAtom, verseAtom } from '@renderer/store'
import { isLight } from '@renderer/utils/contrastColor'
import { BIBLE_COUNT_INFO } from '@shared/constants'
import { Bible } from '@shared/models'
import { useAtomValue } from 'jotai'
import { forwardRef, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'

type CommentaryPanelProps = {
  version: string
  backgroundColor: string
  textColor: string
}

export default function CommentaryPanel({
  version,
  backgroundColor,
  textColor
}: CommentaryPanelProps): JSX.Element {
  const verseRefs = useRef<null[] | HTMLElement[]>([]) // 각 절 HTML 요소의 참조 리스트

  const panelTextSize = useAtomValue(panelTextSizeAtom)
  const book = useAtomValue(bookAtom)
  const chapter = useAtomValue(chapterAtom)
  const verse = useAtomValue(verseAtom)

  const [bibleData, setBibleData] = useState<Bible[]>()
  const [lastVerse, setLastVerse] = useState<number>(0)

  // 각 절 렌더링
  const renderVerseList = (): JSX.Element[] | null => {
    const result: JSX.Element[] = []
    let verseCursor = 1

    if (!bibleData) return null

    bibleData.forEach(({ verse, btext }) => {
      for (let i = verseCursor; i < verse; i++) {
        result.push(
          <CommentaryText
            key={`empty-${i}`}
            ref={(el) => (verseRefs.current[i] = el)}
            verse={i}
            btext="없음"
            isLight={isLight(backgroundColor)}
          />
        )
      }

      result.push(
        <CommentaryText
          key={verse}
          ref={(el) => (verseRefs.current[verse] = el)}
          verse={verse}
          btext={btext}
          isLight={isLight(backgroundColor)}
        />
      )

      verseCursor = verse + 1
    })

    for (let i = verseCursor; i <= lastVerse; i++) {
      result.push(
        <CommentaryText
          key={`empty-${i}`}
          ref={(el) => (verseRefs.current[i] = el)}
          verse={i}
          btext="없음"
          isLight={isLight(backgroundColor)}
        />
      )
    }

    return result
  }

  useEffect(() => {
    const fetchBible = async (): Promise<void> => {
      const result = await window.context.findCommentary(version, book, chapter)
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
    if (bibleData && bibleData.length > 0) {
      const currentVerseRef = verseRefs.current
        .filter((el) => el instanceof HTMLElement)
        .find((el) => Number(el?.dataset?.verse) === verse)

      if (currentVerseRef) {
        currentVerseRef.scrollIntoView(true)
      }
    }
  }, [bibleData])

  useEffect(() => {
    if (bibleData && bibleData.length > 0) {
      const currentVerseRef = verseRefs.current
        .filter((el) => el instanceof HTMLElement)
        .find((el) => Number(el?.dataset?.verse) === verse)

      if (currentVerseRef) {
        currentVerseRef.scrollIntoView(true)
      }
    }
  }, [bibleData, verse])

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

type CommentaryTextProps = {
  verse: number
  btext: string
  isLight: boolean
}

const CommentaryText = forwardRef<HTMLDivElement, CommentaryTextProps>(
  ({ verse, btext, isLight }, ref) => {
    return (
      <div
        ref={ref}
        data-verse={verse}
        css={[tw`pl-[1em] mb-[0.25rem] -indent-[1em]`, verse === 1 && tw`pt-[0.25rem]`]}
      >
        <span css={[tw`whitespace-pre font-bold`, isLight ? tw`text-red-600` : tw`text-red-300`]}>
          {verse}{' '}
        </span>
        <span dangerouslySetInnerHTML={{ __html: btext }}></span>
      </div>
    )
  }
)
CommentaryText.displayName = 'CommentaryText'
