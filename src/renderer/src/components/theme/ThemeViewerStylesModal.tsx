import { themeViewerAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useState } from 'react'
import tw, { css } from 'twin.macro'
import Modal from '../common/Modal'
import { IconPaint, IconPalette } from '@tabler/icons-react'
import ModalPortal from '@renderer/utils/ModalPortal'
import ColorPickerModal from '../common/ColorPickerModal'

type ThemeViewerStylesModalProps = {
  onClose: () => void
}

export default function ThemeViewerStylesModal({
  onClose
}: ThemeViewerStylesModalProps): JSX.Element {
  const [settings, setSettings] = useAtom(themeViewerAtom)

  const [openThemeIndexBackroundColorPickerModal, setOpenThemeIndexBackroundColorPickerModal] =
    useState<boolean>(false)
  const [openThemeIndexTextColorPickerModal, setOpenThemeIndexTextColorPickerModal] =
    useState<boolean>(false)
  const [openThemeBackroundColorPickerModal, setOpenThemeBackroundColorPickerModal] =
    useState<boolean>(false)
  const [openThemeTextColorPickerModal, setOpenThemeTextColorPickerModal] = useState<boolean>(false)

  const setBackgroundColor = (id: string, backgroundColor: string): void => {
    const newSettings = { ...settings }
    if (newSettings[id]) {
      newSettings[id] = {
        ...newSettings[id],
        backgroundColor
      }
      setSettings(newSettings)
    }
  }

  const setTextColor = (id: string, textColor: string): void => {
    const newSettings = { ...settings }
    if (newSettings[id]) {
      newSettings[id] = {
        ...newSettings[id],
        textColor
      }
      setSettings(newSettings)
    }
  }

  return (
    <>
      <Modal title="배경·글자 색" onClose={onClose}>
        <div className="flex flex-col justify-center items-center p-16pxr bg-white">
          <div className="flex gap-40pxr">
            <table css={[contentTableStyle, tw`w-120pxr`]}>
              <thead>
                <tr>
                  <th colSpan={2}>좌측</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="flex items-center gap-8pxr">
                      <IconPaint size={18} />
                      <span>배경 색</span>
                    </div>
                  </th>
                  <td>
                    <button
                      type="button"
                      onClick={() => setOpenThemeIndexBackroundColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: settings['themeIndex']?.backgroundColor
                        }}
                      />
                    </button>
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
                    <button
                      type="button"
                      onClick={() => setOpenThemeIndexTextColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: settings['themeIndex']?.textColor }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table css={[contentTableStyle, tw`w-120pxr`]}>
              <thead>
                <tr>
                  <th colSpan={2}>우측</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="flex items-center gap-8pxr">
                      <IconPaint size={18} />
                      <span>배경 색</span>
                    </div>
                  </th>
                  <td>
                    <button
                      type="button"
                      onClick={() => setOpenThemeBackroundColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: settings['theme']?.backgroundColor
                        }}
                      />
                    </button>
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
                    <button
                      type="button"
                      onClick={() => setOpenThemeTextColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: settings['theme']?.textColor }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {openThemeIndexBackroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['themeIndex'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('themeIndex', color)
              setOpenThemeIndexBackroundColorPickerModal(false)
            }}
            onClose={() => setOpenThemeIndexBackroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openThemeIndexTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['themeIndex'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('themeIndex', color)
              setOpenThemeIndexTextColorPickerModal(false)
            }}
            onClose={() => setOpenThemeIndexTextColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openThemeBackroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['theme'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('theme', color)
              setOpenThemeBackroundColorPickerModal(false)
            }}
            onClose={() => setOpenThemeBackroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openThemeTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['theme'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('theme', color)
              setOpenThemeTextColorPickerModal(false)
            }}
            onClose={() => setOpenThemeTextColorPickerModal(false)}
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
