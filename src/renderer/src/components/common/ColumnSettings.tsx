import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  columnSelectorAtom,
  columnSizesAtom,
  columnSizesResetKeyAtom,
  panelGridAtom
} from '@renderer/store'
import Button from './Button2'
import { nanoid } from 'nanoid'
import {
  IconX,
  IconColumns3,
  IconRulerMeasure,
  IconSquare,
  IconCheckbox
} from '@tabler/icons-react'
import tw from 'twin.macro'
import { PANEL_COLUMNS } from '@shared/constants'

export default function ColumnSettings(): JSX.Element {
  const [columnSelectorState, setColumnSelectorState] = useAtom(columnSelectorAtom)
  const [columnSizes, setColumnSizes] = useAtom(columnSizesAtom)
  const setColumnSizesResetKey = useSetAtom(columnSizesResetKeyAtom)
  const panelGrid = useAtomValue(panelGridAtom)

  const toggleColumnSelector = (): void => {
    setColumnSelectorState({ visible: !columnSelectorState.visible, selectedIndices: [] })
  }

  const toggleAllColumns = (): void => {
    setColumnSelectorState({
      ...columnSelectorState,
      selectedIndices:
        columnSelectorState.selectedIndices.length === PANEL_COLUMNS
          ? []
          : Array.from({ length: 12 }, (_, i) => i)
    })
  }

  const applyEqualWidth = (): void => {
    const visibleColumns = Array.from({ length: PANEL_COLUMNS }, (_, colIndex) => colIndex).filter(
      (colIndex) => {
        const panelsInCol = panelGrid.panels.filter((p) => p.col === colIndex)
        return panelsInCol.some((p) => p.state !== 'hidden')
      }
    )
    const visibleSelected = columnSelectorState.selectedIndices.filter((index) => {
      return visibleColumns.includes(index)
    })
    if (visibleSelected.length === 0) return

    const columnSizesMap = new Map()
    for (let i = 0; i < visibleColumns.length; i++) {
      columnSizesMap.set(visibleColumns[i], columnSizes[i])
    }

    const totalSelectedWidth = visibleSelected.reduce(
      (sum, index) => sum + columnSizesMap.get(index),
      0
    )
    const equalSize = totalSelectedWidth / visibleSelected.length

    const updatedSizes = Array.from(columnSizesMap.entries()).map(([key, value]) => {
      return visibleSelected.includes(key) ? equalSize : value
    })

    setColumnSizes(updatedSizes)
    setColumnSizesResetKey(() => nanoid())
  }

  return (
    <div className="relative flex items-center">
      <Button
        type="button"
        onClick={toggleColumnSelector}
        title={columnSelectorState.visible ? '열 선택 창 닫기' : '열 선택 창 열기'}
        size="icon"
        sx={tw`z-1`}
      >
        {columnSelectorState.visible ? <IconX size={18} /> : <IconColumns3 size={18} />}
      </Button>
      {columnSelectorState.visible && (
        <div className="absolute left-16pxr flex items-center gap-8pxr h-64pxr pl-24pxr pr-8pxr bg-white border border-gray-300 rounded">
          <Button type="button" onClick={toggleAllColumns} title="모든 열 선택/해제" size="icon">
            {columnSelectorState.selectedIndices.length === PANEL_COLUMNS ? (
              <IconCheckbox size={24} className="text-[#FFC83F]" />
            ) : (
              <IconSquare size={22} />
            )}
          </Button>
          <Button
            type="button"
            onClick={applyEqualWidth}
            title="선택 열 너비 동일하게 조정"
            size="icon"
          >
            <IconRulerMeasure size={18} />
          </Button>
        </div>
      )}
    </div>
  )
}
