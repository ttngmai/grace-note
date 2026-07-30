import { MAX_PANELS, PANEL_COLUMNS } from '@shared/constants'
import { PanelCategory, PanelGrid, PanelLayout, PanelSettings } from '@shared/types'

export function createInitialPanelGrid(): PanelGrid {
  const panels: PanelLayout[] = Array.from({ length: MAX_PANELS }, (_, i) => {
    const row = Math.floor(i / PANEL_COLUMNS)
    const col = i % PANEL_COLUMNS
    return {
      id: `panel-${i}`,
      row,
      col,
      state: 'normal'
    }
  })

  const settings: Record<string, PanelSettings> = Object.fromEntries(
    panels.map((panel) => [
      panel.id,
      {
        id: panel.id,
        isBase: panel.row === 0 && panel.col === 0,
        category: PanelCategory.NONE,
        version: '',
        backgroundColor: '#fff',
        textColor: '#000'
      }
    ])
  )

  return { panels, settings }
}

export function swapPanelPositions(panels: PanelLayout[], id1: string, id2: string): PanelLayout[] {
  const p1 = panels.find((p) => p.id === id1)
  const p2 = panels.find((p) => p.id === id2)
  if (!p1 || !p2) return panels

  return panels.map((p) => {
    if (p.id === id1) {
      return {
        ...p,
        row: p2.row,
        col: p2.col,
        mergeRange: p2.mergeRange,
        state: p2.state
      }
    }
    if (p.id === id2) {
      return {
        ...p,
        row: p1.row,
        col: p1.col,
        mergeRange: p1.mergeRange,
        state: p1.state
      }
    }
    return p
  })
}

export function mergePanels(
  panels: PanelLayout[],
  masterId: string,
  range: { startRow: number; startCol: number; endRow: number; endCol: number }
): PanelLayout[] {
  return panels.map((panel) => {
    if (
      panel.row >= range.startRow &&
      panel.row <= range.endRow &&
      panel.col >= range.startCol &&
      panel.col <= range.endCol
    ) {
      if (panel.id === masterId) {
        return {
          ...panel,
          state: 'master',
          mergeRange: range
        }
      } else {
        return {
          ...panel,
          state: 'hidden',
          mergeRange: undefined
        }
      }
    }
    return panel
  })
}

export function unmergePanel(panels: PanelLayout[], masterId: string): PanelLayout[] {
  const master = panels.find((p) => p.id === masterId)
  if (!master || master.state !== 'master' || !master.mergeRange) return panels

  const { startRow, startCol, endRow, endCol } = master.mergeRange

  return panels.map((panel) => {
    if (
      panel.row >= startRow &&
      panel.row <= endRow &&
      panel.col >= startCol &&
      panel.col <= endCol
    ) {
      return {
        ...panel,
        state: 'normal',
        mergeRange: undefined
      }
    }
    return panel
  })
}
