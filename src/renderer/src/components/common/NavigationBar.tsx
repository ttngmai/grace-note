import tw, { css, TwStyle } from 'twin.macro'
import Button from './Button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

type NavigationBarProps = {
  sx?: TwStyle
  children?: React.ReactNode
}

export default function NavigationBar({ sx, children }: NavigationBarProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false)

  const handleScroll = (direction): void => {
    const scrollAmount = 200
    scrollRef.current?.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = (): void => {
      if (!scrollRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }

    if (scrollRef.current) {
      handleScroll() // 초기 상태 설정
      scrollRef.current.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll) // 창 크기 변경 시에도 업데이트
    }

    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="sticky top-0 flex">
        {canScrollLeft && (
          <Button
            type="button"
            onClick={() => handleScroll(-1)}
            variant="ghost"
            sx={tw`sticky left-0 h-auto border border-t-0 border-gray-300 bg-white rounded-none`}
          >
            <IconChevronLeft size={18} />
          </Button>
        )}
        <div
          ref={scrollRef}
          css={[
            tw`flex w-full h-60pxr border-b border-b-gray-300 bg-white select-none overflow-x-scroll`,
            css`
              -ms-overflow-style: none;
              scrollbar-width: none;
            `,
            sx
          ]}
        >
          <div className="flex items-center w-full h-full px-16pxr py-8pxr">{children}</div>
        </div>
        {canScrollRight && (
          <Button
            type="button"
            onClick={() => handleScroll(1)}
            variant="ghost"
            sx={tw`sticky right-0 h-auto bg-white rounded-none border border-t-0 border-gray-300`}
          >
            <IconChevronRight size={18} />
          </Button>
        )}
      </div>
    </>
  )
}
