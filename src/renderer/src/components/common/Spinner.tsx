import tw, { TwStyle } from 'twin.macro'

type SpinnerProps = {
  sx?: TwStyle
}

export default function Spinner({ sx }: SpinnerProps): JSX.Element {
  return (
    <div
      css={[
        tw`w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin`,
        sx
      ]}
    />
  )
}
