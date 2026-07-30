import {
  bibleNavHistoryAtom,
  BibleQuery,
  canGoBackAtom,
  canGoForwardAtom,
  currentQueryAtom
} from '@renderer/store/bibleNavHistory'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

type BibleNav = {
  current: BibleQuery | null
  canGoBack: boolean
  canGoForward: boolean
  pushAndSearch: (q: BibleQuery) => Promise<void>
  goBackAndSearch: () => Promise<void>
  goForwardAndSearch: () => Promise<void>
}

export default function useBibleNav(
  searchBible: (book: number, chapter: number, verse: number) => Promise<void> | void
): BibleNav {
  const nav = useAtomValue(bibleNavHistoryAtom)
  const cur = useAtomValue(currentQueryAtom)
  const canBack = useAtomValue(canGoBackAtom)
  const canForward = useAtomValue(canGoForwardAtom)
  const dispatch = useSetAtom(bibleNavHistoryAtom)

  const pushAndSearch = useCallback(
    async (q: BibleQuery) => {
      // 먼저 push로 상태 확정 -> current가 q가 되도록
      dispatch({ type: 'push', payload: q })
      await Promise.resolve(searchBible(q.book, q.chapter, q.verse))
    },
    [dispatch, searchBible]
  )

  const goBackAndSearch = useCallback(async () => {
    if (!canBack) return
    // 이동 전에 목표 index 계산
    const nextIndex = Math.max(0, nav.index - 1)
    const next = nav.items[nextIndex]
    dispatch({ type: 'back' })
    await Promise.resolve(searchBible(next.book, next.chapter, next.verse))
  }, [canBack, nav.index, nav.items, dispatch, searchBible])

  const goForwardAndSearch = useCallback(async () => {
    if (!canForward) return
    const nextIndex = Math.min(nav.items.length - 1, nav.index + 1)
    const next = nav.items[nextIndex]
    dispatch({ type: 'forward' })
    await Promise.resolve(searchBible(next.book, next.chapter, next.verse))
  }, [canForward, nav.index, nav.items, dispatch, searchBible])

  return {
    current: cur,
    canGoBack: canBack,
    canGoForward: canForward,
    pushAndSearch,
    goBackAndSearch,
    goForwardAndSearch
  }
}
