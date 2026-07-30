import { hymnPageViewModeAtom, hymnSearchParamsAtom, hymnSearchResultAtom } from '@renderer/store'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import Button from '../common/Button2'
import { IconSearch } from '@tabler/icons-react'
import tw, { TwStyle } from 'twin.macro'

const FIXED_INPUT_COUNT = 3
const AUTOCALL_DELAY_MS = 500 // 디바운스 지연 시간

export default function HymnKeywordSearch(): JSX.Element {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [searchParams, setSearchParams] = useAtom(hymnSearchParamsAtom)
  const setHymnSearchResult = useSetAtom(hymnSearchResultAtom)
  const [hymnPageViewMode, setHymnPageViewModeAtom] = useAtom(hymnPageViewModeAtom)
  const { keywords } = searchParams

  const [tempSearchParams, setTempSearchParams] = useState(searchParams)
  const { keywords: tempKeywords } = tempSearchParams

  const handleKeywordChange = (index: number, value: string): void => {
    const updatedKeywords = [...tempKeywords]
    updatedKeywords[index] = value
    setTempSearchParams({ ...tempSearchParams, keywords: updatedKeywords })
  }

  const handleSearchHymn = async (): Promise<void> => {
    setSearchParams(tempSearchParams)
    const result = await window.context.findKeywordFromHymn(tempSearchParams)
    if (result) {
      setHymnSearchResult(result)
      setHymnPageViewModeAtom('search')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Enter') {
      handleSearchHymn()
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
    if (hymnPageViewMode !== 'search') return

    handleSearchHymn()

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
      handleSearchHymn()
    }, AUTOCALL_DELAY_MS)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [tempKeywords])

  return (
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
      <Button type="button" onClick={handleSearchHymn} size="icon">
        <IconSearch size={18} />
      </Button>
    </div>
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
