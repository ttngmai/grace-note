import { useAtom } from 'jotai'
import {
  columnSelectorAtom,
  columnSizesAtom,
  columnSizesResetKeyAtom,
  panelGridAtom
} from '@renderer/store'
import { PanelGroup, Panel as ResizablePanel, PanelResizeHandle } from 'react-resizable-panels'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable'
import Panel from './Panel'
import { swapPanelPositions } from '@renderer/utils/panelUtils'
import { PanelLayout } from '@shared/types'
import React, { useState } from 'react'
import useVisibleCols from '@renderer/hooks/useVisibleCols'
import { nanoid } from 'nanoid'
import tw from 'twin.macro'

export default function PanelGrid(): JSX.Element {
  const [panelGrid, setPanelGrid] = useAtom(panelGridAtom)
  const [columnSelectorState, setColumnSelectorState] = useAtom(columnSelectorAtom)
  const [columnSizes, setColumnSizes] = useAtom(columnSizesAtom)
  const [columnSizesResetKey, setColumnSizesResetKey] = useAtom(columnSizesResetKeyAtom)
  const { panels, settings } = panelGrid
  const visibleCols = useVisibleCols()

  const sensors = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  const toggleColumn = (index: number): void => {
    setColumnSelectorState({
      ...columnSelectorState,
      selectedIndices: columnSelectorState.selectedIndices.includes(index)
        ? columnSelectorState.selectedIndices.filter((i) => i !== index)
        : [...columnSelectorState.selectedIndices, index]
    })
  }

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(String(event.active.id))
  }

  const handleDragOver = ({ over }): void => {
    setOverId(over?.id ?? null)
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    setActiveId(null)
    setOverId(null)

    if (!over || active.id === over.id) return

    const swapped = swapPanelPositions(panels, String(active.id), String(over.id))
    setPanelGrid({ ...panelGrid, panels: swapped })
  }

  const getLayoutFor = (col: number, row: number): PanelLayout | null => {
    return panels.find((p) => p.col === col && p.row === row && p.state !== 'hidden') || null
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={panels.map((p) => p.id)} strategy={rectSwappingStrategy}>
        <div className="flex flex-col w-full">
          <div className="flex gap-[4px] w-full">
            {columnSelectorState.visible &&
              visibleCols.map(({ colIndex }, visibleIndex) => (
                <button
                  key={colIndex}
                  type="button"
                  onClick={() => toggleColumn(colIndex)}
                  css={[
                    tw`w-full h-24pxr my-4pxr text-center rounded select-none cursor-pointer hover:font-bold`,
                    tw`bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 hover:(from-gray-400 via-gray-300 to-gray-400)`,
                    columnSelectorState.selectedIndices.includes(colIndex) &&
                      tw`from-blue-300 via-blue-200 to-blue-300 hover:(from-blue-400 via-blue-300 to-blue-400)`
                  ]}
                  style={{ flex: `${columnSizes[visibleIndex] ?? 100 / visibleCols.length} 1 0px` }}
                >
                  {colIndex + 1}
                </button>
              ))}
          </div>
          <PanelGroup
            key={columnSizesResetKey}
            direction="horizontal"
            onLayout={(sizes) => setColumnSizes(sizes)}
            style={{ gap: '2px' }}
          >
            {visibleCols.map(({ colIndex }, visibleIndex) => (
              <React.Fragment key={`resizable-col-${colIndex}`}>
                <ResizablePanel
                  defaultSize={columnSizes[visibleIndex] ?? 100 / visibleCols.length}
                  minSize={5}
                  order={colIndex}
                >
                  <PanelGroup direction="vertical" style={{ gap: '4px' }}>
                    {[0, 1].map((rowIndex) => {
                      const layout = getLayoutFor(colIndex, rowIndex)
                      if (!layout) return null

                      const isDragging = layout.id === activeId
                      const isOver = layout.id === overId

                      return (
                        <ResizablePanel key={layout.id} defaultSize={50} order={rowIndex}>
                          <Panel
                            layout={layout}
                            setting={settings[layout.id]}
                            isDragging={isDragging}
                            isOver={isOver}
                          />
                        </ResizablePanel>
                      )
                    })}
                  </PanelGroup>
                </ResizablePanel>
                {visibleIndex < visibleCols.length - 1 && (
                  <PanelResizeHandle
                    onDragging={(isDragging) => {
                      !isDragging && setColumnSizesResetKey(nanoid())
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </PanelGroup>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && (
          <div className="z-[9999] h-[calc(50vh-80px)] pointer-events-none opacity-90">
            <Panel
              layout={panels.find((p) => p.id === activeId)!}
              setting={settings[activeId]}
              isOverlay
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
