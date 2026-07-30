import { useEffect, useState } from 'react'
import NavigationBar from '../common/NavigationBar'
import HymnPlayer from './HymnPlayer'
import HymnNumberSearch from './HymnNumberSearch'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  hymnAtom,
  hymnPageViewModeAtom,
  scoreViewModeAtom,
  showHymnIndexAtom,
  hymnPlaylistAtom,
  currentPlaylistIndexAtom,
  isPlaylistModeAtom,
  playlistRepeatModeAtom,
  playingAtom
} from '@renderer/store'
import * as Separator from '@radix-ui/react-separator'

import HymnTextSizeSelector from './HymnTextSizeSelector'
import tw from 'twin.macro'
import HymnKeywordSearch from './HymnKeywordSearch'
import ScoreViewModeToggleButton from './ScoreViewModeToggleButton'
import Button from '../common/Button2'
import { IconList, IconListSearch, IconSettings } from '@tabler/icons-react'
import ModalPortal from '@renderer/utils/ModalPortal'
import HymnViewerStylesModal from './HymnViewerStylesModal'

export default function HymnPageNavigation(): JSX.Element {
  const hymn = useAtomValue(hymnAtom)
  const setHymn = useSetAtom(hymnAtom)
  const setHymnPageViewModeAtom = useSetAtom(hymnPageViewModeAtom)
  const setScoreViewMode = useSetAtom(scoreViewModeAtom)
  const [showHymnIndex, setShowHymnIndex] = useAtom(showHymnIndexAtom)
  const scoreViewMode = useAtomValue(scoreViewModeAtom)

  // 플레이리스트 관련 상태
  const playlist = useAtomValue(hymnPlaylistAtom)
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useAtom(currentPlaylistIndexAtom)
  const isPlaylistMode = useAtomValue(isPlaylistModeAtom)
  const playlistRepeatMode = useAtomValue(playlistRepeatModeAtom)
  const setPlaying = useSetAtom(playingAtom)

  const [hymnAudioPath, setHymnAudioPath] = useState<string>('')
  const [openStylesModal, setOpenStylesModal] = useState<boolean>(false)
  const [isRepeatOn, setIsRepeatOn] = useState<boolean>(false)

  useEffect(() => {
    if (hymn == null) {
      return
    }

    ;(async (): Promise<void> => {
      const hymnAudioPath = await window.context.getAudioFilePath(`hymn/${hymn.hymn_number}.mp3`)
      setHymnAudioPath(hymnAudioPath || '')
    })()
  }, [hymn])

  const handleHymnEnded = async (): Promise<void> => {
    if (hymn == null) return

    // 반복 재생이 켜져있으면 다음 찬송가로 넘어가지 않음
    if (isRepeatOn) return

    // 플레이리스트 모드일 때
    if (isPlaylistMode && playlist.length > 0) {
      // 마지막 곡인지 확인
      const isLastSong = currentPlaylistIndex === playlist.length - 1

      // 반복 모드가 꺼져 있고 마지막 곡이면 멈춤
      if (isLastSong && !playlistRepeatMode) {
        setPlaying(false)
        return
      }

      // 그 외의 경우: 다음 곡으로 이동 (순환)
      const nextIndex = (currentPlaylistIndex + 1) % playlist.length
      setCurrentPlaylistIndex(nextIndex)

      const nextHymn = playlist[nextIndex]
      if (nextHymn) {
        setHymn(nextHymn)
        setHymnPageViewModeAtom('score')
        setScoreViewMode('imageMode')
      }
      return
    }

    // 일반 모드일 때: 다음 찬송가 번호 계산 (현재 번호 + 1)
    const nextHymnNumber = String(Number(hymn.hymn_number) + 1)

    try {
      // 다음 찬송가 검색
      const result = await window.context.findHymn(nextHymnNumber)
      if (result && result.length > 0) {
        // 다음 찬송가로 전환
        setHymn(result[0])
        setHymnPageViewModeAtom('score')
        setScoreViewMode('imageMode')
      }
    } catch (error) {
      console.log('다음 찬송가를 찾을 수 없습니다:', error)
    }
  }

  const handleRepeatChange = (repeat: boolean): void => {
    setIsRepeatOn(repeat)
  }

  const togglePlaylistMode = (): void => {
    if ((window as unknown as { togglePlaylist?: () => void }).togglePlaylist) {
      ;(window as unknown as { togglePlaylist: () => void }).togglePlaylist()
    }
  }

  // 교독문 여부 확인 (701~837장)
  const hymnNumber = hymn ? parseInt(hymn.hymn_number) : 0
  const isResponsiveReading = hymnNumber >= 701 && hymnNumber <= 837

  return (
    <>
      <NavigationBar sx={tw`h-110pxr`}>
        <div className="flex flex-col gap-8pxr h-full">
          <div className="flex items-center">
            <div className="flex items-center shrink-0 w-fit">
              <Button
                type="button"
                onClick={() => {
                  setShowHymnIndex(!showHymnIndex)
                }}
                title="목차"
                size="icon"
              >
                <IconListSearch size={18} />
              </Button>
            </div>

            <Separator.Root
              className="shrink-0 inline-block data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-12pxr bg-gray-300"
              decorative
              orientation="vertical"
            />

            <HymnNumberSearch />

            <Separator.Root
              className="shrink-0 inline-block data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-12pxr bg-gray-300"
              decorative
              orientation="vertical"
            />

            <HymnKeywordSearch />
          </div>

          <div className="flex">
            <div className="flex items-center shrink-0 gap-8pxr mt-8pxr">
              <div className="w-320pxr h-40pxr">
                <HymnPlayer
                  url={hymnAudioPath}
                  playbackRate={1.0}
                  autoPlay={true}
                  onEnded={handleHymnEnded}
                  onRepeatChange={handleRepeatChange}
                />
              </div>
            </div>

            <div className="flex items-center shrink-0 gap-8pxr w-fit ml-16pxr">
              <Button
                type="button"
                onClick={togglePlaylistMode}
                size="icon"
                title={`플레이리스트 ${isPlaylistMode ? '(활성)' : ''}`}
                className={`${isPlaylistMode ? 'bg-blue-100' : ''}`}
              >
                <IconList size={18} />
              </Button>
              {!isResponsiveReading && <ScoreViewModeToggleButton />}
              {scoreViewMode === 'textMode' && <HymnTextSizeSelector />}
              <Button type="button" onClick={() => setOpenStylesModal(true)} size="icon">
                <IconSettings size={18} />
              </Button>
            </div>
          </div>
        </div>
      </NavigationBar>

      {openStylesModal && (
        <ModalPortal>
          <HymnViewerStylesModal onClose={() => setOpenStylesModal(false)} />
        </ModalPortal>
      )}
    </>
  )
}
