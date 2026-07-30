import { useAtom, useSetAtom } from 'jotai'
import {
  hymnPlaylistAtom,
  currentPlaylistIndexAtom,
  isPlaylistModeAtom,
  hymnAtom,
  hymnPageViewModeAtom,
  scoreViewModeAtom,
  playingAtom,
  playlistViewerAtom,
  playlistRepeatModeAtom
} from '@renderer/store'
import { Hymn } from '@shared/models'
import { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconTrash,
  IconGripVertical,
  IconPlus,
  IconRepeat,
  IconRepeatOff
} from '@tabler/icons-react'
import Button from '../common/Button2'
import tw from 'twin.macro'

// SortableItem 컴포넌트
interface SortableItemProps {
  hymn: Hymn
  index: number
  isActive: boolean
  isPlaylistMode: boolean
  isCurrentlyPlaying: boolean
  isPlaying: boolean
  onPlay: (index: number) => void
  onRemove: (index: number) => void
}

function SortableItem({
  hymn,
  index,
  isActive,
  isPlaylistMode,
  isCurrentlyPlaying,
  isPlaying,
  onPlay,
  onRemove
}: SortableItemProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: hymn.hymn_number
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between py-1 px-2 rounded transition-colors ${
        isActive && isPlaylistMode ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-100'
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-0.5">
            <IconGripVertical size={16} className="text-gray-400" />
          </div>
          <span className="text-gray-500 text-right pr-8pxr">{index + 1}.</span>
        </div>
        <span className="truncate">
          {hymn.hymn_number}. {hymn.title}
        </span>
      </div>
      <div className="flex gap-1">
        <Button
          type="button"
          onClick={() => onPlay(index)}
          size="icon"
          variant="ghost"
          sx={tw`h-28pxr w-28pxr`}
        >
          {isCurrentlyPlaying && isPlaying ? (
            <IconPlayerPause size={16} />
          ) : (
            <IconPlayerPlay size={16} />
          )}
        </Button>
        <Button
          type="button"
          onClick={() => onRemove(index)}
          size="icon"
          variant="ghost"
          color="red"
          sx={tw`h-28pxr w-28pxr`}
        >
          <IconTrash size={16} />
        </Button>
      </div>
    </div>
  )
}

export default function HymnPlaylistViewer(): JSX.Element {
  const [playlist, setPlaylist] = useAtom(hymnPlaylistAtom)
  const [currentIndex, setCurrentIndex] = useAtom(currentPlaylistIndexAtom)
  const [isPlaylistMode, setIsPlaylistMode] = useAtom(isPlaylistModeAtom)
  const [playing, setPlaying] = useAtom(playingAtom)
  const [hymn, setHymn] = useAtom(hymnAtom)
  const setHymnPageViewModeAtom = useSetAtom(hymnPageViewModeAtom)
  const setScoreViewMode = useSetAtom(scoreViewModeAtom)
  const [playlistViewerSettings] = useAtom(playlistViewerAtom)
  const [playlistRepeatMode, setPlaylistRepeatMode] = useAtom(playlistRepeatModeAtom)

  // 플레이리스트 UI 상태
  const [inputHymnNumber, setInputHymnNumber] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  // dnd-kit 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // 메시지 표시 함수
  const showMessage = useCallback((message: string, type: 'error' | 'success'): void => {
    if (type === 'error') {
      setErrorMessage(message)
      setSuccessMessage('')
    } else {
      setSuccessMessage(message)
      setErrorMessage('')
    }

    // 3초 후 메시지 제거
    setTimeout(() => {
      setErrorMessage('')
      setSuccessMessage('')
    }, 3000)
  }, [])

  // 찬송가 번호로 추가
  const addHymnByNumber = useCallback(async (): Promise<void> => {
    const hymnNumber = parseInt(inputHymnNumber.trim())
    if (isNaN(hymnNumber) || hymnNumber < 1) {
      showMessage('올바른 찬송가 번호를 입력해주세요.', 'error')
      return
    }

    // 교독문(701~837)은 플레이리스트에 추가할 수 없음
    if (hymnNumber >= 701 && hymnNumber <= 837) {
      showMessage('교독문은 플레이리스트에 추가할 수 없습니다.', 'error')
      return
    }

    try {
      const result = await window.context.findHymn(hymnNumber.toString())
      if (result && result.length > 0) {
        const hymn = result[0]
        const isAlreadyInPlaylist = playlist.some((item) => item.hymn_number === hymn.hymn_number)

        if (isAlreadyInPlaylist) {
          showMessage('이미 플레이리스트에 추가된 찬송가입니다.', 'error')
          return
        }

        setPlaylist([...playlist, hymn])
        setInputHymnNumber('')
        showMessage(`${hymn.hymn_number}장이 플레이리스트에 추가되었습니다.`, 'success')
      } else {
        showMessage('찾을 수 없는 찬송가 번호입니다.', 'error')
      }
    } catch (error) {
      console.error('찬송가 검색 오류:', error)
      showMessage('찬송가를 찾는 중 오류가 발생했습니다.', 'error')
    }
  }, [inputHymnNumber, playlist, setPlaylist, showMessage])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addHymnByNumber()
    }
  }

  const playHymn = (hymnToPlay: Hymn): void => {
    setHymn(hymnToPlay)
    setHymnPageViewModeAtom('score')
    setScoreViewMode('imageMode')
  }

  const playFromPlaylist = (index: number): void => {
    // 현재 재생 중인 곡을 클릭한 경우 일시정지/재생 토글
    if (index === currentIndex && isPlaylistMode) {
      setPlaying(!playing)
      return
    }

    setCurrentIndex(index)
    playHymn(playlist[index])
    setIsPlaylistMode(true)
    setPlaying(true) // 새로운 곡 재생 시작
  }

  const removeFromPlaylist = (index: number): void => {
    const newPlaylist = playlist.filter((_, i) => i !== index)
    setPlaylist(newPlaylist)

    if (index === currentIndex) {
      if (newPlaylist.length === 0) {
        setCurrentIndex(0)
        setIsPlaylistMode(false)
      } else if (currentIndex >= newPlaylist.length) {
        setCurrentIndex(newPlaylist.length - 1)
      }
    } else if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const clearPlaylist = (): void => {
    setPlaylist([])
    setCurrentIndex(0)
    setIsPlaylistMode(false)
  }

  const togglePlaylistMode = async (): Promise<void> => {
    if (isPlaylistMode) {
      // 플레이리스트 모드 해제
      setIsPlaylistMode(false)

      // 현재 재생 중인 곡이 플레이리스트에 있는 곡인지 확인
      if (hymn && playlist.some((item) => item.hymn_number === hymn.hymn_number)) {
        // 현재 곡을 즉시 정지
        setPlaying(false)

        // 다음 장 찬송가 재생
        const nextHymnNumber = String(Number(hymn.hymn_number) + 1)

        try {
          const result = await window.context.findHymn(nextHymnNumber)
          if (result && result.length > 0) {
            setHymn(result[0])
            setHymnPageViewModeAtom('score')
            setScoreViewMode('imageMode')
          }
        } catch (error) {
          console.log('다음 찬송가를 찾을 수 없습니다:', error)
        }
      }
    } else {
      // 플레이리스트 모드 활성화
      // 반복 재생 끄기는 HymnPlayer의 useEffect에서 자동으로 처리됨
      setIsPlaylistMode(true)
      // 플레이리스트 모드로 전환할 때 첫 번째 곡 재생
      if (playlist.length > 0) {
        setCurrentIndex(0)
        playHymn(playlist[0])
        setPlaying(true)
      }
    }
  }

  // hymn이 변경될 때 플레이리스트에 있는 찬송가의 인덱스로 currentIndex 업데이트
  useEffect(() => {
    if (!hymn || !isPlaylistMode || playlist.length === 0) {
      return
    }

    const hymnIndex = playlist.findIndex((item) => item.hymn_number === hymn.hymn_number)
    if (hymnIndex !== -1) {
      // 플레이리스트에 있는 찬송가면 인덱스 업데이트
      setCurrentIndex(hymnIndex)
    } else {
      // 플레이리스트에 없는 찬송가를 재생하면 currentIndex를 -1로 설정
      // (유효하지 않은 인덱스로 설정하여 플레이리스트의 어떤 항목도 "현재 재생 중"으로 표시되지 않도록 함)
      setCurrentIndex(-1)
    }
  }, [hymn, isPlaylistMode, playlist, setCurrentIndex])

  // dnd-kit 드래그 앤 드롭 핸들러
  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = playlist.findIndex((item) => item.hymn_number === active.id)
      const newIndex = playlist.findIndex((item) => item.hymn_number === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newPlaylist = arrayMove(playlist, oldIndex, newIndex)
        setPlaylist(newPlaylist)

        // 현재 재생 중인 항목의 인덱스 업데이트
        if (currentIndex === oldIndex) {
          setCurrentIndex(newIndex)
        } else if (oldIndex < currentIndex && newIndex >= currentIndex) {
          setCurrentIndex(currentIndex - 1)
        } else if (oldIndex > currentIndex && newIndex <= currentIndex) {
          setCurrentIndex(currentIndex + 1)
        }
      }
    }
  }

  return (
    <div
      className="flex flex-col h-full min-w-0"
      style={{
        backgroundColor: playlistViewerSettings['playlist']?.backgroundColor,
        color: playlistViewerSettings['playlist']?.textColor
      }}
    >
      <div className="space-y-16pxr px-8pxr py-16pxr min-w-0">
        <div className="flex items-center justify-center">
          <h3 className="font-bold">플레이리스트</h3>
        </div>

        <div className="space-y-16pxr">
          <div className="flex gap-4pxr min-w-0">
            <Button
              type="button"
              onClick={togglePlaylistMode}
              title={isPlaylistMode ? '끄기' : '켜기'}
              size="sm"
              color={isPlaylistMode ? 'red' : 'blue'}
              disabled={playlist.length === 0}
              sx={tw`min-w-fit flex-none`}
            >
              모드
            </Button>
            <Button
              type="button"
              onClick={() => setPlaylistRepeatMode(!playlistRepeatMode)}
              size="icon"
              title={`반복재생 (${playlistRepeatMode ? '켜짐' : '꺼짐'})`}
              disabled={playlist.length === 0 || !isPlaylistMode}
              sx={tw`flex-none`}
            >
              {playlistRepeatMode ? <IconRepeat size={16} /> : <IconRepeatOff size={16} />}
            </Button>
            <div className="flex flex-1 min-w-0">
              <input
                type="text"
                value={inputHymnNumber}
                placeholder="찬송가"
                onChange={(e) => setInputHymnNumber(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 min-w-0 h-32pxr p-4pxr border-2 border-blue-500 rounded-md rounded-r-none text-sm"
              />
              <Button
                type="button"
                title="추가"
                onClick={addHymnByNumber}
                size="icon"
                sx={tw`rounded-l-none`}
              >
                <IconPlus size={16} />
              </Button>
            </div>
            <Button
              type="button"
              title="비우기"
              onClick={clearPlaylist}
              size="icon"
              color="red"
              disabled={playlist.length === 0}
            >
              <IconTrash size={16} />
            </Button>
          </div>

          {(errorMessage || successMessage) && (
            <div
              className={`text-sm p-2 rounded ${
                errorMessage ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
              }`}
            >
              {errorMessage || successMessage}
            </div>
          )}
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        {playlist.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            플레이리스트가 비어있습니다
            <br />
            찬송가를 추가해 주세요.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={playlist.map((hymn) => hymn.hymn_number)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-0.5">
                {playlist.map((playlistHymn, index) => {
                  // 현재 재생 중인 찬송가가 플레이리스트에 있고, 해당 인덱스가 currentIndex와 일치하는지 확인
                  const isCurrentlyPlaying =
                    hymn &&
                    playlistHymn.hymn_number === hymn.hymn_number &&
                    index === currentIndex &&
                    currentIndex >= 0 &&
                    isPlaylistMode
                  return (
                    <div key={playlistHymn.hymn_number}>
                      <SortableItem
                        hymn={playlistHymn}
                        index={index}
                        isActive={index === currentIndex && currentIndex >= 0}
                        isPlaylistMode={isPlaylistMode}
                        isCurrentlyPlaying={isCurrentlyPlaying || false}
                        isPlaying={playing}
                        onPlay={playFromPlaylist}
                        onRemove={removeFromPlaylist}
                      />
                    </div>
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}
