import BibleVersePageNavigation from '@renderer/components/bible/BibleVersePageNavigation'
import BibleVerseViewer from '@renderer/components/bible/BibleVerseViewer'

export default function BibleVersePage(): JSX.Element {
  return (
    <div className="overflow-hidden">
      <BibleVersePageNavigation />

      <div className="flex h-[calc(100vh-90px)]">
        <BibleVerseViewer />
      </div>
    </div>
  )
}
