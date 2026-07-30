import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconChevronRight } from '@tabler/icons-react'
import { PanelCategory } from '@shared/types'
import { TwStyle } from 'twin.macro'
import { useAtom, useAtomValue } from 'jotai'
import { PANEL_CATEGORIES_AND_VERSIONS } from '@shared/constants'
import { panelGridAtom, panelTitleSizeAtom } from '@renderer/store'

type PanelCategorySelectorProps = {
  panelId: string
  placeholder?: string
  sx?: TwStyle
}

export default function PanelCategorySelector({
  panelId,
  placeholder,
  sx
}: PanelCategorySelectorProps): JSX.Element {
  const [panelGrid, setPanelGrid] = useAtom(panelGridAtom)
  const panelTitleSize = useAtomValue(panelTitleSizeAtom)

  const selectPanelCategoryAndVersion = (
    id: string,
    newCategory: PanelCategory,
    newVersion: string
  ): void => {
    const newSettings = { ...panelGrid.settings }
    if (newSettings[id]) {
      newSettings[id] = {
        ...newSettings[id],
        category: newCategory,
        version: newVersion
      }
      setPanelGrid({ ...panelGrid, settings: newSettings })
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger css={[sx]} style={{ fontSize: `${panelTitleSize}px` }}>
        {placeholder || '없음'}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="w-100pxr border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={dropdownMenuItemStyle}>
              성경
              <IconChevronRight size={14} className="ml-auto" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="w-100pxr border border-gray-300 bg-white rounded-md shadow-sm">
                {PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.BIBLE].map((bible) => (
                  <DropdownMenu.Item
                    key={bible}
                    onSelect={() => {
                      selectPanelCategoryAndVersion(panelId, PanelCategory.BIBLE, bible)
                    }}
                    className={dropdownMenuItemStyle}
                  >
                    {bible}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={dropdownMenuItemStyle}>
              주석
              <IconChevronRight size={14} className="ml-auto" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="w-100pxr border border-gray-300 bg-white rounded-md shadow-sm">
                {PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.COMMENTARY].map((commentary) => (
                  <DropdownMenu.Item
                    key={commentary}
                    onSelect={() => {
                      selectPanelCategoryAndVersion(panelId, PanelCategory.COMMENTARY, commentary)
                    }}
                    className={dropdownMenuItemStyle}
                  >
                    {commentary}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={dropdownMenuItemStyle}>
              코드역본
              <IconChevronRight size={14} className="ml-auto" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="w-100pxr border border-gray-300 bg-white rounded-md shadow-sm">
                {PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.CODED_BIBLE].map((codedBible) => (
                  <DropdownMenu.Item
                    key={codedBible}
                    onSelect={() => {
                      selectPanelCategoryAndVersion(panelId, PanelCategory.CODED_BIBLE, codedBible)
                    }}
                    className={dropdownMenuItemStyle}
                  >
                    {codedBible}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={dropdownMenuItemStyle}>
              원어사전
              <IconChevronRight size={14} className="ml-auto" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="w-100pxr border border-gray-300 bg-white rounded-md shadow-sm">
                {PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.LEXICON].map((lexicon) => (
                  <DropdownMenu.Item
                    key={lexicon}
                    onSelect={() => {
                      selectPanelCategoryAndVersion(panelId, PanelCategory.LEXICON, lexicon)
                    }}
                    className={dropdownMenuItemStyle}
                  >
                    {lexicon}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Item
            onSelect={() => {
              selectPanelCategoryAndVersion(panelId, PanelCategory.NONE, '')
            }}
            className={dropdownMenuItemStyle}
          >
            없음
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const dropdownMenuItemStyle =
  'flex items-center gap-4pxr h-32pxr px-8pxr py-4pxr text-[14px] select-none cursor-pointer hover:font-bold hover:text-blue-600'
