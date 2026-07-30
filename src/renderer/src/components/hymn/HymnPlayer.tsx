import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import * as Slider from '@radix-ui/react-slider'
import { useAtom } from 'jotai'
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconVolume,
  IconVolumeOff,
  IconRepeat,
  IconRepeatOff
} from '@tabler/icons-react'
import Button from '../common/Button'
import { formatTime } from '@renderer/utils/timeFormat'
import { isPlaylistModeAtom, playingAtom } from '@renderer/store'

type HymnPlayerProps = {
  url: string
  playbackRate: number
  autoPlay?: boolean
  onEnded?: () => void
  onProgress?: (state: OnProgressProps) => void
  onRepeatChange?: (repeat: boolean) => void
}

export default function HymnPlayer({
  url,
  playbackRate,
  autoPlay = false,
  onEnded,
  onProgress,
  onRepeatChange
}: HymnPlayerProps): JSX.Element {
  const playerRef = useRef<ReactPlayer>(null)

  const [playing, setPlaying] = useAtom(playingAtom)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [progressInterval, setProgressInterval] = useState<number>(100)
  const [repeat, setRepeat] = useState<boolean>(false)

  // 플레이리스트 관련 상태
  const [isPlaylistMode, setIsPlaylistMode] = useAtom(isPlaylistModeAtom)

  // remember states across seek
  const wasPlayingRef = useRef<boolean>(false)
  const finalizeDoneRef = useRef<boolean>(false)
  const suppressPauseRef = useRef<boolean>(false) // ignore transient onPause during seek

  const handlePlayOrPause = (): void => {
    setPlaying(!playing)
  }

  const handleProgress = (state: OnProgressProps): void => {
    if (!seeking) {
      setCurrentTime(state.playedSeconds)
    }
    onProgress?.(state)
  }

  const handleSliderChange = (value: number[]): void => {
    setCurrentTime(value[0])
  }

  const forcePlayIfPossible = (): void => {
    const internal: unknown = playerRef.current?.getInternalPlayer?.()
    try {
      if (internal && typeof internal === 'object' && 'play' in internal) {
        ;(internal as { play: () => void }).play()
      }
    } catch {
      // Ignore errors
    }
  }

  const finalizeSeek = (): void => {
    if (finalizeDoneRef.current) return

    playerRef.current?.seekTo(currentTime, 'seconds')
    setSeeking(false)

    if (wasPlayingRef.current) {
      suppressPauseRef.current = true
      setPlaying(true)
      setTimeout(() => {
        forcePlayIfPossible()
        setTimeout(() => {
          suppressPauseRef.current = false
        }, 300)
      }, 0)
    } else {
      setPlaying(false)
    }

    finalizeDoneRef.current = true
  }

  const handleSliderCommit = (value: number[]): void => {
    setCurrentTime(value[0])
    finalizeSeek()
  }

  const handleMuted = (): void => {
    setMuted((m) => !m)
  }

  const handleVolumeChange = (v: number[]): void => {
    setVolume(v[0])
    setMuted(v[0] === 0)
  }

  const handleReady = (): void => {
    // keep as-is to avoid unexpected pauses during interactions
  }

  const restartFromBeginning = (): void => {
    setCurrentTime(0)
    // restart playback from 0
    playerRef.current?.seekTo(0, 'seconds')
    suppressPauseRef.current = true
    setPlaying(true)
    setTimeout(() => {
      forcePlayIfPossible()
      setTimeout(() => {
        suppressPauseRef.current = false
      }, 300)
    }, 0)
  }

  const handleEnded = (): void => {
    if (repeat) {
      // 반복 모드: 자동으로 처음부터 재생
      restartFromBeginning()
    } else {
      // 반복 모드가 아닐 때: 정지하고 부모 컴포넌트에 알림 (다음 찬송가로 넘어감)
      setPlaying(false)
      onEnded?.()
    }
  }

  useEffect(() => {
    setCurrentTime(0)
  }, [url])

  // 플레이리스트 모드가 활성화될 때 반복 재생 끄기
  useEffect(() => {
    if (isPlaylistMode && repeat) {
      setRepeat(false)
      onRepeatChange?.(false)
    }
  }, [isPlaylistMode, repeat, onRepeatChange])

  useEffect(() => {
    setProgressInterval(playbackRate < 3 ? 200 : 100)
  }, [playbackRate])

  // autoPlay가 true일 때 자동으로 재생 시작
  useEffect(() => {
    if (autoPlay && url) {
      // 약간의 지연을 두어 오디오 파일이 로드된 후 재생 시작
      const timer = setTimeout(() => {
        setPlaying(true)
      }, 500)

      return () => clearTimeout(timer)
    }
    return
  }, [autoPlay, url])

  // 반복 상태가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    onRepeatChange?.(repeat)
  }, [repeat, onRepeatChange])

  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        ref={playerRef}
        controls={false}
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onReady={handleReady}
        onDuration={setDuration}
        onProgress={handleProgress}
        onEnded={handleEnded}
        onPlay={() => {
          if (!wasPlayingRef.current && seeking) {
            setPlaying(false)
          }
        }}
        onPause={() => {
          if (suppressPauseRef.current) return
          if (!seeking) setPlaying(false)
        }}
        progressInterval={progressInterval}
        width="100%"
        height="100%"
      />

      <div className="absolute inset-0 flex flex-col">
        <Slider.Root
          max={duration}
          step={0.1}
          value={[currentTime]}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
          onPointerDown={() => {
            wasPlayingRef.current = playing
            finalizeDoneRef.current = false
            setSeeking(true)
          }}
          onPointerUp={() => {
            setTimeout(() => finalizeSeek(), 0)
          }}
          onPointerCancel={() => finalizeSeek()}
          className="flex items-center grow h-full select-none touch-none"
        >
          <Slider.Track className="relative grow h-4pxr bg-gray-300 rounded-full">
            <Slider.Range className="absolute h-full bg-blue-600 rounded-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-10pxr h-10pxr rounded-full bg-white shadow-[0_1px_4px] cursor-pointer focus:outline-none" />
        </Slider.Root>

        <div className="flex justify-between items-center">
          <div className="flex -ml-8pxr items-center">
            <Button
              type="button"
              onClick={handlePlayOrPause}
              variant="ghost"
              size="icon"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
            </Button>

            <Button
              type="button"
              onClick={() => {
                if (!repeat && isPlaylistMode) {
                  // 반복 재생을 켤 때 플레이리스트 모드 끄기
                  setIsPlaylistMode(false)
                }
                setRepeat((r) => !r)
                onRepeatChange?.(!repeat)
              }}
              variant="ghost"
              size="icon"
              aria-pressed={repeat}
              aria-label={repeat ? 'Repeat enabled' : 'Repeat disabled'}
              title={`반복재생 (${repeat ? '켜짐' : '꺼짐'})`}
              className={isPlaylistMode ? 'opacity-50' : ''}
              disabled={isPlaylistMode}
            >
              {repeat ? <IconRepeat size={22} /> : <IconRepeatOff size={22} />}
            </Button>

            <Button
              type="button"
              onClick={handleMuted}
              variant="ghost"
              size="icon"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <IconVolumeOff size={24} /> : <IconVolume size={24} />}
            </Button>

            <div className="relative w-80pxr ml-2pxr">
              <Slider.Root
                max={1}
                step={0.1}
                value={muted ? [0] : [volume]}
                onValueChange={handleVolumeChange}
                className="flex items-center grow h-full select-none touch-none"
              >
                <Slider.Track className="relative grow h-4pxr bg-gray-300 rounded-full">
                  <Slider.Range className="absolute h-full bg-blue-600 rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-10pxr h-10pxr rounded-full bg-white shadow-[0_1px_4px] cursor-pointer focus:outline-none" />
              </Slider.Root>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[18px] mr-1pxr">
              {formatTime(currentTime / playbackRate)} / {formatTime(duration / playbackRate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
