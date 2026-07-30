import {
  ComponentProps,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref,
  MutableRefObject,
  useRef,
  useState
} from 'react'
import tw, { TwStyle } from 'twin.macro'

/** ---------- 타입 ---------- */
type Variant = 'standard' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg' | 'icon'
type Color = 'blue' | 'green' | 'purple' | 'gray' | 'red'

type FillMode = 'gradient' | 'solid'

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant
  size?: Size
  color?: Color
  /** 모든 variant에 공통 적용되는 채움 모드 */
  fillMode?: FillMode // default: 'gradient'
  sx?: TwStyle
  children?: ReactNode
}

type Ripple = { id: number; x: number; y: number; size: number }

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null): void => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') ref(value)
      else (ref as MutableRefObject<T | null>).current = value
    })
  }
}

const sizeVariants: Record<Size, TwStyle> = {
  sm: tw`h-32pxr px-12pxr text-[14px] rounded-md`,
  md: tw`h-40pxr px-16pxr text-[15px] rounded-lg`,
  lg: tw`h-48pxr px-20pxr text-[16px] rounded-xl`,
  icon: tw`h-32pxr w-32pxr rounded-md`
}

type Palette = {
  grad: TwStyle
  gradHover: TwStyle
  /** 단색 배경(gradient가 아닌 경우) */
  solid: TwStyle
  solidHover: TwStyle
  shadow: TwStyle
  textMain: TwStyle
  ghostHoverGradient: TwStyle
  ghostHoverSolid: TwStyle
  outlineBorder: TwStyle
}

const palettes: Record<Color, Palette> = {
  blue: {
    grad: tw`bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700`,
    gradHover: tw`hover:from-blue-600 hover:via-blue-700 hover:to-blue-800`,
    solid: tw`bg-blue-600`,
    solidHover: tw`hover:bg-blue-700`,
    shadow: tw`shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40`,
    textMain: tw`text-blue-700`,
    ghostHoverGradient: tw`hover:(bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700)`,
    ghostHoverSolid: tw`hover:bg-blue-600`,
    outlineBorder: tw`border-blue-600`
  },
  green: {
    grad: tw`bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700`,
    gradHover: tw`hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800`,
    solid: tw`bg-emerald-600`,
    solidHover: tw`hover:bg-emerald-700`,
    shadow: tw`shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40`,
    textMain: tw`text-emerald-700`,
    ghostHoverGradient: tw`hover:(bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700)`,
    ghostHoverSolid: tw`hover:bg-emerald-600`,
    outlineBorder: tw`border-emerald-600`
  },
  purple: {
    grad: tw`bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700`,
    gradHover: tw`hover:from-violet-600 hover:via-violet-700 hover:to-violet-800`,
    solid: tw`bg-violet-600`,
    solidHover: tw`hover:bg-violet-700`,
    shadow: tw`shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40`,
    textMain: tw`text-violet-700`,
    ghostHoverGradient: tw`hover:(bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700)`,
    ghostHoverSolid: tw`hover:bg-violet-600`,
    outlineBorder: tw`border-violet-600`
  },
  gray: {
    grad: tw`bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600`,
    gradHover: tw`hover:from-gray-500 hover:via-gray-600 hover:to-gray-700`,
    solid: tw`bg-gray-500`,
    solidHover: tw`hover:bg-gray-600`,
    shadow: tw`shadow-lg shadow-gray-500/30 hover:shadow-gray-500/40`,
    textMain: tw`text-gray-700`,
    ghostHoverGradient: tw`hover:(bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600)`,
    ghostHoverSolid: tw`hover:bg-gray-500`,
    outlineBorder: tw`border-gray-500`
  },
  red: {
    grad: tw`bg-gradient-to-r from-red-500 via-red-600 to-red-700`,
    gradHover: tw`hover:from-red-600 hover:via-red-700 hover:to-red-800`,
    solid: tw`bg-red-600`,
    solidHover: tw`hover:bg-red-700`,
    shadow: tw`shadow-lg shadow-red-500/30 hover:shadow-red-500/40`,
    textMain: tw`text-red-700`,
    ghostHoverGradient: tw`hover:(bg-gradient-to-r from-red-500 via-red-600 to-red-700)`,
    ghostHoverSolid: tw`hover:bg-red-600`,
    outlineBorder: tw`border-red-600`
  }
}

const baseButton = tw`
  relative isolate overflow-hidden inline-flex items-center justify-center select-none
  transition-all duration-300 ease-out active:scale-[0.98]
`
const baseDisabled = tw`disabled:(opacity-50 cursor-not-allowed shadow-none)`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'standard',
      size = 'sm',
      color = 'blue',
      fillMode = 'gradient',
      sx,
      children,
      disabled,
      onClick,
      ...props
    },
    externalRef
  ) => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const [ripples, setRipples] = useState<Ripple[]>([])
    const pal = palettes[color]

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
      if (disabled) return
      const rect = btnRef.current?.getBoundingClientRect()
      if (rect) {
        const size = Math.max(rect.width, rect.height) * 1.2
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        const id = Date.now()
        setRipples((prev) => [...prev, { id, x, y, size }])
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 500)
      }
      onClick?.(e)
    }

    // variant에 공통 적용되는 외곽 스타일(경계/배경)은 fillMode에 따라 달라진다.
    const outerBaseByVariant: Record<Variant, TwStyle[]> = {
      standard: [tw`text-white`],
      outline: [tw`p-[2px]`],
      ghost: [tw`bg-transparent transition-colors duration-300`]
    }

    // fillMode 반영: gradient vs solid 선택
    const outerFillByVariant: Record<Variant, TwStyle[]> = {
      standard: fillMode === 'gradient' ? [pal.grad, pal.gradHover] : [pal.solid, pal.solidHover],
      // outline은 외곽 배경을 경계 효과로 사용 → gradient이면 그라데이션 보더, solid면 단색 보더
      outline: fillMode === 'gradient' ? [pal.grad, pal.gradHover] : [pal.solid, pal.solidHover],
      // ghost는 hover시에만 배경 적용
      ghost: fillMode === 'gradient' ? [pal.ghostHoverGradient] : [pal.ghostHoverSolid]
    }

    const innerByVariant: Record<Variant, TwStyle[]> = {
      standard: [tw`bg-transparent w-full h-full [border-radius:inherit]`],
      outline: [
        tw`bg-white transition-colors duration-300 ease-out border w-full h-full [border-radius:inherit]`,
        pal.textMain,
        pal.outlineBorder,
        tw`hover:(bg-transparent text-white)`
      ],
      ghost: [
        tw`bg-transparent transition-colors duration-300 ease-out w-full h-full [border-radius:inherit]`,
        pal.textMain,
        tw`group-hover:(text-white)`
      ]
    }

    return (
      <button
        ref={mergeRefs(btnRef, externalRef)}
        onClick={handleClick}
        disabled={disabled}
        className="group"
        css={[
          baseButton,
          sizeVariants[size],
          outerBaseByVariant[variant],
          outerFillByVariant[variant],
          variant !== 'ghost' && pal.shadow,
          baseDisabled,
          size === 'icon' && tw`p-0`,
          sx
        ]}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            css={[
              tw`pointer-events-none absolute rounded-full animate-ping bg-white/40`,
              { left: r.x, top: r.y, width: r.size, height: r.size }
            ]}
          />
        ))}

        <span
          css={[
            tw`relative inline-flex items-center justify-center gap-2`,
            innerByVariant[variant]
          ]}
        >
          {children}
        </span>
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
