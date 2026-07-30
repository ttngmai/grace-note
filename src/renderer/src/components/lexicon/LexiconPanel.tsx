import { panelTextSizeAtom, lexicalCodeAtom } from '@renderer/store'
import { Lexicon } from '@shared/models'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

type LexiconPanelProps = {
  version: string
  backgroundColor: string
  textColor: string
}

export default function LexiconPanel({
  version,
  backgroundColor,
  textColor
}: LexiconPanelProps): JSX.Element {
  const panelTextSize = useAtomValue(panelTextSizeAtom)
  const lexicalCode = useAtomValue(lexicalCodeAtom)

  const [lexiconData, setLexiconData] = useState<Lexicon[]>()

  const renderLexicon = (): JSX.Element | null => {
    if (!lexiconData) return null

    return (
      <div className={`px-16pxr text-[${panelTextSize}px]`} style={{ color: textColor }}>
        <span className="inline-flex items-center text-blue-600 whitespace-pre">
          {lexiconData[0]?.code}{' '}
        </span>
        <span
          dir={lexiconData[0]?.code?.[0] === 'H' ? 'rtl' : undefined}
          style={{
            fontFamily: lexiconData[0]?.code?.[0] === 'H' ? 'Noto Serif Hebrew' : 'Noto Serif',
            unicodeBidi: lexiconData[0]?.code?.[0] === 'H' ? 'plaintext' : undefined
          }}
          className="text-[1.75em]"
        >
          {lexiconData[0]?.word}
        </span>
        <div>
          <span dangerouslySetInnerHTML={{ __html: lexiconData[0]?.definition }}></span>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const fetchLexicon = async (): Promise<void> => {
      const result = await window.context.findLexicon(version, lexicalCode)
      setLexiconData(result)
    }
    if (lexicalCode) fetchLexicon()
  }, [version, lexicalCode])

  return (
    <div className="overflow-y-auto" style={{ backgroundColor }}>
      {renderLexicon()}
      <div className="h-screen" />
    </div>
  )
}
