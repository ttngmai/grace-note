import { BIBLE_COUNT_INFO, BOOK_INFO } from '@shared/constants'
import { useEffect, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import { bookAtom, chapterAtom, verseAtom } from '@renderer/store'
import useSearchBible from '@renderer/hooks/useSearchBible'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCircleArrowLeft,
  IconCircleArrowRight
} from '@tabler/icons-react'
import * as Popover from '@radix-ui/react-popover'
import Button from '../common/Button2'
import tw from 'twin.macro'
import useBibleNav from '@renderer/hooks/useBibleNav'

type SelectedBible = {
  book: number | null
  chapter: number | null
  verse: number | null
}

export default function BibleSelector(): JSX.Element {
  const bookListRef = useRef<HTMLUListElement>(null)
  const chapterListRef = useRef<HTMLUListElement>(null)
  const verseListRef = useRef<HTMLUListElement>(null)

  const book = useAtomValue(bookAtom)
  const chapter = useAtomValue(chapterAtom)
  const verse = useAtomValue(verseAtom)

  const [lastChapter, setLastChapter] = useState<number>(0)
  const [lastVerse, setLastVerse] = useState<number>(0)
  const [openBookSelector, setOpenBookSelector] = useState(false)
  const [selectedBible, setSelectedBible] = useState<SelectedBible>({ book, chapter, verse })

  const bookShortName = BOOK_INFO.find((el) => el.id === book)?.shortName

  const searchBible = useSearchBible()
  const { canGoBack, canGoForward, goBackAndSearch, goForwardAndSearch, pushAndSearch } =
    useBibleNav(searchBible)

  const scrollToSelected = (): void => {
    if (selectedBible.book && bookListRef.current) {
      const target = bookListRef.current.querySelector<HTMLLIElement>(
        `li[data-book-id="${selectedBible.book}"]`
      )
      target?.scrollIntoView({ block: 'start' })
    }

    if (selectedBible.chapter && chapterListRef.current) {
      const target = chapterListRef.current.querySelector<HTMLLIElement>(
        `li[data-chapter="${selectedBible.chapter}"]`
      )
      target?.scrollIntoView({ block: 'start' })
    }

    if (selectedBible.verse && verseListRef.current) {
      const target = verseListRef.current.querySelector<HTMLLIElement>(
        `li[data-verse="${selectedBible.verse}"]`
      )
      target?.scrollIntoView({ block: 'start' })
    }
  }

  const scrollToBook = (targetBookId: number): void => {
    const container = bookListRef.current
    if (!container) return

    const target = container.querySelector<HTMLLIElement>(`li[data-book-id="${targetBookId}"]`)
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  }

  useEffect(() => {
    setLastChapter(
      BIBLE_COUNT_INFO.filter((el) => el.book === book)
        .map((el) => el.chapter)
        .sort((a, b) => b - a)[0] || 0
    )
  }, [book])

  useEffect(() => {
    if (!selectedBible.book || !selectedBible.chapter) {
      setLastVerse(0)
      return
    }

    setLastVerse(
      BIBLE_COUNT_INFO.filter(
        (el) => el.book === selectedBible.book && el.chapter === selectedBible.chapter
      )[0].lastVerse || 0
    )
  }, [selectedBible.book, selectedBible.chapter])

  useEffect(() => {
    if (!openBookSelector) return

    setSelectedBible({ book, chapter, verse })

    setTimeout(() => {
      scrollToSelected()
    }, 0)
  }, [openBookSelector])

  return (
    <div className="flex items-center gap-6pxr">
      <div className="flex items-center gap-1pxr">
        <Button
          type="button"
          onClick={goBackAndSearch}
          size="icon"
          sx={tw`rounded-r-none w-20pxr`}
          disabled={!canGoBack}
        >
          <IconCircleArrowLeft size={16} />
        </Button>
        <Button
          type="button"
          onClick={goForwardAndSearch}
          size="icon"
          sx={tw`rounded-l-none w-20pxr`}
          disabled={!canGoForward}
        >
          <IconCircleArrowRight size={16} />
        </Button>
      </div>

      <Popover.Root open={openBookSelector} onOpenChange={setOpenBookSelector}>
        <Popover.Trigger>
          <div className="flex justify-center items-center gap-8pxr h-32pxr w-86pxr border-2 border-blue-500 rounded-md hover:bg-gray-100 font-bold text-blue-600">
            <span>{bookShortName}</span>
            <span>{`${chapter}:${verse}`}</span>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={5}
            className="flex max-h-560pxr border border-gray-300 bg-white rounded-md shadow-sm overflow-hidden"
            style={{
              height: 'calc(var(--radix-popover-content-available-height) - 16px)'
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center h-28pxr py-4pxr border-b border-b-gray-300 font-bold text-[14px]">
                <div className="flex items-center gap-2pxr w-110pxr h-full px-2pxr">
                  <Button
                    type="button"
                    onClick={() => scrollToBook(1)}
                    color="green"
                    sx={tw`flex-1 h-full`}
                  >
                    구약
                  </Button>
                  <Button
                    type="button"
                    onClick={() => scrollToBook(40)}
                    color="red"
                    sx={tw`flex-1 h-full`}
                  >
                    신약
                  </Button>
                </div>
                <div className="w-68pxr h-full border-x text-center">장</div>
                <div className="w-68pxr h-full text-center">절</div>
              </div>
              <div className="flex h-[calc(100%-28px)]">
                <ul ref={bookListRef} className="w-110pxr overflow-y-auto">
                  {BOOK_INFO.map((el) => (
                    <li
                      key={el.id}
                      data-book-id={el.id}
                      onClick={() => {
                        setSelectedBible({ book: el.id, chapter: null, verse: null })
                      }}
                      css={[
                        tw`flex items-center h-28pxr px-8pxr py-4pxr text-[14px] select-none cursor-pointer hover:font-bold hover:text-red-600`,
                        el.id <= 39
                          ? tw`bg-green-100 hover:bg-green-200`
                          : tw`bg-red-100 hover:bg-red-200`,
                        el.id === selectedBible.book && tw`font-bold text-red-600`
                      ]}
                    >
                      <span>{el.name}</span>
                    </li>
                  ))}
                </ul>
                <ul ref={chapterListRef} className="w-68pxr overflow-y-auto border-x">
                  {BIBLE_COUNT_INFO.filter((el) => el.book === selectedBible.book).map((el) => (
                    <li
                      key={el.chapter}
                      data-chapter={el.chapter}
                      onClick={() => {
                        setSelectedBible({ ...selectedBible, chapter: el.chapter, verse: null })
                      }}
                      css={[
                        tw`flex items-center h-28pxr px-8pxr py-4pxr text-[14px] select-none cursor-pointer hover:font-bold hover:text-red-600`,
                        selectedBible.book && selectedBible.book <= 39
                          ? tw`bg-green-100 hover:bg-green-200`
                          : tw`bg-red-100 hover:bg-red-200`,
                        el.chapter === selectedBible.chapter && tw`font-bold text-red-600`
                      ]}
                    >
                      {`${el.chapter}${el.book !== 19 ? '장' : '편'}`}
                    </li>
                  ))}
                </ul>
                <ul ref={verseListRef} className="w-68pxr overflow-y-auto">
                  {Array.from({ length: lastVerse }).map((_, index) => (
                    <li
                      key={index + 1}
                      data-verse={index + 1}
                      onClick={() => {
                        if (selectedBible.book && selectedBible.chapter) {
                          setSelectedBible({ ...selectedBible, verse: index + 1 })
                          pushAndSearch({
                            book: selectedBible.book,
                            chapter: selectedBible.chapter,
                            verse: index + 1
                          })
                          setOpenBookSelector(false)
                        }
                      }}
                      css={[
                        tw`flex items-center h-28pxr px-8pxr py-4pxr text-[14px] select-none cursor-pointer hover:font-bold hover:text-red-600`,
                        selectedBible.book && selectedBible.book <= 39
                          ? tw`bg-green-100 hover:bg-green-200`
                          : tw`bg-red-100 hover:bg-red-200`,
                        index + 1 === selectedBible.verse && tw`font-bold text-red-600`
                      ]}
                    >
                      {`${index + 1}절`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Popover.Arrow className="fill-gray-300" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <div className="flex items-center gap-1pxr">
        <Button
          type="button"
          onClick={() => pushAndSearch({ book: book, chapter: chapter - 1, verse: 1 })}
          size="icon"
          sx={tw`rounded-r-none w-20pxr`}
          disabled={chapter <= 1}
        >
          <IconArrowLeft size={16} />
        </Button>
        <Button
          type="button"
          onClick={() => pushAndSearch({ book: book, chapter: chapter + 1, verse: 1 })}
          size="icon"
          sx={tw`rounded-l-none w-20pxr`}
          disabled={chapter === lastChapter}
        >
          <IconArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}
