import {
  bibleVerseSearchParamsAtom,
  bibleVerseSearchResultAtom,
  bibleVerseTextSizeAtom,
  bibleVerseViewerAtom
} from '@renderer/store'
import { BOOK_INFO } from '@shared/constants'
import { useAtomValue } from 'jotai'
import { forwardRef, Key, useEffect, useRef, useState } from 'react'
import tw, { TwStyle } from 'twin.macro'
import { Bible } from '@shared/models'
import { formatNumberWithComma } from '@renderer/utils/numberFormat'
import Spinner from '../common/Spinner'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBibleVerses } from '@renderer/api/bible'
import { IconBook, IconSearch } from '@tabler/icons-react'
import { isLight } from '@renderer/utils/contrastColor'
import { resolveBibleRange } from '@renderer/utils/bibleRange'

export default function BibleVerseViewer(): JSX.Element {
  const keywordMatchedVersesRef = useRef<VirtuosoHandle>(null)
  const fullChaptersWithKeywordRef = useRef<HTMLDivElement>(null)

  const searchParams = useAtomValue(bibleVerseSearchParamsAtom)
  const { version, bookRange, keywords } = searchParams
  const searchResult = useAtomValue(bibleVerseSearchResultAtom)
  const textSize = useAtomValue(bibleVerseTextSizeAtom)
  const settings = useAtomValue(bibleVerseViewerAtom)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['bibleVerses', searchParams],
    queryFn: ({ pageParam = 1 }) => fetchBibleVerses({ pageParam, ...searchParams }),
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
            <KeywordChips keywords={keywords} />
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
            keywords={keywords}
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
                verse={verse}
                btext={btext}
                keywords={keywords}
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

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const highlightKeywords = (text: string, keywords: string[]): (string | JSX.Element)[] => {
  if (!text || !keywords || keywords.length === 0) return [text]

  const indexed = keywords
    .map((raw, slot) => ({ word: (raw ?? '').trim(), slot }))
    .filter((k) => k.word.length > 0)
    .sort((a, b) => b.word.length - a.word.length)

  if (indexed.length === 0) return [text]

  const pattern = indexed.map((k) => escapeRegExp(k.word)).join('|')
  const re = new RegExp(`(${pattern})`, 'gi')

  const parts = text.split(re)

  return parts
    .filter((p) => p !== '')
    .map((part, i) => {
      const matched = indexed.find((k) => k.word.toLowerCase() === part.toLowerCase())
      if (matched) {
        const keywordStyle = [...getHighlightColor(matched.slot), tw`font-bold`]
        return (
          <span key={`kw-${i}`} css={keywordStyle}>
            {part}
          </span>
        )
      }
      return part
    })
}

function KeywordChips({ keywords }: { keywords: string[] }): JSX.Element {
  return (
    <div>
      <IconSearch className="inline-block w-[1em] h-[1em] mr-[0.25em]" />
      {[0, 1, 2].map((i) => {
        const kw = (keywords?.[i] ?? '').trim()
        if (!kw) return null
        return (
          <span key={`${i}-${kw}`} css={[getHighlightColor(i), tw`mr-[0.25em] font-bold`]}>
            {kw}
          </span>
        )
      })}
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
  keywords: string[]
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
      keywords,
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
                keywords={keywords}
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
  keywords: string[]
  isLight: boolean
  onLabelClick: (version: string, book: number, chapter: number, verse: number) => void
}

const KeywordMatchedVersesItem = forwardRef<HTMLDivElement, KeywordMatchedVersesItemProps>(
  ({ version, book, chapter, verse, btext, keywords, isLight, onLabelClick }, ref) => {
    return (
      <div
        ref={ref}
        data-verse={verse}
        css={[tw`mb-[0.25rem]`, verse === 1 ? tw`pt-[0.25rem]` : '']}
      >
        <div className="flex flex-col">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onLabelClick(version, book, chapter, verse)
            }}
            css={[tw`w-fit font-bold`, isLight ? tw`text-blue-600` : tw`text-white`]}
          >
            {`${BOOK_INFO.find((el) => el.id === book)?.shortName || ''} ${chapter}:${verse}`}
          </a>
          <span className="ml-[1em]">{highlightKeywords(btext, keywords)}</span>
        </div>
      </div>
    )
  }
)
KeywordMatchedVersesItem.displayName = 'KeywordMatchedVersesItem'

type FullChaptersWithKeywordItemProps = {
  key?: Key | null | undefined
  verse: number
  btext: string
  keywords: string[]
  isLight: boolean
  isHighlighted: boolean
}

const FullChaptersWithKeywordItem = ({
  verse,
  btext,
  keywords,
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
            tw`mr-[0.5em]`,
            isHighlighted
              ? isLight
                ? tw`text-white`
                : tw`text-blue-600`
              : isLight
                ? tw`text-blue-600`
                : tw`text-white`
          ]}
        >
          {verse}
        </span>
        <span>{highlightKeywords(btext, keywords)}</span>
      </div>
    </div>
  )
}
