import * as Select from '@radix-ui/react-select'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { ComponentProps, forwardRef, ReactNode } from 'react'

type Item = { key: string; value: string; text: string }

type CustomSelectProps = ComponentProps<'select'> & {
  placeholder?: string
  showItemIndicator?: boolean
  itemList: Item[]
  value: string
  disabled?: boolean
  setValue: (value: string) => void
}

type SelectItemProps = {
  value: string
  disabled?: boolean
  showIndicator?: boolean
  children?: ReactNode
}

export default function CustomSelect({
  placeholder,
  showItemIndicator,
  itemList,
  value,
  disabled,
  children,
  setValue
}: CustomSelectProps): JSX.Element {
  return (
    <Select.Root value={value} onValueChange={setValue} disabled={disabled}>
      {children ? (
        <Select.Trigger>
          <Select.Value asChild>{children}</Select.Value>
        </Select.Trigger>
      ) : (
        <Select.Trigger className="inline-flex items-center justify-center gap-4pxr h-32pxr px-8pxr py-4pxr border-2 border-blue-500 bg-white text-[14px] rounded-md shadow-sm hover:bg-gray-100">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <IconChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
      )}
      <Select.Portal>
        <Select.Content className="border border-gray-300 bg-white rounded-md shadow-sm overflow-hidden">
          <Select.Viewport className="p-4pxr">
            <Select.Group>
              {itemList.map((el) => (
                <SelectItem key={el.key} value={el.value} showIndicator={showItemIndicator}>
                  {el.text}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, disabled, showIndicator }, ref) => {
    return (
      <Select.Item
        ref={ref}
        className="flex items-center gap-4pxr min-w-70pxr h-32pxr px-8pxr py-4pxr text-[14px] rounded-md select-none cursor-pointer hover:font-bold hover:text-red-600"
        value={value}
        disabled={disabled}
      >
        <Select.ItemText>{children}</Select.ItemText>
        {showIndicator && (
          <Select.ItemIndicator className="inline-flex items-center justify-center">
            <IconCheck size={14} />
          </Select.ItemIndicator>
        )}
      </Select.Item>
    )
  }
)
SelectItem.displayName = 'SelectItem'
