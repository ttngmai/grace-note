import * as Checkbox from '@radix-ui/react-checkbox'
import { IconCheck } from '@tabler/icons-react'

type CustomCheckboxProps = {
  checked: boolean | 'indeterminate'
  onCheckedChange: (checked: boolean | 'indeterminate') => void
}

export default function CustomCheckbox({
  checked,
  onCheckedChange
}: CustomCheckboxProps): JSX.Element {
  return (
    <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange}>
      <Checkbox.Indicator>{checked === true && <IconCheck />}</Checkbox.Indicator>
    </Checkbox.Root>
  )
}
