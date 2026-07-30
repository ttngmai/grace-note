import { hymnViewerAtom, playlistViewerAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useState } from 'react'
import tw, { css } from 'twin.macro'
import Modal from '../common/Modal'
import { IconPaint, IconPalette } from '@tabler/icons-react'
import ModalPortal from '@renderer/utils/ModalPortal'
import ColorPickerModal from '../common/ColorPickerModal'

type HymnViewerStylesModalProps = {
  onClose: () => void
}

export default function HymnViewerStylesModal({
  onClose
}: HymnViewerStylesModalProps): JSX.Element {
  const [settings, setSettings] = useAtom(hymnViewerAtom)
  const [playlistSettings, setPlaylistSettings] = useAtom(playlistViewerAtom)

  const [openHymnIndexBackroundColorPickerModal, setOpenHymnIndexBackroundColorPickerModal] =
    useState<boolean>(false)
  const [openHymnIndexTextColorPickerModal, setOpenHymnIndexTextColorPickerModal] =
    useState<boolean>(false)
  const [openHymnBackroundColorPickerModal, setOpenHymnBackroundColorPickerModal] =
    useState<boolean>(false)
  const [openHymnTextColorPickerModal, setOpenHymnTextColorPickerModal] = useState<boolean>(false)
  const [openPlaylistBackgroundPickerModal, setOpenPlaylistBackgroundPickerModal] =
    useState<boolean>(false)
  const [openPlaylistTextPickerModal, setOpenPlaylistTextPickerModal] = useState<boolean>(false)

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

  const setPlaylistBackgroundColor = (backgroundColor: string): void => {
    const newSettings = { ...playlistSettings }
    if (newSettings['playlist']) {
      newSettings['playlist'] = { ...newSettings['playlist'], backgroundColor }
      setPlaylistSettings(newSettings)
    }
  }

  const setPlaylistTextColor = (textColor: string): void => {
    const newSettings = { ...playlistSettings }
    if (newSettings['playlist']) {
      newSettings['playlist'] = { ...newSettings['playlist'], textColor }
      setPlaylistSettings(newSettings)
    }
  }

  return (
    <>
      <Modal title="배경·글자 색" onClose={onClose}>
        <div className="flex flex-col justify-center items-center p-16pxr bg-white">
          <table css={[contentTableStyle, tw`w-360pxr`]}>
            <thead>
              <tr>
                <th />
                <th>좌측</th>
                <th>플레이리스트</th>
                <th>우측</th>
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
                    onClick={() => setOpenHymnIndexBackroundColorPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: settings['hymnIndex']?.backgroundColor
                      }}
                    />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => setOpenPlaylistBackgroundPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: playlistSettings['playlist']?.backgroundColor
                      }}
                    />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => setOpenHymnBackroundColorPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: settings['hymn']?.backgroundColor
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
                    onClick={() => setOpenHymnIndexTextColorPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: settings['hymnIndex']?.textColor }}
                    />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => setOpenPlaylistTextPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: playlistSettings['playlist']?.textColor }}
                    />
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => setOpenHymnTextColorPickerModal(true)}
                    className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: settings['hymn']?.textColor }}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {openHymnIndexBackroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['hymnIndex'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('hymnIndex', color)
              setOpenHymnIndexBackroundColorPickerModal(false)
            }}
            onClose={() => setOpenHymnIndexBackroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openHymnIndexTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['hymnIndex'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('hymnIndex', color)
              setOpenHymnIndexTextColorPickerModal(false)
            }}
            onClose={() => setOpenHymnIndexTextColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openHymnBackroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['hymn'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('hymn', color)
              setOpenHymnBackroundColorPickerModal(false)
            }}
            onClose={() => setOpenHymnBackroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openHymnTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['hymn'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('hymn', color)
              setOpenHymnTextColorPickerModal(false)
            }}
            onClose={() => setOpenHymnTextColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openPlaylistBackgroundPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={playlistSettings['playlist'].backgroundColor}
            onColorSelect={(color: string) => {
              setPlaylistBackgroundColor(color)
              setOpenPlaylistBackgroundPickerModal(false)
            }}
            onClose={() => setOpenPlaylistBackgroundPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openPlaylistTextPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={playlistSettings['playlist'].textColor}
            onColorSelect={(color: string) => {
              setPlaylistTextColor(color)
              setOpenPlaylistTextPickerModal(false)
            }}
            onClose={() => setOpenPlaylistTextPickerModal(false)}
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
    ${tw`text-center align-middle`}
  }
`
