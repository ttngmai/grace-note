import { panelTextSizeAtom, lexicalCodeAtom } from '@renderer/store'
import { isLight } from '@renderer/utils/contrastColor'
import { LEXICON_EXPLANATION_SOURCES, isLexiconExplanationVersion } from '@shared/constants'
import { Lexicon } from '@shared/models'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

const hasLexiconContent = (entry?: Lexicon): entry is Lexicon => {
  if (!entry) return false

  const definition =
    entry.definition
      ?.replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .trim() ?? ''
  return definition.length > 0
}

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

  const [entries, setEntries] = useState<Lexicon[]>([])

  const renderEntry = (entry: Lexicon): JSX.Element => {
    const isHebrew = entry.code?.[0] === 'H'

    return (
      <div className={`px-16pxr text-[${panelTextSize}px]`} style={{ color: textColor }}>
        <span className="inline-flex items-center text-blue-600 whitespace-pre">{entry.code} </span>
        <span
          dir={isHebrew ? 'rtl' : undefined}
          style={{
            fontFamily: isHebrew ? 'Noto Serif Hebrew' : 'Noto Serif',
            unicodeBidi: isHebrew ? 'plaintext' : undefined
          }}
          className="text-[1.75em]"
        >
          {entry.word}
        </span>
        <div>
          <span dangerouslySetInnerHTML={{ __html: entry.definition }}></span>
        </div>
      </div>
    )
  }

  useEffect(() => {
    let cancelled = false

    const fetchLexicon = async (): Promise<void> => {
      const sources = isLexiconExplanationVersion(version) ? LEXICON_EXPLANATION_SOURCES : [version]
      const results = await Promise.all(
        sources.map((source) => window.context.findLexicon(source, lexicalCode))
      )

      if (cancelled) return
      setEntries(results.map((rows) => rows[0]).filter(hasLexiconContent))
    }

    if (lexicalCode) {
      fetchLexicon()
    } else {
      setEntries([])
    }

    return () => {
      cancelled = true
    }
  }, [version, lexicalCode])

  return (
    <div className="overflow-y-auto" style={{ backgroundColor }}>
      {entries.map((entry, index) => (
        <div key={`${entry.code}-${index}`}>
          {index > 0 && (
            <div
              role="separator"
              className="mx-16pxr my-12pxr border-t-2"
              style={{ borderColor: isLight(backgroundColor) ? '#000' : '#fff' }}
            />
          )}
          {renderEntry(entry)}
        </div>
      ))}
      <div className="h-screen" />
    </div>
  )
}
