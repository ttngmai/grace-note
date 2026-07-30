import { panelTitleSizeAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import Modal from './Modal'
import CustomSelect from './CustomSelect'
import tw, { css } from 'twin.macro'
import { IconArrowsMaximize } from '@tabler/icons-react'

type PanelTitleSizeModalProps = {
  onClose: () => void
}

export default function PanelTitleSizeModal({ onClose }: PanelTitleSizeModalProps): JSX.Element {
  const [panelTitleSize, setPanelTitleSize] = useAtom(panelTitleSizeAtom)

  return (
    <Modal title="제목 크기 (공통)" onClose={onClose}>
      <div className="flex flex-col justify-center items-center p-16pxr bg-white">
        <table css={[contentTableStyle, tw`w-200pxr`]}>
          <tr>
            <th>
              <div className="flex items-center gap-8pxr">
                <IconArrowsMaximize size={18} />
                <span>제목 크기</span>
              </div>
            </th>
            <td>
              <CustomSelect
                value={String(panelTitleSize)}
                itemList={Array.from({ length: 17 }, (_, idx) => idx + 4).map((el) => ({
                  key: String(el),
                  value: String(el),
                  text: `${el} pt`
                }))}
                setValue={(value) => setPanelTitleSize(Number(value))}
              />
            </td>
          </tr>
        </table>
      </div>
    </Modal>
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
