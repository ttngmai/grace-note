import LexiconPageNavigation from '@renderer/components/lexicon/LexiconPageNavigation'
import LexiconViewer from '@renderer/components/lexicon/LexiconViewer'

export default function LexiconPage(): JSX.Element {
  return (
    <div className="overflow-hidden">
      <LexiconPageNavigation />

      <div className="flex h-[calc(100vh-90px)]">
        <LexiconViewer />
      </div>
    </div>
  )
}
