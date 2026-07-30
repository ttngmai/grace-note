import { themeAtom, themeTextSizeAtom, themeViewerAtom } from '@renderer/store'
import { parseRtfLikeToHtml } from '@renderer/utils/rtfParser'
import { Theme } from '@shared/models'
import { useAtomValue } from 'jotai'
import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import ThemeTextSizeSelector from './ThemeTextSizeSelector'
import CustomSelect from '../common/CustomSelect'
import Button from '../common/Button2'
import { IconSettings } from '@tabler/icons-react'
import ModalPortal from '@renderer/utils/ModalPortal'
import ThemeViewerStylesModal from './ThemeViewerStylesModal'
import { isLight } from '@renderer/utils/contrastColor'
import tw from 'twin.macro'

export default function ThemeViewer(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const theme = useAtomValue(themeAtom)
  const textSize = useAtomValue(themeTextSizeAtom)
  const settings = useAtomValue(themeViewerAtom)

  const [keywords, setKeywords] = useState<string[]>([])
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [openStylesModal, setOpenStylesModal] = useState<boolean>(false)

  const { word_ko, word_en, name_type, mid_bracket } = theme || {}

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }

    setSelectedKeyword(null)
  }, [theme])

  useEffect(() => {
    if (mid_bracket) {
      const matches = Array.from(mid_bracket.matchAll(/\[(\d+)\]\s*([^[]+)/g))
      const result = matches.map(([, num, text]) => `[${num}] ${text.trim()}`)
      setKeywords(result)
    } else {
      setKeywords([])
    }
  }, [mid_bracket])

  useEffect(() => {
    if (!selectedKeyword || !containerRef.current || !headerRef.current || !contentRef.current)
      return

    const keyword = selectedKeyword.replace(/\[(\d+)\]\s*/, '')
    const elements = Array.from(contentRef.current.querySelectorAll('*'))

    let count = 0
    for (const el of elements) {
      if (el.textContent?.includes(keyword)) {
        count++
        if (count === 2) {
          const targetTop =
            el.getBoundingClientRect().top +
            containerRef.current.scrollTop -
            headerRef.current.offsetHeight -
            16

          containerRef.current.scrollTo({ top: targetTop, behavior: 'instant' })
          break
        }
      }
    }
  }, [selectedKeyword])

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col h-full overflow-y-scroll"
        style={{ backgroundColor: settings['theme'].backgroundColor }}
      >
        <div
          ref={headerRef}
          className="sticky top-0 flex-col p-16pxr"
          style={{ backgroundColor: settings['theme'].backgroundColor }}
        >
          <div className="flex items-center">
            <div
              className={`text-[${textSize}px]`}
              css={[!isLight(settings['theme'].backgroundColor) && tw`text-white`]}
            >
              <span className="text-[1.5em] font-bold">{word_ko}</span>
              {word_en && <span className="font-bold"> / {word_en}</span>}
              {name_type && <span className="ml-[0.25rem]">{name_type}</span>}
            </div>
            <div className="flex items-center shrink-0 gap-8pxr w-fit ml-auto">
              <ThemeTextSizeSelector />
              <Button type="button" onClick={() => setOpenStylesModal(true)} size="icon">
                <IconSettings size={18} />
              </Button>
            </div>
          </div>
          {keywords.length > 0 && (
            <div className="mt-8pxr">
              <CustomSelect
                value={selectedKeyword || ''}
                placeholder="선택"
                itemList={keywords.map((keyword: string) => ({
                  key: keyword,
                  value: keyword,
                  text: keyword
                }))}
                setValue={(value) => setSelectedKeyword(value)}
              />
            </div>
          )}
        </div>
        {theme && (
          <RichBibleContent
            theme={theme}
            backgroundColor={settings['theme'].backgroundColor}
            color={settings['theme'].textColor}
            textSize={textSize}
            contentRef={contentRef}
          />
        )}
      </div>

      {openStylesModal && (
        <ModalPortal>
          <ThemeViewerStylesModal onClose={() => setOpenStylesModal(false)} />
        </ModalPortal>
      )}
    </>
  )
}

type RichBibleContentProps = {
  theme: Theme
  backgroundColor: string
  color: string
  textSize: number
  contentRef: RefObject<HTMLDivElement>
}

function RichBibleContent({
  theme,
  backgroundColor,
  color,
  textSize,
  contentRef
}: RichBibleContentProps): JSX.Element {
  const { content_rich, meaning } = theme

  const parsedHtml = useMemo(
    () => parseRtfLikeToHtml(content_rich, isLight(backgroundColor)),
    [content_rich]
  )

  return (
    <div className={`p-16pxr pt-0 text-[${textSize}px]`} style={{ backgroundColor, color }}>
      {meaning && (
        <div className="mb-[1rem]">
          <span>{meaning}</span>
        </div>
      )}
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: parsedHtml }} />
    </div>
  )
}
