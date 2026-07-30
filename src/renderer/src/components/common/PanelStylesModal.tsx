import { useAtom } from 'jotai'
import Modal from './Modal'
import { IconPaint, IconPalette } from '@tabler/icons-react'
import { useState } from 'react'
import Button from './Button'
import ColorPickerModal from './ColorPickerModal'
import ModalPortal from '@renderer/utils/ModalPortal'
import tw, { css } from 'twin.macro'
import { panelGridAtom } from '@renderer/store'

type PanelStylesModalProps = {
  panelId: string
  onClose: () => void
}

export default function PanelStylesModal({ panelId, onClose }: PanelStylesModalProps): JSX.Element {
  const [panelGrid, setPanelGrid] = useAtom(panelGridAtom)
  const { settings } = panelGrid

  const [openPanelBackgroundColorPickerModal, setOpenPanelBackgroundColorPickerModal] =
    useState<boolean>(false)
  const [openPanelTextColorPickerModal, setOpenPanelTextColorPickerModal] = useState<boolean>(false)

  const setBackgroundColor = (id: string, backgroundColor: string): void => {
    const newSettings = { ...panelGrid.settings }
    if (newSettings[id]) {
      newSettings[id] = {
        ...newSettings[id],
        backgroundColor
      }
      setPanelGrid({ ...panelGrid, settings: newSettings })
    }
  }
  const setTextColor = (id: string, textColor: string): void => {
    const newSettings = { ...panelGrid.settings }
    if (newSettings[id]) {
      newSettings[id] = {
        ...newSettings[id],
        textColor
      }
      setPanelGrid({ ...panelGrid, settings: newSettings })
    }
  }

  return (
    <>
      <Modal title="배경·글자 색" onClose={onClose}>
        <div className="flex flex-col justify-center items-center p-16pxr bg-white">
          <table css={[contentTableStyle, tw`w-200pxr`]}>
            <tr>
              <th>
                <div className="flex items-center gap-8pxr">
                  <IconPaint size={18} />
                  <span>배경 색</span>
                </div>
              </th>
              <td>
                <Button
                  type="button"
                  onClick={() => setOpenPanelBackgroundColorPickerModal(true)}
                  sx={tw`w-26pxr h-26pxr p-2pxr bg-black rounded-full`}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: settings[panelId]?.backgroundColor }}
                  />
                </Button>
              </td>
            </tr>
            <tr>
              <th>
                <div className="flex items-center gap-8pxr">
                  <IconPalette size={18} />
                  <span>글자 색</span>
                </div>
              </th>
              <td>
                <Button
                  type="button"
                  onClick={() => setOpenPanelTextColorPickerModal(true)}
                  sx={tw`w-26pxr h-26pxr p-2pxr bg-black rounded-full`}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: settings[panelId]?.textColor }}
                  />
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </Modal>

      {openPanelBackgroundColorPickerModal && settings[panelId] && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings[panelId].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor(panelId, color)
              setOpenPanelBackgroundColorPickerModal(false)
            }}
            onClose={() => setOpenPanelBackgroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openPanelTextColorPickerModal && settings[panelId] && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings[panelId].textColor}
            onColorSelect={(color: string) => {
              setTextColor(panelId, color)
              setOpenPanelTextColorPickerModal(false)
            }}
            onClose={() => setOpenPanelTextColorPickerModal(false)}
          />
        </ModalPortal>
      )}
    </>
  )
}

const contentTableStyle = css`
  th,
  td {
    ${tw`py-8pxr`}
  }
  td {
    ${tw`flex justify-center items-center`}
  }
`
