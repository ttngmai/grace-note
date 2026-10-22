import Modal from './Modal'
import PanelTextSizeSelector from './PanelTextSizeSelector'
import tw, { css } from 'twin.macro'
import { IconArrowsMaximize } from '@tabler/icons-react'

type PanelContentSizeModalProps = {
  onClose: () => void
}

export default function PanelContentSizeModal({
  onClose
}: PanelContentSizeModalProps): JSX.Element {
  return (
    <Modal title="내용 크기 (공통)" onClose={onClose}>
      <div className="flex flex-col justify-center items-center p-16pxr bg-white">
        <table css={[contentTableStyle, tw`w-200pxr`]}>
          <tr>
            <th>
              <div className="flex items-center gap-8pxr">
                <IconArrowsMaximize size={18} />
                <span>내용 크기</span>
              </div>
            </th>
            <td>
              <PanelTextSizeSelector />
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
