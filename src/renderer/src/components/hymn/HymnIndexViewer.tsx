import { useMemo, useState } from 'react'
import { HYMN_CATEGORY_INDEX } from '@shared/hymnCategoryIndex'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { hymnAtom, hymnPageViewModeAtom, hymnViewerAtom, scoreViewModeAtom } from '@renderer/store'
import tw, { css } from 'twin.macro'
import { RuleSet } from 'styled-components'
import { isLight } from '@renderer/utils/contrastColor'

/** 선택된 찬송가가 속한 카테고리 레이블들을 재귀적으로 수집 */
function findCategoryLabelsForHymn(
  nodes: readonly HymnNode[],
  hymnNumber: string,
  parentLabels: string[] = []
): string[] | null {
  for (const node of nodes) {
    if (node.type === 'hymn') {
      if (node.hymnNumber === hymnNumber) return parentLabels
      continue
    }
    const labels = findCategoryLabelsForHymn(node.children, hymnNumber, [
      ...parentLabels,
      node.label
    ])
    if (labels) return labels
  }
  return null
}

type HymnNode =
  | {
      type: 'category'
      label: string
      children: readonly HymnNode[]
    }
  | {
      type: 'hymn'
      hymnNumber: string
      title: string
    }

export default function HymnIndexViewer(): JSX.Element {
  const [hymn, setHymn] = useAtom(hymnAtom)
  const setHymnPageViewModeAtom = useSetAtom(hymnPageViewModeAtom)
  const setScoreViewMode = useSetAtom(scoreViewModeAtom)
  const settings = useAtomValue(hymnViewerAtom)

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const selectedHymnCategoryLabels = useMemo(() => {
    const num = hymn?.hymn_number
    if (!num) return new Set<string>()
    const labels = findCategoryLabelsForHymn(
      HYMN_CATEGORY_INDEX as unknown as readonly HymnNode[],
      String(num)
    )
    return new Set(labels ?? [])
  }, [hymn?.hymn_number])

  const toggleOpen = (label: string): void => {
    setOpenMap((prev) => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleHymnClick = async (hymnNumber: string): Promise<void> => {
    const result = await window.context.findHymn(hymnNumber)
    if (result && result.length > 0) {
      const selectedHymn = result[0]
      const hymnNum = parseInt(hymnNumber)

      setHymn(selectedHymn)
      setHymnPageViewModeAtom('score')

      // 교독문(701~837)은 가사 모드로만 보기
      if (hymnNum >= 701 && hymnNum <= 837) {
        setScoreViewMode('textMode')
      } else {
        setScoreViewMode('imageMode') // 찬송가 클릭 시 자동으로 imageMode로 전환
      }
    }
  }

  const liStyle = (isFirstTopLevel: boolean): RuleSet<object> => css`
    position: relative;
    margin-left: 1rem;
    padding-left: 0.25rem;

    ${isFirstTopLevel
      ? css`
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -1rem;
            width: 1rem;
            height: 1rem;
            border-left: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
          }

          &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: -1rem;
            width: 1px;
            background-color: #ccc;
          }

          &:first-child::before {
            content: '';
            position: absolute;
            top: 0.75rem;
            left: -1rem;
            width: 1rem;
            height: 0;
            border-left: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
          }

          &:first-child::after {
            content: '';
            position: absolute;
            top: 0.75rem;
            bottom: 0;
            left: -1rem;
            width: 1px;
            background-color: #ccc;
          }
        `
      : ''}

    &::before {
      content: '';
      position: absolute;
      top: -0.15rem;
      left: -1rem;
      width: 1rem;
      height: 1rem;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1rem;
      width: 1px;
      background-color: #ccc;
    }

    &:only-child::after {
      display: none;
    }

    &:last-child::after {
      display: none;
    }
  `

  const renderNode = (node: HymnNode, depth = 0, isLight: boolean): JSX.Element | null => {
    const selectedHymnNumber = hymn?.hymn_number || null

    if (node.type === 'category') {
      const isSelectedCategory = selectedHymnCategoryLabels.has(node.label)
      return (
        <div>
          <div
            onClick={() => toggleOpen(node.label)}
            css={[
              tw`flex items-center gap-4pxr py-2pxr cursor-pointer select-none hover:font-bold`,
              isLight ? tw`hover:text-red-600` : tw`hover:text-red-300`,
              isSelectedCategory &&
                (isLight ? tw`font-bold text-red-600` : tw`font-bold text-red-300`)
            ]}
          >
            <span className="text-[0.8em]">{openMap[node.label] ? '▼' : '▶'}</span>
            <span>{node.label}</span>
          </div>
          {openMap[node.label] && (
            <ul css={tw`pl-2`}>
              {node.children.map((child) => (
                <li
                  key={child.type === 'category' ? child.label : child.hymnNumber}
                  css={liStyle(false)}
                >
                  {renderNode(child, depth + 1, isLight)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    if (node.type === 'hymn') {
      return (
        <div
          css={[
            tw`py-2pxr cursor-pointer select-none hover:font-bold`,
            isLight ? tw`hover:text-red-600` : tw`hover:text-red-300`,
            selectedHymnNumber === node.hymnNumber &&
              (isLight ? tw`font-bold text-red-600` : tw`font-bold text-red-300`)
          ]}
          onClick={() => handleHymnClick(node.hymnNumber)}
        >
          {node.hymnNumber}. {node.title}
        </div>
      )
    }

    return null
  }

  return (
    <div
      className="flex flex-col h-full p-4 overflow-y-auto"
      style={{ color: settings['hymnIndex'].textColor }}
    >
      <ul css={tw`pl-2`}>
        {HYMN_CATEGORY_INDEX.map((node) => (
          <li key={node.label} css={liStyle(true)}>
            {renderNode(node, 0, isLight(settings['hymnIndex'].backgroundColor))}
          </li>
        ))}
      </ul>
    </div>
  )
}
