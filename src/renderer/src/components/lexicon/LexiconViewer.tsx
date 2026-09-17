import {
  lexicalCodeSearchParamsAtom,
  lexicalCodeSearchResultAtom,
  lexicalCodeTextSizeAtom,
  lexiconViewerAtom
} from '@renderer/store'
import { BOOK_INFO } from '@shared/constants'
import { useAtomValue } from 'jotai'
import tw, { TwStyle } from 'twin.macro'
import { forwardRef, Key, useEffect, useRef, useState } from 'react'
import { Bible } from '@shared/models'
import { formatNumberWithComma } from '@renderer/utils/numberFormat'
import Spinner from '../common/Spinner'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchLexicons } from '@renderer/api/lexicon'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { isLight } from '@renderer/utils/contrastColor'
import { IconBook, IconSearch } from '@tabler/icons-react'
import { resolveBibleRange } from '@renderer/utils/bibleRange'
import React from 'react'

export default function LexiconViewer(): JSX.Element {
  const keywordMatchedVersesRef = useRef<VirtuosoHandle>(null)
  const fullChaptersWithKeywordRef = useRef<HTMLDivElement>(null)

  const searchParams = useAtomValue(lexicalCodeSearchParamsAtom)
  const { version, bookRange, codes } = searchParams
  const searchResult = useAtomValue(lexicalCodeSearchResultAtom)
  const textSize = useAtomValue(lexicalCodeTextSizeAtom)
  const settings = useAtomValue(lexiconViewerAtom)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['lexicons', searchParams],
    queryFn: ({ pageParam = 1 }) => fetchLexicons({ pageParam, ...searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined
  })
  const verses: Bible[] = data?.pages.flatMap((p) => p.data) ?? []

  const [selectedBible, setSelectedBible] = useState<{
    version: string
    book: number
    chapter: number
    verse: number
  } | null>(null)
  const [bibleData, setBibleData] = useState<Bible[]>()
  const [bibleDataVersion, setBibleDataVersion] = useState<string>('')

  const searchRange = resolveBibleRange(bookRange[0], bookRange[1])

  useEffect(() => {
    if (keywordMatchedVersesRef.current) {
      keywordMatchedVersesRef.current.scrollToIndex({ index: 0 })
    }
  }, [searchResult])

  useEffect(() => {
    if (selectedBible == null) {
      return
    }

    ;(async (): Promise<void> => {
      const result = await window.context.findBible(
        selectedBible.version,
        selectedBible.book,
        selectedBible.chapter
      )
      setBibleDataVersion(selectedBible.version)
      setBibleData(result)
    })()
  }, [selectedBible])

  useEffect(() => {
    if (!bibleData || !selectedBible || !fullChaptersWithKeywordRef.current) return

    const selector = `[data-verse="${selectedBible.verse}"]`
    const targetElement = fullChaptersWithKeywordRef.current.querySelector(selector)

    if (targetElement) {
      targetElement.scrollIntoView(true)
    }
  }, [bibleData])

  return (
    <div className={`flex w-full text-[${textSize}px]`}>
      <div
        css={[
          tw`flex-1 overflow-hidden`,
          searchRange === 'ALL' && tw`!bg-amber-100`,
          searchRange === 'OT' && tw`!bg-green-100`,
          searchRange === 'NT' && tw`!bg-red-100`
        ]}
        style={{ backgroundColor: settings['keywordMatchedVerses'].backgroundColor }}
      >
        {searchParams && (
          <div
            css={[
              tw`flex flex-col p-16pxr`,
              searchRange || isLight(settings['keywordMatchedVerses'].backgroundColor)
                ? tw`text-black`
                : tw`text-white`
            ]}
          >
            <div>
              <IconBook className="inline-block w-[1em] h-[1em] mr-[0.25em]" />
              <span>
                {BOOK_INFO.find((el) => el.id === bookRange[0])?.shortName || ''}
                {' ~ '}
                {BOOK_INFO.find((el) => el.id === bookRange[1])?.shortName || ''} {`(${version})`}
                {' : '}
                {formatNumberWithComma(searchResult.totalCount)} 구절
              </span>
            </div>
            <CodeChips codes={codes} />
          </div>
        )}
        <div
          className="w-full h-[calc(100%-80px)]"
          style={{ color: settings['keywordMatchedVerses'].textColor }}
        >
          <VerseList
            ref={keywordMatchedVersesRef}
            verses={verses}
            version={version}
            codes={codes}
            isLight={!!searchRange || isLight(settings['keywordMatchedVerses'].backgroundColor)}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLabelClick={(version, book, chapter, verse) => {
              setSelectedBible({ version, book, chapter, verse })
            }}
          />
        </div>
      </div>
      <div
        ref={fullChaptersWithKeywordRef}
        className="flex-1 p-16pxr overflow-y-auto"
        style={{
          backgroundColor: settings['fullChaptersWithKeyword'].backgroundColor,
          color: settings['fullChaptersWithKeyword'].textColor
        }}
      >
        {bibleData
          ? bibleData.map(({ book, chapter, verse, btext }) => (
              <FullChaptersWithKeywordItem
                key={`${book}-${chapter}-${verse}`}
                version={bibleDataVersion}
                verse={verse}
                btext={btext}
                codes={codes}
                isLight={isLight(settings['fullChaptersWithKeyword'].backgroundColor)}
                isHighlighted={
                  selectedBible?.book === book &&
                  selectedBible?.chapter === chapter &&
                  selectedBible?.verse === verse
                }
              />
            ))
          : ''}
      </div>
    </div>
  )
}

const getHighlightColor = (index: number): TwStyle[] => {
  const textColors = [tw`text-rose-600`, tw`text-blue-600`, tw`text-purple-600`]

  return [tw`px-2pxr py-1pxr rounded-md bg-white shadow`, textColors[index]]
}

const normalizeCodeSlots = (codes?: string[]): string[] =>
  [0, 1, 2].map((i) => (codes?.[i] ?? '').trim().toUpperCase())

const slotIndexOf = (code: string, slots: string[]): number => {
  const target = (code ?? '').trim().toUpperCase()
  return slots.findIndex((s) => s !== '' && s === target)
}

// 원본 텍스트 파싱
export const parseRawText = (
  rawText: string,
  codes: string[],
  isLight: boolean
): (string | JSX.Element)[] => {
  const slots = normalizeCodeSlots(codes)
  const regex = /<W(H|G)(\d+[a-z]?)>/gi
  const parts = rawText.split(regex) // WH001 -> ['Text ', 'H', '001', ' More Text']

  return parts.map((part, index) => {
    if (index % 3 === 1) {
      const type = part // 'H' or 'G'
      const number = parts[index + 1]
      const code = `${type}${number}`.toUpperCase()
      const si = slotIndexOf(code, slots)
      const codeStyle =
        si >= 0
          ? [getHighlightColor(si), tw`text-[1em] font-bold`]
          : isLight
            ? tw`text-blue-600`
            : tw`text-white`

      return (
        <span key={index} css={[tw`px-[0.2em]`, codeStyle]}>
          {code}
        </span>
      )
    } else if (index % 3 === 2) {
      return ''
    }
    return part
  })
}

// 원본 텍스트 파싱 ('원어분해' 데이터 전용)
export const parseRawTextForLexicon = (
  rawText: string,
  codes: string[],
  isLight: boolean
): (string | JSX.Element)[] => {
  const slots = normalizeCodeSlots(codes)
  return rawText.split('*').map((line, li) => {
    const regex = /^\[(.*?)\] \((.*?) <W(H\d+[a-z]?|G\d+[a-z]?)> \[(.*?)\] (.*?)\)@(.*?) # (.*?)$/
    const m = line.trim().match(regex)
    if (!m) return ''

    const [, mainText, type, rawCode, rootText, pronunciation, grammar, meaning] = m
    const code = (rawCode ?? '').toUpperCase()
    const si = slotIndexOf(code, slots)
    const codeStyle =
      si >= 0
        ? [getHighlightColor(si), tw`text-[1em] font-bold underline`]
        : isLight
          ? tw`text-blue-600`
          : tw`text-white`

    return (
      <React.Fragment key={`lex-${li}`}>
        <span
          dir={code?.[0] === 'H' ? 'rtl' : undefined}
          style={{
            fontFamily: code?.[0] === 'H' ? 'Noto Serif Hebrew' : 'Noto Serif',
            unicodeBidi: code?.[0] === 'H' ? 'plaintext' : undefined
          }}
          className="text-[1.5em]"
        >
          {mainText}
        </span>
        ({type}
        <span css={[tw`px-[0.2em]`, codeStyle]}>{code}</span>
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
        <span>→&nbsp;</span>
        <span>{grammar}</span>
        <span>&nbsp;:&nbsp;</span>
        <span className="font-bold">{meaning}</span>
        <br />
      </React.Fragment>
    )
  })
}

function CodeChips({ codes }: { codes: string[] }): JSX.Element {
  const slots = normalizeCodeSlots(codes)
  return (
    <div>
      <IconSearch className="inline-block w-[1em] h-[1em] mr-[0.25em]" />
      {[0, 1, 2].map((i) =>
        slots[i] ? (
          <span key={`${i}-${slots[i]}`} css={[getHighlightColor(i), tw`mr-[0.25em] font-bold`]}>
            {slots[i]}
          </span>
        ) : null
      )}
    </div>
  )
}

const VerseListContent = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} {...props} className="p-16pxr" />
})
VerseListContent.displayName = 'VerseListContent'

const VerseListFooter = (): JSX.Element => <div className="h-16pxr" />

type VerseListProps = {
  verses: Bible[]
  version: string
  codes: string[]
  isLight: boolean
  fetchNextPage
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLabelClick: KeywordMatchedVersesItemProps['onLabelClick']
}

const VerseList = forwardRef<VirtuosoHandle, VerseListProps>(
  (
    {
      verses,
      version,
      codes,
      isLight,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      onLabelClick
    },
    ref
  ) => {
    return (
      <Virtuoso
        ref={ref}
        data={verses}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        itemContent={(_, { book, chapter, verse, btext }) => {
          return (
            <>
              <KeywordMatchedVersesItem
                version={version}
                book={book}
                chapter={chapter}
                verse={verse}
                btext={btext}
                codes={codes}
                isLight={isLight}
                onLabelClick={onLabelClick}
              />
              {isFetchingNextPage && (
                <div className="flex justify-center items-center gap-4pxr w-full pt-16pxr">
                  <p>로딩 중</p>
                  <Spinner />
                </div>
              )}
            </>
          )
        }}
        components={{
          List: VerseListContent,
          Footer: VerseListFooter
        }}
        className="overflow-y-scroll"
      />
    )
  }
)
VerseList.displayName = 'VerseList'

type KeywordMatchedVersesItemProps = {
  key?: Key | null | undefined
  version: string
  book: number
  chapter: number
  verse: number
  btext: string
  codes: string[]
  isLight: boolean
  onLabelClick: (version: string, book: number, chapter: number, verse: number) => void
}

const KeywordMatchedVersesItem = ({
  version,
  book,
  chapter,
  verse,
  btext,
  codes,
  isLight,
  onLabelClick
}: KeywordMatchedVersesItemProps): JSX.Element => {
  return (
    <div data-verse={verse} css={[tw`mb-[0.25rem]`, verse === 1 ? tw`pt-[0.25rem]` : '']}>
      <div className="flex flex-col">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onLabelClick(version, book, chapter, verse)
          }}
          css={[tw`w-fit font-bold`, isLight ? tw`text-red-600` : tw`text-red-300`]}
        >
          {`${BOOK_INFO.find((el) => el.id === book)?.shortName || ''} ${chapter}:${verse}`}
        </a>
        <span className="ml-[1em]">
          {version === '원어분해'
            ? parseRawTextForLexicon(btext, codes, isLight)
            : parseRawText(btext, codes, isLight)}
        </span>
      </div>
    </div>
  )
}

type FullChaptersWithKeywordItemProps = {
  key?: Key | null | undefined
  version: string
  verse: number
  btext: string
  codes: string[]
  isLight: boolean
  isHighlighted: boolean
}

const FullChaptersWithKeywordItem = ({
  version,
  verse,
  btext,
  codes,
  isLight,
  isHighlighted
}: FullChaptersWithKeywordItemProps): JSX.Element => {
  return (
    <div
      data-verse={verse}
      css={[
        tw`mb-[0.25rem]`,
        verse === 1 && tw`pt-[0.25rem]`,
        isHighlighted &&
          (isLight
            ? tw`rounded-lg bg-gray-800 text-yellow-400 shadow-sm shadow-gray-800`
            : tw`rounded-lg bg-gray-200 text-black shadow-sm shadow-gray-200`)
      ]}
    >
      <div className="flex">
        <span
          css={[
            tw`mr-[0.5em] font-bold`,
            isHighlighted
              ? isLight
                ? tw`text-red-300`
                : tw`text-red-600`
              : isLight
                ? tw`text-red-600`
                : tw`text-red-300`
          ]}
        >
          {verse}
        </span>
        <span>
          {version === '원어분해'
            ? parseRawTextForLexicon(btext, codes, isHighlighted ? !isLight : isLight)
            : parseRawText(btext, codes, isHighlighted ? !isLight : isLight)}
        </span>
      </div>
    </div>
  )
}
