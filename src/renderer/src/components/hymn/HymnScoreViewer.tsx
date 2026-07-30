import { hymnAtom, hymnTextSizeAtom, hymnViewerAtom, scoreViewModeAtom } from '@renderer/store'
import { isLight } from '@renderer/utils/contrastColor'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'

export default function HymnScoreViewer(): JSX.Element {
  const hymn = useAtomValue(hymnAtom)
  const scoreViewMode = useAtomValue(scoreViewModeAtom)
  const textSize = useAtomValue(hymnTextSizeAtom)
  const settings = useAtomValue(hymnViewerAtom)

  const [hymnSheetPath, setHymnSheetPath] = useState<string>()

  useEffect(() => {
    if (hymn == null) return
    ;(async (): Promise<void> => {
      const hymnSheetPath = await window.context.getImageFilePath(`hymn/${hymn.hymn_number}.png`)
      setHymnSheetPath(hymnSheetPath || '')
    })()
  }, [hymn])

  return (
    <div className="flex justify-center w-full">
      {scoreViewMode === 'imageMode' && (
        <div className="p-16pxr">
          <img src={hymnSheetPath} className="w-full max-w-800pxr mx-auto object-cover" />
        </div>
      )}
      {scoreViewMode === 'textMode' && hymn && (
        <div
          className={`w-fit p-16pxr mx-auto text-[${textSize}px]`}
          style={{ color: settings['hymn'].textColor }}
        >
          <p
            css={[
              tw`font-bold`,
              isLight(settings['hymn'].backgroundColor) ? tw`text-blue-600` : tw`text-white`
            ]}
          >{`${hymn.hymn_number}. ${hymn.title}`}</p>
          <br />
          <LyricsRenderer hymnNumber={Number(hymn.hymn_number)} lyrics={hymn.lyrics} />
        </div>
      )}
    </div>
  )
}

type LyricsRendererProps = {
  lyrics: string
  hymnNumber: number
}

export const LyricsRenderer: React.FC<LyricsRendererProps> = ({
  hymnNumber,
  lyrics
}: LyricsRendererProps) => {
  if (!lyrics) return null

  if (hymnNumber >= 701) {
    return <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
  }

  const lines = lyrics.split('\n')

  return (
    <div>
      {lines.map((line, index) => {
        const trimmedLine = line.trim()

        if (trimmedLine === '') {
          return <br key={index} />
        }

        const isSectionHeader = /^(후렴|\d+절)/.test(trimmedLine)

        return <p key={index}>{isSectionHeader ? <b>{trimmedLine}</b> : trimmedLine}</p>
      })}
    </div>
  )
}
