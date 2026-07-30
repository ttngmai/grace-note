import { panelGridAtom } from '@renderer/store'
import { PANEL_COLUMNS } from '@shared/constants'
import { useAtomValue } from 'jotai'

type VisibleCols = {
  colIndex: number
  hasVisiblePanel: boolean
}[]

export default function useVisibleCols(): VisibleCols {
  const panelGrid = useAtomValue(panelGridAtom)
  const { panels } = panelGrid

  const visibleCols = Array.from({ length: PANEL_COLUMNS })
    .map((_, colIndex) => ({
      colIndex,
      hasVisiblePanel: [0, 1].some((rowIndex) => {
        const layout = panels.find((p) => p.col === colIndex && p.row === rowIndex)
        return layout && layout.state !== 'hidden'
      })
    }))
    .filter((entry) => entry.hasVisiblePanel)

  return visibleCols
}
