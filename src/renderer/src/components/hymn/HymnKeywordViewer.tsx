import {
  hymnAtom,
  hymnPageViewModeAtom,
  hymnSearchParamsAtom,
  hymnSearchResultAtom,
  hymnViewerAtom,
  hymnTextSizeAtom
} from '@renderer/store'
import { Hymn } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { forwardRef, useRef } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import Spinner from '../common/Spinner'
import { formatNumberWithComma } from '@renderer/utils/numberFormat'
import tw, { TwStyle } from 'twin.macro'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchHymns } from '@renderer/api/hymn'
import { isLight } from '@renderer/utils/contrastColor'

export default function HymnKeywordViewer(): JSX.Element {
  const keywordMatchedHymnRef = useRef<VirtuosoHandle>(null)

  const searchParams = useAtomValue(hymnSearchParamsAtom)
  const { keywords } = searchParams
  const hymnSearchResult = useAtomValue(hymnSearchResultAtom)
  const setHymn = useSetAtom(hymnAtom)
  const setHymnPageViewModeAtom = useSetAtom(hymnPageViewModeAtom)
  const textSize = useAtomValue(hymnTextSizeAtom)
  const settings = useAtomValue(hymnViewerAtom)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['hymns', searchParams],
    queryFn: ({ pageParam = 1 }) => fetchHymns({ pageParam, ...searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined
  })
  const hymns: Hymn[] = data?.pages.flatMap((p) => p.data) ?? []

  const handleSearchHymnByHymnNumber = async (hymnNumber: string): Promise<void> => {
    const result = await window.context.findHymn(hymnNumber.trim())
    if (result && result.length > 0) {
      setHymn(result[0])
      setHymnPageViewModeAtom('score')
    }
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 overflow-hidden">
        {searchParams && (
          <div
            css={[
              tw`flex flex-col p-16pxr`,
              isLight(settings['hymn'].backgroundColor) ? tw`text-black` : tw`text-white`
            ]}
          >
            <div>
              ◆ 새찬송가
              {' : '}
              {formatNumberWithComma(hymnSearchResult.totalCount)} 장
            </div>
            <KeywordChips keywords={keywords} />
          </div>
        )}
        <div className="w-full h-[calc(100%-80px)]" style={{ color: settings['hymn'].textColor }}>
          <HymnList
            ref={keywordMatchedHymnRef}
            hymns={hymns}
            keywords={keywords}
            textSize={textSize}
            isLight={isLight(settings['hymn'].backgroundColor)}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLabelClick={handleSearchHymnByHymnNumber}
          />
        </div>
      </div>
    </div>
  )
}

const getHighlightColor = (index: number): TwStyle[] => {
  const textColors = [tw`text-rose-600`, tw`text-blue-600`, tw`text-purple-600`]

  return [tw`px-2pxr py-1pxr rounded-md bg-white shadow`, textColors[index]]
}

const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const normalizeKeywordSlots = (kw?: string[]): string[] =>
  [0, 1, 2].map((i) => (kw?.[i] ?? '').trim())

const highlightKeywords = (text: string, keywords: string[]): (string | JSX.Element)[] => {
  if (!text) return ['']
  const slots = normalizeKeywordSlots(keywords)

  const indexed = slots
    .map((word, slot) => ({ word: word.trim(), slot }))
    .filter((k) => k.word.length > 0)
    .sort((a, b) => b.word.length - a.word.length)

  if (indexed.length === 0) return [text]

  const pattern = indexed.map((k) => escapeRegExp(k.word)).join('|')
  const re = new RegExp(`(${pattern})`, 'gi')

  const parts = text.split(re)
  return parts
    .filter((p) => p !== '')
    .map((part, i) => {
      const match = indexed.find((k) => k.word.toLowerCase() === part.toLowerCase())
      if (match) {
        const css = [...getHighlightColor(match.slot), tw`font-bold`]
        return (
          <span key={`kw-${i}`} css={css}>
            {part}
          </span>
        )
      }
      return part
    })
}

function KeywordChips({ keywords }: { keywords: string[] }): JSX.Element {
  const slots = normalizeKeywordSlots(keywords)
  return (
    <div className="flex gap-[0.25em]">
      ◎
      {[0, 1, 2].map((i) => {
        const k = slots[i]
        if (!k) return null
        return (
          <span key={`${i}-${k}`} css={[getHighlightColor(i), tw`font-bold`]}>
            {k}
          </span>
        )
      })}
    </div>
  )
}

const HymnListContent = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} {...props} className="p-16pxr" />
})
HymnListContent.displayName = 'HymnListContent'

const HymnListFooter = (): JSX.Element => <div className="h-16pxr" />

type HymnListProps = {
  hymns: Hymn[]
  keywords: string[]
  textSize: number
  isLight: boolean
  fetchNextPage
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLabelClick: (hymnNumber: string) => void
}

const HymnList = forwardRef<VirtuosoHandle, HymnListProps>(
  (
    {
      hymns,
      keywords,
      textSize,
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
        data={hymns}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        itemContent={(_, { hymn_number, title, lyrics }) => {
          return (
            <>
              <div className={`w-fit p-16pxr text-[${textSize}px]`}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onLabelClick(hymn_number)
                  }}
                  css={[tw`block w-fit font-bold`, isLight ? tw`text-blue-600` : tw`text-white`]}
                >
                  {`${hymn_number}. ${title}`}
                </a>
                <br />
                <LyricsRenderer
                  hymnNumber={Number(hymn_number)}
                  lyrics={lyrics}
                  keywords={keywords}
                />
              </div>
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
          List: HymnListContent,
          Footer: HymnListFooter
        }}
        className="overflow-y-scroll"
      />
    )
  }
)
HymnList.displayName = 'HymnList'

type LyricsRendererProps = {
  hymnNumber: number
  lyrics: string
  keywords: string[]
}

export const LyricsRenderer: React.FC<LyricsRendererProps> = ({
  hymnNumber,
  lyrics,
  keywords
}: LyricsRendererProps) => {
  if (!lyrics) return null

  if (hymnNumber >= 701) {
    const lines = htmlToPlainText(lyrics).split('\n')

    return lines.map((line, index) => {
      const trimmedLine = line.trim()

      return <p key={index}>{highlightKeywords(trimmedLine, keywords)}</p>
    })
  }

  const lines = lyrics.split('\n')

  return (
    <div>
      {lines.map((line, index) => {
        const trimmedLine = line.trim()

        if (trimmedLine === '') {
          return <br key={index} />
        }

        const isSectionHeader = /^(후렴|\d+절)/.test(trimmedLine)

        return (
          <p key={index}>
            {isSectionHeader ? <b>{trimmedLine}</b> : highlightKeywords(trimmedLine, keywords)}
          </p>
        )
      })}
    </div>
  )
}

const htmlToPlainText = (html?: string): string => {
  if (!html) return ''

  const withNewlines = html.replace(/<br\s*\/?>/gi, '\n')

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const div = document.createElement('div')
    div.innerHTML = withNewlines
    return div.textContent || ''
  }

  const stripped = withNewlines.replace(/<\/?[^>]+>/g, '')
  return stripped
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
}
