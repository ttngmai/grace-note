import { bibleVerseSearchParamsAtom, bibleVerseSearchResultAtom } from '@renderer/store'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import CustomSelect from '../common/CustomSelect'
import { PANEL_CATEGORIES_AND_VERSIONS } from '@shared/constants'
import { FindKeywordFromBibleParams, PanelCategory } from '@shared/types'
import BibleRangeSelector from './BibleRangeSelector'
import { IconSearch } from '@tabler/icons-react'
import Button from '../common/Button2'
import tw, { TwStyle } from 'twin.macro'

const FIXED_INPUT_COUNT = 3
const AUTOCALL_DELAY_MS = 500 // 디바운스 지연 시간

export default function BibleVerseSearch(): JSX.Element {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [searchParams, setSearchParams] = useAtom(bibleVerseSearchParamsAtom)
  const setBibleVerseSearchResult = useSetAtom(bibleVerseSearchResultAtom)
  const { keywords } = searchParams

  const [tempSearchParams, setTempSearchParams] = useState(searchParams)
  const { keywords: tempKeywords } = tempSearchParams

  const handleKeywordChange = (index: number, value: string): void => {
    const updatedKeywords = [...tempKeywords]
    updatedKeywords[index] = value
    setTempSearchParams({ ...tempSearchParams, keywords: updatedKeywords })
  }

  const handleSearchBibleVerse = async (condition: FindKeywordFromBibleParams): Promise<void> => {
    setSearchParams(condition)
    const result = await window.context.findKeywordFromBible(condition)
    if (result) {
      setBibleVerseSearchResult(result)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Enter') {
      handleSearchBibleVerse(tempSearchParams)
      return
    }

    const input = e.currentTarget
    const cursorPosition = input.selectionStart || 0
    const valueLength = input.value.length

    // 왼쪽 방향키: 커서가 맨 앞에 있을 때만 이전 input으로 이동
    if (e.key === 'ArrowLeft' && cursorPosition === 0) {
      e.preventDefault()
      const prevIndex = index === 0 ? FIXED_INPUT_COUNT - 1 : index - 1
      inputRefs.current[prevIndex]?.focus()
      inputRefs.current[prevIndex]?.setSelectionRange(
        inputRefs.current[prevIndex]?.value.length || 0,
        inputRefs.current[prevIndex]?.value.length || 0
      )
      return
    }

    // 오른쪽 방향키: 커서가 맨 뒤에 있을 때만 다음 input으로 이동
    if (e.key === 'ArrowRight' && cursorPosition === valueLength) {
      e.preventDefault()
      const nextIndex = index === FIXED_INPUT_COUNT - 1 ? 0 : index + 1
      inputRefs.current[nextIndex]?.focus()
      inputRefs.current[nextIndex]?.setSelectionRange(0, 0)
      return
    }
  }

  useEffect(() => {
    handleSearchBibleVerse(tempSearchParams)

    setTimeout(() => {
      inputRefs.current[0]?.focus()
      inputRefs.current[0]?.select()
    }, 0)
  }, [])

  useEffect(() => {
    if (keywords.length !== FIXED_INPUT_COUNT) {
      const newKeywords = [...keywords]
      while (newKeywords.length < FIXED_INPUT_COUNT) {
        newKeywords.push('')
      }
      setTempSearchParams({
        ...searchParams,
        keywords: newKeywords.slice(0, FIXED_INPUT_COUNT)
      })
    }
  }, [keywords, setTempSearchParams])

  // 자동 검색을 위한 디바운스 효과
  useEffect(() => {
    // 이전 타이머가 있으면 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 키워드가 모두 비어있으면 검색하지 않음
    const hasValidKeywords = tempKeywords.some((keyword) => keyword.trim() !== '')
    if (!hasValidKeywords) {
      return
    }

    // 디바운스 타이머 설정
    debounceTimerRef.current = setTimeout(() => {
      handleSearchBibleVerse(tempSearchParams)
    }, AUTOCALL_DELAY_MS)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [tempKeywords])

  return (
    <>
      <div className="flex flex-col gap-8pxr">
        <div className="flex gap-8pxr">
          <CustomSelect
            value={tempSearchParams.version}
            itemList={PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.BIBLE].map((version: string) => ({
              key: version,
              value: version,
              text: version
            }))}
            setValue={(value) => {
              setTempSearchParams({ ...tempSearchParams, version: value })
              handleSearchBibleVerse({ ...tempSearchParams, version: value })
            }}
          />
          <BibleRangeSelector
            placeholder="검색 범위 선택"
            initialValue={{
              start: tempSearchParams.bookRange[0],
              end: tempSearchParams.bookRange[1]
            }}
            onSelect={(start, end) => {
              setTempSearchParams({ ...tempSearchParams, bookRange: [start, end] })
              handleSearchBibleVerse({ ...tempSearchParams, bookRange: [start, end] })
            }}
          />
        </div>

        <div className="flex items-center shrink-0 w-fit gap-8pxr">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              value={tempKeywords[index] || ''}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`lexical-code-${index}`}
              css={getKeywordInputStyle(index)}
            ></input>
          ))}
          <Button
            type="button"
            onClick={() => handleSearchBibleVerse(tempSearchParams)}
            size="icon"
          >
            <IconSearch size={18} />
          </Button>
        </div>
      </div>
    </>
  )
}

const getKeywordInputStyle = (index: number): TwStyle[] => {
  const inputColors = [
    tw`border-rose-600 text-rose-600 focus:border-rose-600`,
    tw`border-blue-600 text-blue-600 focus:border-blue-600`,
    tw`border-purple-600 text-purple-600 focus:border-purple-600`
  ]

  return [
    tw`inline-flex justify-center items-center w-80pxr h-32pxr p-4pxr border-2 rounded-md text-center font-bold`,
    inputColors[index]
  ]
}
