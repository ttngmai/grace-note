import { themeAtom, themeViewerAtom } from '@renderer/store'
import { isLight } from '@renderer/utils/contrastColor'
import { ThemeIdAndWord } from '@shared/models'
import { useAtom, useAtomValue } from 'jotai'
import { forwardRef, Key, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import tw from 'twin.macro'

const AUTOCALL_DELAY_MS = 250 // 디바운스 지연

export default function ThemeSearch(): JSX.Element {
  const keywordInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<VirtuosoHandle>(null)
  const inflightTokenRef = useRef(0) // 레이스 가드용 토큰

  // 추가: 자동 호출 디바운스 타이머 & 자동호출 일시정지 키워드
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoPauseKeywordRef = useRef<string | null>(null) // 이 키워드에선 자동 호출 정지

  const [theme, setTheme] = useAtom(themeAtom)
  const settings = useAtomValue(themeViewerAtom)

  const [keyword, setKeyword] = useState<string>('')
  const [themeIdAndWordList, setThemeIdAndWordList] = useState<ThemeIdAndWord[]>([])

  const deferredKeyword = useDeferredValue(keyword.trim().toLowerCase())

  const handleSelectTheme = async (id: string): Promise<void> => {
    // 이미 선택된 항목이면 추가 조회 방지
    if (theme?.id != null && String(theme.id) === id) return

    const myToken = ++inflightTokenRef.current
    const result = await window.context.findThemeById(Number(id))
    // 최신 호출만 반영
    if (myToken === inflightTokenRef.current && result) {
      setTheme(result)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      keywordInputRef.current?.focus()
      keywordInputRef.current?.select()
    }, 0)
  }, [])

  useEffect(() => {
    ;(async (): Promise<void> => {
      const result = await window.context.findThemeIdAndWord()
      setThemeIdAndWordList(result)
    })()
  }, [])

  // 1) 최상단 일치 항목 계산 (완전일치 > 접두일치 > 포함일치)
  const { bestMatchIndex, bestMatchId } = useMemo(() => {
    if (!deferredKeyword) return { bestMatchIndex: -1, bestMatchId: null as string | null }

    const lower = deferredKeyword
    const idxEq = themeIdAndWordList.findIndex(({ word_ko }) => word_ko.toLowerCase() === lower)
    if (idxEq !== -1)
      return { bestMatchIndex: idxEq, bestMatchId: String(themeIdAndWordList[idxEq].id) }

    const idxStarts = themeIdAndWordList.findIndex(({ word_ko }) =>
      word_ko.toLowerCase().startsWith(lower)
    )
    if (idxStarts !== -1)
      return { bestMatchIndex: idxStarts, bestMatchId: String(themeIdAndWordList[idxStarts].id) }

    const idxIncl = themeIdAndWordList.findIndex(({ word_ko }) =>
      word_ko.toLowerCase().includes(lower)
    )
    if (idxIncl !== -1)
      return { bestMatchIndex: idxIncl, bestMatchId: String(themeIdAndWordList[idxIncl].id) }

    return { bestMatchIndex: -1, bestMatchId: null }
  }, [deferredKeyword, themeIdAndWordList])

  // 2) 스크롤 이동
  useEffect(() => {
    if (bestMatchIndex !== -1) {
      listRef.current?.scrollToIndex({ index: bestMatchIndex, align: 'start' })
    }
  }, [bestMatchIndex])

  // 3) 디바운스 자동 조회 호출 (수동 클릭과 충돌 방지)
  useEffect(() => {
    if (!bestMatchId) return
    // 현재 선택과 같으면 재조회하지 않음
    if (theme?.id != null && String(theme.id) === bestMatchId) return

    // 수동클릭 이후, 같은 키워드에 대해서는 자동 호출 금지
    if (autoPauseKeywordRef.current === deferredKeyword) return

    // 기존 예약 제거 후 새로 예약
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = setTimeout(() => {
      // keyword가 비어있지 않을 때만 자동 호출 (비우면 호출 안 함)
      if (deferredKeyword) {
        handleSelectTheme(bestMatchId)
      }
    }, AUTOCALL_DELAY_MS)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
    }
  }, [bestMatchId, deferredKeyword, theme?.id])

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: settings['themeIndex'].backgroundColor }}
    >
      <input
        ref={keywordInputRef}
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          // 사용자가 검색어를 바꾸면 자동 호출 정지 해제
          autoPauseKeywordRef.current = null
        }}
        className="inline-flex justify-center items-center h-32pxr p-4pxr m-16pxr border-2 border-blue-500 rounded-md"
      />
      <div
        className="h-full"
        style={{
          color: settings['themeIndex'].textColor
        }}
      >
        <ThemeList
          ref={listRef}
          idAndWords={themeIdAndWordList}
          selectedId={theme?.id == null ? null : String(theme.id)}
          isLight={isLight(settings['themeIndex'].backgroundColor)}
          onItemClick={(id: string, word_ko: string) => {
            // 1) 자동 호출 예약 제거
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current)
              debounceTimerRef.current = null
            }
            // 2) 클릭으로 채운 동일 키워드에 대해 자동 호출 금지 (소문자/트리밍 일치)
            const lowered = word_ko.trim().toLowerCase()
            autoPauseKeywordRef.current = lowered
            // 3) input value 를 클릭한 항목의 word_ko 로 즉시 세팅
            setKeyword(word_ko)
            // 4) 이미 선택된 항목이 아니면 즉시 조회, 불필요한 호출은 방지
            if (theme?.id == null || String(theme.id) !== id) {
              handleSelectTheme(id)
            }
          }}
        />
      </div>
    </div>
  )
}

type ThemeListProps = {
  idAndWords: ThemeIdAndWord[]
  selectedId: string | null
  isLight: boolean
  onItemClick: ThemeItemProps['onClick']
}

const ThemeListWrapper = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} {...props} className="flex-1 pl-16pxr" />
})
ThemeListWrapper.displayName = 'ThemeListWrapper'

const ThemeList = forwardRef<VirtuosoHandle, ThemeListProps>(
  ({ idAndWords, selectedId, isLight, onItemClick }, ref) => {
    return (
      <Virtuoso
        ref={ref}
        data={idAndWords}
        itemContent={(_, { id, word_ko }) => (
          <ThemeItem
            id={String(id)}
            word={word_ko}
            selectedId={selectedId}
            isLight={isLight}
            onClick={onItemClick}
          />
        )}
        components={{ List: ThemeListWrapper }}
      />
    )
  }
)
ThemeList.displayName = 'ThemeList'

type ThemeItemProps = {
  key?: Key | null | undefined
  id: string
  word: string
  selectedId: string | null
  isLight: boolean
  onClick: (id: string, word: string) => void
}

const ThemeItem = forwardRef<HTMLLIElement, ThemeItemProps>(
  ({ id, word, selectedId, isLight, onClick }, ref) => (
    <li
      ref={ref}
      onClick={() => onClick(id, word)}
      css={[
        tw`flex h-28pxr py-4pxr text-[14px] select-none list-none cursor-pointer hover:font-bold`,
        isLight ? tw`hover:text-red-600` : tw`hover:text-white`,
        selectedId &&
          selectedId === id &&
          (isLight ? tw`font-bold text-red-600` : tw`font-bold text-white`)
      ]}
    >
      {word}
    </li>
  )
)
ThemeItem.displayName = 'ThemeItem'
