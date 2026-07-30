import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { bookAtom, chapterAtom, verseAtom } from '@renderer/store'
import { bibleNavHistoryAtom } from '@renderer/store/bibleNavHistory'

export default function BibleNavInitializer(): JSX.Element | null {
  const book = useAtomValue(bookAtom)
  const chapter = useAtomValue(chapterAtom)
  const verse = useAtomValue(verseAtom)
  const dispatch = useSetAtom(bibleNavHistoryAtom)
  const nav = useAtomValue(bibleNavHistoryAtom)

  useEffect(() => {
    // 값이 유효하고, 아직 비어있을 때만 시드
    if (nav.index === -1 && book && chapter && verse) {
      dispatch({ type: 'seedIfEmpty', payload: { book, chapter, verse } })
    }
  }, [nav.index, book, chapter, verse, dispatch])

  return null
}
