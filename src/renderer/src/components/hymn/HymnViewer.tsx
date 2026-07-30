import { hymnPageViewModeAtom, hymnViewerAtom, showHymnIndexAtom } from '@renderer/store'
import React, { useState } from 'react'
import { HymnPageViewMode } from '@shared/types'
import { useAtomValue } from 'jotai'
import HymnScoreViewer from './HymnScoreViewer'
import HymnKeywordViewer from './HymnKeywordViewer'
import HymnListViewer from './HymnListViewer'
import HymnIndexViewer from './HymnIndexViewer'
import HymnPlaylistViewer from './HymnPlaylistViewer'

export default function HymnViewer(): JSX.Element {
  const showHymnIndex = useAtomValue(showHymnIndexAtom)
  const hymnPageViewMode = useAtomValue(hymnPageViewModeAtom)
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false)

  // 플레이리스트 토글 함수
  const handleTogglePlaylist = (): void => {
    setShowPlaylist(!showPlaylist)
  }

  // 전역에서 접근할 수 있도록 window 객체에 등록
  React.useEffect(() => {
    ;(window as any).togglePlaylist = handleTogglePlaylist
    return () => {
      delete (window as any).togglePlaylist
    }
  }, [showPlaylist])

  const settings = useAtomValue(hymnViewerAtom)

  return (
    <div className="flex w-full">
      {showHymnIndex && (
        <div
          className="flex-[5] border-r border-gray-300 overflow-y-auto"
          style={{ backgroundColor: settings['hymnIndex'].backgroundColor }}
        >
          <HymnIndexViewer />
        </div>
      )}
      {showPlaylist && (
        <div className="flex-[5] border-r border-gray-300 overflow-y-auto">
          <HymnPlaylistViewer />
        </div>
      )}
      <div
        className="flex-[8] overflow-y-auto"
        style={{ backgroundColor: settings['hymn'].backgroundColor }}
      >
        <HymnViewerRenderer mode={hymnPageViewMode} />
      </div>
    </div>
  )
}

type HymnViewerRendererProps = {
  mode: HymnPageViewMode
}

export const HymnViewerRenderer: React.FC<HymnViewerRendererProps> = ({
  mode
}: HymnViewerRendererProps) => {
  switch (mode) {
    case 'list':
      return <HymnListViewer />
    case 'score':
      return <HymnScoreViewer />
    case 'search':
      return <HymnKeywordViewer />
    default:
      return
  }
}
