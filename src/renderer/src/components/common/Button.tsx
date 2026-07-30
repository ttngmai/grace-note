import { ComponentProps, forwardRef } from 'react'
import tw, { TwStyle } from 'twin.macro'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'standard' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  color?: 'blue'
  sx?: TwStyle
}

const sizeVariants = {
  sm: tw`h-32pxr p-4pxr text-[14px] rounded-md`,
  icon: tw`h-32pxr w-32pxr rounded-md`
}
const variants = {
  standard: tw`border text-white bg-blue-600 shadow-sm`,
  outline: tw`border border-gray-300 shadow-sm`,
  ghost: tw`text-black hover:bg-[#F4F4F5]`
}
const styles = {
  size: ({ size }): TwStyle => sizeVariants[size],
  variant: ({ variant }): TwStyle => variants[variant]
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'standard', size = 'sm', sx, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        css={[
          tw`inline-flex justify-center items-center`,
          styles.variant({ variant }),
          styles.size({ size }),
          tw`disabled:border-[#bdc4d4] disabled:bg-[#efefef] disabled:text-[#333] disabled:shadow-none disabled:cursor-not-allowed`,
          sx
        ]}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
