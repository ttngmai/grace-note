import HymnPageNavigation from '@renderer/components/hymn/HymnPageNavigationBar'
import HymnViewer from '@renderer/components/hymn/HymnViewer'

export default function HymnPage(): JSX.Element {
  return (
    <div className="overflow-hidden">
      <HymnPageNavigation />

      <div className="flex h-[calc(100vh-110px)]">
        <HymnViewer />
      </div>
    </div>
  )
}
