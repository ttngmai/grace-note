import { lexicalCodeSearchParamsAtom, lexicalCodeSearchResultAtom } from '@renderer/store'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import Button from '../common/Button2'
import { IconSearch } from '@tabler/icons-react'
import CustomSelect from '../common/CustomSelect'
import { PANEL_CATEGORIES_AND_VERSIONS } from '@shared/constants'
import { normalizeLexicalCode } from '@shared/lexicalCode'
import { FindLexicalCodeFromBibleParams, PanelCategory } from '@shared/types'
import BibleRangeSelector from '../bible/BibleRangeSelector'
import tw, { TwStyle } from 'twin.macro'

const FIXED_INPUT_COUNT = 3
const AUTOCALL_DELAY_MS = 500 // 디바운스 지연 시간

export default function LexicalCodeSearch(): JSX.Element {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [searchParams, setSearchParams] = useAtom(lexicalCodeSearchParamsAtom)
  const setLexicalCodeSearchResult = useSetAtom(lexicalCodeSearchResultAtom)
  const { codes } = searchParams

  const [tempSearchParams, setTempSearchParams] = useState({ ...searchParams })

  const handleCodeChange = (index: number, value: string): void => {
    const updatedCodes = [...tempSearchParams.codes]
    updatedCodes[index] = normalizeLexicalCode(value)
    setTempSearchParams({ ...tempSearchParams, codes: updatedCodes })
  }

  const handleSearchLexicalCode = async (
    condition: FindLexicalCodeFromBibleParams
  ): Promise<void> => {
    setSearchParams(condition)
    const result = await window.context.findLexicalCodeFromBible(condition)
    if (result) {
      setLexicalCodeSearchResult(result)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Enter') {
      handleSearchLexicalCode(tempSearchParams)
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
    window.context.onUpdateLexicalCode((keyword: string) => {
      setTempSearchParams((prev) => {
        const condition = {
          ...prev,
          codes: keyword ? [normalizeLexicalCode(keyword)] : prev.codes
        }

        handleSearchLexicalCode(condition)

        setTimeout(() => {
          inputRefs.current[0]?.focus()
          inputRefs.current[0]?.select()
        }, 0)

        return condition
      })
    })
  }, [])

  useEffect(() => {
    if (codes.length !== FIXED_INPUT_COUNT) {
      const newCodes = [...codes]
      while (newCodes.length < FIXED_INPUT_COUNT) {
        newCodes.push('')
      }
      setTempSearchParams({
        ...tempSearchParams,
        codes: newCodes.slice(0, FIXED_INPUT_COUNT)
      })
    }
  }, [codes, setTempSearchParams])

  // 자동 검색을 위한 디바운스 효과
  useEffect(() => {
    // 이전 타이머가 있으면 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 코드가 모두 비어있으면 검색하지 않음
    const hasValidCodes = tempSearchParams.codes.some((code) => code.trim() !== '')
    if (!hasValidCodes) {
      return
    }

    // 디바운스 타이머 설정
    debounceTimerRef.current = setTimeout(() => {
      handleSearchLexicalCode(tempSearchParams)
    }, AUTOCALL_DELAY_MS)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [tempSearchParams.codes])

  return (
    <>
      <div className="flex flex-col gap-8pxr">
        <div className="flex gap-8pxr">
          <CustomSelect
            value={tempSearchParams.version}
            itemList={PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.CODED_BIBLE].map(
              (version: string) => ({
                key: version,
                value: version,
                text: version
              })
            )}
            setValue={(value) => {
              setTempSearchParams({ ...tempSearchParams, version: value })
              handleSearchLexicalCode({ ...tempSearchParams, version: value })
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
              handleSearchLexicalCode({ ...tempSearchParams, bookRange: [start, end] })
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
              value={tempSearchParams.codes[index] || ''}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`lexical-code-${index}`}
              css={getCodeInputStyle(index)}
            ></input>
          ))}
          <Button
            type="button"
            onClick={() => handleSearchLexicalCode(tempSearchParams)}
            size="icon"
          >
            <IconSearch size={18} />
          </Button>
        </div>
      </div>
    </>
  )
}

const getCodeInputStyle = (index: number): TwStyle[] => {
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
