import React from 'react'
import { useAtom } from 'jotai'
import { panelGridAtom } from '@renderer/store'
import tw, { css } from 'twin.macro'
import { PanelLayout } from '@shared/types'
import { mergePanels, unmergePanel } from '@renderer/utils/panelUtils'
import { PANEL_COLUMNS, PANEL_ROWS } from '@shared/constants'
import { isLight } from '@renderer/utils/contrastColor'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

const PanelVisibilityControls: React.FC = () => {
  const [panelGrid, setPanelGrid] = useAtom(panelGridAtom)
  const { panels, settings } = panelGrid

  const gridButtons: (PanelLayout | null)[][] = Array.from({ length: PANEL_ROWS }, () =>
    Array(PANEL_COLUMNS).fill(null)
  )

  for (const panel of panels) {
    const { row, col } = panel
    if (!gridButtons[row][col]) {
      gridButtons[row][col] = panel
    }
  }

  const columnButtonMap: Record<number, PanelLayout[]> = {}
  for (let col = 0; col < PANEL_COLUMNS; col++) {
    const panelsInCol = panels.filter((p) => p.col === col)

    const hiddenPanelsInCol = panelsInCol.filter((p) => p.state === 'hidden')
    if (hiddenPanelsInCol.length === PANEL_ROWS) {
      const master = hiddenPanelsInCol.find((p) => p.originalState === 'master')
      if (master) {
        columnButtonMap[col] = [master]
        continue
      }
    }

    const master = panelsInCol.find((p) => p.state === 'master')
    if (master) {
      columnButtonMap[col] = [master]
      continue
    }

    columnButtonMap[col] = panelsInCol
      .filter((p) => p.state === 'normal' || p.state === 'hidden')
      .sort((a, b) => a.row - b.row)
  }

  const handleMerge = (target: PanelLayout): void => {
    const mergeTarget = panels.filter((p) => p.col === target.col)
    if (mergeTarget.length < PANEL_ROWS) return

    const basePanel = mergeTarget.find((p) => p.id === target.id)
    if (!basePanel) return

    const rows = mergeTarget.map((p) => p.row)
    const cols = mergeTarget.map((p) => p.col)
    const range = {
      startRow: Math.min(...rows),
      endRow: Math.max(...rows),
      startCol: Math.min(...cols),
      endCol: Math.max(...cols)
    }

    const merged = mergePanels(panels, basePanel.id, range)
    setPanelGrid({ ...panelGrid, panels: merged })
  }

  const handleUnmerge = (target: PanelLayout): void => {
    if (target.state !== 'master') return

    const unmerged = unmergePanel(panels, target.id)
    setPanelGrid({ ...panelGrid, panels: unmerged })
  }

  const toggleVisibility = (colIdx: number): void => {
    const panelsInCol = panels.filter((p) => p.col === colIdx)
    const isHidden = panelsInCol.every((p) => p.state === 'hidden')

    const updatedPanels = panelsInCol.map((p) => ({
      ...p,
      state: isHidden ? p.originalState ?? 'normal' : 'hidden',
      originalState: isHidden ? undefined : p.state
    }))

    const remainingPanels = panels.filter((p) => p.col !== colIdx)
    setPanelGrid({
      ...panelGrid,
      panels: [...remainingPanels, ...updatedPanels]
    })
  }

  return (
    <div>
      <div className={`grid gap-x-4pxr grid-cols-[repeat(${PANEL_COLUMNS}, auto)]`}>
        {Array.from({ length: PANEL_ROWS }).flatMap((_, rowIdx) =>
          Array.from({ length: PANEL_COLUMNS }).map((_, colIdx) => {
            const columnPanels = columnButtonMap[colIdx] || []
            const panel = columnPanels.find((p) => p.row === rowIdx)

            if (!panel) return

            const { id, row, col, mergeRange, state, originalState } = panel
            const isMaster =
              (state === 'master' || (state === 'hidden' && originalState === 'master')) &&
              mergeRange
            const { backgroundColor } = settings[id]

            const visibleStartRow = isMaster ? mergeRange.startRow + 1 : row + 1
            const visibleEndRow = isMaster ? mergeRange.endRow + 1 : 0
            const visibleStartCol = isMaster ? mergeRange.startCol + 1 : col + 1
            const visibleEndCol = isMaster ? mergeRange.endCol + 1 : 0

            const visibleInCol = columnPanels.filter((p) => p.state !== 'hidden')

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  if (state === 'master') {
                    handleUnmerge(panel)
                  } else {
                    if (visibleInCol.length === 2) {
                      handleMerge(panel)
                    }
                  }
                }}
                css={[
                  tw`w-32pxr h-full border border-gray-500 text-sm`,
                  state === 'hidden'
                    ? css`
                        background-image: repeating-linear-gradient(
                          45deg,
                          #e5e7eb,
                          #e5e7eb 5px,
                          #d1d5db 0,
                          #d1d5db 10px
                        );
                      `
                    : css`
                        background-color: ${backgroundColor};
                      `,
                  state === 'hidden' || isLight(backgroundColor) ? tw`text-black` : tw`text-white`,
                  state === 'hidden' && tw`cursor-not-allowed`,
                  css`
                    ${isMaster
                      ? `
                        grid-row-start: ${visibleStartRow};
                        grid-row-end: ${visibleEndRow + 1};
                        grid-column-start: ${visibleStartCol};
                        grid-column-end: ${visibleEndCol + 1};
                      `
                      : `
                        grid-row-start: ${visibleStartRow};
                        grid-column-start: ${visibleStartCol};
                      `}
                  `
                ]}
              >
                {colIdx + 1}
              </button>
            )
          })
        )}
      </div>

      <div className="flex gap-x-4pxr">
        {Array.from({ length: PANEL_COLUMNS }).map((_, colIdx) => {
          const panelsInCol = panels.filter((p) => p.col === colIdx)
          const isHidden = panelsInCol.every((p) => p.state === 'hidden')

          return (
            <button
              key={`hide-col-${colIdx}`}
              type="button"
              onClick={() => toggleVisibility(colIdx)}
              css={[tw`flex justify-center w-32pxr h-full border border-gray-500 text-sm`]}
            >
              {isHidden ? <IconEyeClosed stroke={1} /> : <IconEye stroke={1} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PanelVisibilityControls
