import { bookAtom, chapterAtom, hasAutoScrolledBasePanelAtom, verseAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'

export default function useSearchBible(): (book: number, chapter: number, verse: number) => void {
  const setHasAutoScrolledBasePanel = useSetAtom(hasAutoScrolledBasePanelAtom)
  const setBook = useSetAtom(bookAtom)
  const setChapter = useSetAtom(chapterAtom)
  const setVerse = useSetAtom(verseAtom)

  const searchBible = (book: number, chapter: number, verse: number): void => {
    setHasAutoScrolledBasePanel(false)
    setBook(book)
    setChapter(chapter)
    setVerse(verse)
  }

  return searchBible
}
