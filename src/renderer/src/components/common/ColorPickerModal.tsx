import { useState } from 'react'
import Modal from './Modal'
import { ChromePicker } from 'react-color'
import Button from './Button2'
import tw, { css } from 'twin.macro'

type ColorPickerModalProps = {
  title: string
  defaultColor: string
  onColorSelect: (color: string) => void
  onClose: () => void
}

export default function ColorPickerModal({
  title,
  defaultColor,
  onColorSelect,
  onClose
}: ColorPickerModalProps): JSX.Element {
  const [currentColor, setCurrentColor] = useState<string>(defaultColor)

  return (
    <Modal title={title} onClose={onClose} sx={tw`w-300pxr`}>
      <div className="p-16pxr bg-white select-none">
        <div
          css={[
            tw`flex justify-center mb-16pxr`,
            css`
              .chrome-picker {
                ${tw`!w-full border border-gray-300 !shadow-none`}
              }
            `
          ]}
        >
          <ChromePicker
            color={currentColor}
            onChange={(color) => setCurrentColor(color.hex)}
            disableAlpha={true}
          />
        </div>
        <div className="flex w-full">
          <Button type="button" onClick={() => onColorSelect(currentColor)} sx={tw`ml-auto w-full`}>
            선택
          </Button>
        </div>
      </div>
    </Modal>
  )
}
