import { lexiconViewerAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import Modal from '../common/Modal'
import { useState } from 'react'
import { IconPaint, IconPalette } from '@tabler/icons-react'
import tw, { css } from 'twin.macro'
import ColorPickerModal from '../common/ColorPickerModal'
import ModalPortal from '@renderer/utils/ModalPortal'

type LexiconViewerStylesModalProps = {
  onClose: () => void
}

export default function LexiconViewerStylesModal({
  onClose
}: LexiconViewerStylesModalProps): JSX.Element {
  const [settings, setSettings] = useAtom(lexiconViewerAtom)

  const [
    openKeywordMatchedVersesBackgroundColorPickerModal,
    setOpenKeywordMatchedVersesBackgroundColorPickerModal
  ] = useState<boolean>(false)
  const [
    openKeywordMatchedVersesTextColorPickerModal,
    setOpenKeywordMatchedVersesTextColorPickerModal
  ] = useState<boolean>(false)
  const [
    openFullChaptersWithKeywordBackgroundColorPickerModal,
    setOpenFullChaptersWithKeywordBackgroundColorPickerModal
  ] = useState<boolean>(false)
  const [
    openFullChaptersWithKeywordTextColorPickerModal,
    setOpenFullChaptersWithKeywordTextColorPickerModal
  ] = useState<boolean>(false)

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
                      onClick={() => setOpenKeywordMatchedVersesBackgroundColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: settings['keywordMatchedVerses']?.backgroundColor
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
                      onClick={() => setOpenKeywordMatchedVersesTextColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: settings['keywordMatchedVerses']?.textColor }}
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
                      onClick={() => setOpenFullChaptersWithKeywordBackgroundColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: settings['fullChaptersWithKeyword']?.backgroundColor
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
                      onClick={() => setOpenFullChaptersWithKeywordTextColorPickerModal(true)}
                      className="w-26pxr h-26pxr p-2pxr bg-black rounded-full"
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: settings['fullChaptersWithKeyword']?.textColor }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {openKeywordMatchedVersesBackgroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['keywordMatchedVerses'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('keywordMatchedVerses', color)
              setOpenKeywordMatchedVersesBackgroundColorPickerModal(false)
            }}
            onClose={() => setOpenKeywordMatchedVersesBackgroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openKeywordMatchedVersesTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['keywordMatchedVerses'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('keywordMatchedVerses', color)
              setOpenKeywordMatchedVersesTextColorPickerModal(false)
            }}
            onClose={() => setOpenKeywordMatchedVersesTextColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openFullChaptersWithKeywordBackgroundColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="배경 색 선택"
            defaultColor={settings['fullChaptersWithKeyword'].backgroundColor}
            onColorSelect={(color: string) => {
              setBackgroundColor('fullChaptersWithKeyword', color)
              setOpenFullChaptersWithKeywordBackgroundColorPickerModal(false)
            }}
            onClose={() => setOpenFullChaptersWithKeywordBackgroundColorPickerModal(false)}
          />
        </ModalPortal>
      )}
      {openFullChaptersWithKeywordTextColorPickerModal && (
        <ModalPortal>
          <ColorPickerModal
            title="글자 색 선택"
            defaultColor={settings['fullChaptersWithKeyword'].textColor}
            onColorSelect={(color: string) => {
              setTextColor('fullChaptersWithKeyword', color)
              setOpenFullChaptersWithKeywordTextColorPickerModal(false)
            }}
            onClose={() => setOpenFullChaptersWithKeywordTextColorPickerModal(false)}
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
