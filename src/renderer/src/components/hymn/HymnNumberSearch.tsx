import * as Label from '@radix-ui/react-label'
import { hymnAtom, hymnPageViewModeAtom, scoreViewModeAtom } from '@renderer/store'
import { useSetAtom, useAtomValue } from 'jotai'
import Button from '../common/Button2'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

const AUTOCALL_DELAY_MS = 500 // 디바운스 지연 시간

export default function HymnNumberSearch(): JSX.Element {
  const hymn = useAtomValue(hymnAtom)
  const setHymn = useSetAtom(hymnAtom)
  const setHymnPageViewModeAtom = useSetAtom(hymnPageViewModeAtom)
  const setScoreViewMode = useSetAtom(scoreViewModeAtom)

  const [keyword, setKeyword] = useState<string>('')
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchHymn = async (): Promise<void> => {
    const result = await window.context.findHymn(keyword.trim())
    if (result && result.length > 0) {
      const hymnNumber = parseInt(keyword.trim())
      setHymn(result[0])
      setHymnPageViewModeAtom('score')

      // 교독문(701~837)은 가사 모드로, 일반 찬송가는 악보 모드로 설정
      if (hymnNumber >= 701 && hymnNumber <= 837) {
        setScoreViewMode('textMode')
      } else {
        setScoreViewMode('imageMode') // 검색 결과가 나오면 자동으로 imageMode로 전환
      }
    }
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearchHymn()
    }
  }

  // 찬송가가 변경될 때 검색창 키워드 업데이트
  useEffect(() => {
    if (hymn?.hymn_number) {
      setKeyword(hymn.hymn_number)
    }
  }, [hymn?.hymn_number])

  // 자동 검색을 위한 디바운스 효과
  useEffect(() => {
    // 이전 타이머가 있으면 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 키워드가 비어있으면 검색하지 않음
    if (!keyword.trim()) {
      return
    }

    // 현재 찬송가 번호와 키워드가 같으면 자동 검색하지 않음 (이미 선택된 찬송가)
    if (hymn?.hymn_number === keyword.trim()) {
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
  }, [keyword, hymn?.hymn_number])

  return (
    <div className="flex items-center shrink-0 w-fit gap-8pxr">
      <input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleEnterKey}
        value={keyword}
        id="keyword"
        className="inline-flex justify-center items-center w-80pxr p-4pxr border-2 border-blue-500 rounded-md text-center"
      ></input>
      <Label.Root className="font-bold" htmlFor="keyword">
        장
      </Label.Root>
      <Button type="button" onClick={handleSearchHymn} size="icon">
        <IconSearch size={18} />
      </Button>
    </div>
  )
}
