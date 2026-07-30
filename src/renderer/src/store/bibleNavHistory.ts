import { atom } from 'jotai'

export type BibleQuery = { book: number; chapter: number; verse: number }

type HistoryState = {
  items: BibleQuery[] // 히스토리 리스트
  index: number // 현재 커서 (-1 = 비어있음)
}

type Action =
  | { type: 'push'; payload: BibleQuery } // 히스토리 추가
  | { type: 'back'; step?: number } // 뒤로가기 (기본 1)
  | { type: 'forward'; step?: number } // 앞으로가기 (기본 1)
  | { type: 'clear' } // 전체 초기화
  | { type: 'replace'; payload: BibleQuery } // 현재 항목 치환(옵션)
  | { type: 'seedIfEmpty'; payload: BibleQuery } // 초기 세팅

const base = atom<HistoryState>({
  items: [],
  index: -1
})

export const bibleNavHistoryAtom = atom(
  (get) => get(base),
  (get, set, action: Action) => {
    const s = get(base)

    const at = (i: number): BibleQuery => s.items[i]
    const clamp = (n: number, min: number, max: number): number => Math.max(min, Math.min(max, n))

    switch (action.type) {
      case 'clear': {
        set(base, { items: [], index: -1 })
        return
      }

      case 'push': {
        const q = action.payload

        // 1) forward 잘라내기: index 이후(앞으로가기 영역) 제거
        const head = s.items.slice(0, s.index + 1)

        // 2) 연속 중복 방지: 마지막(현재)와 동일하면 무시
        if (s.index >= 0) {
          const cur = at(s.index)
          if (cur.book === q.book && cur.chapter === q.chapter && cur.verse === q.verse) {
            return
          }
        }
        let items = [...head, q]

        // 3) 최대 100개 유지 (넘치면 "오래된 것부터" 제거 = 앞에서 잘라냄)
        if (items.length > 100) {
          const excess = items.length - 100
          items = items.slice(excess)
        }

        // 4) 커서는 항상 맨 끝
        const index = items.length - 1
        set(base, { items, index })
        return
      }

      case 'replace': {
        if (s.index < 0) return
        const q = action.payload
        const items = s.items.slice()
        items[s.index] = q
        set(base, { items, index: s.index })
        return
      }

      case 'back': {
        if (s.index <= 0) return
        const step = action.step ?? 1
        const index = clamp(s.index - step, 0, s.items.length - 1)
        set(base, { items: s.items, index })
        return
      }

      case 'forward': {
        if (s.index < 0 || s.index >= s.items.length - 1) return
        const step = action.step ?? 1
        const index = clamp(s.index + step, 0, s.items.length - 1)
        set(base, { items: s.items, index })
        return
      }

      case 'seedIfEmpty': {
        if (s.index !== -1) return
        const q = action.payload
        set(base, { items: [q], index: 0 })
        return
      }
    }
  }
)

export const currentQueryAtom = atom((get) => {
  const { items, index } = get(bibleNavHistoryAtom)
  return index >= 0 ? items[index] : null
})

export const canGoBackAtom = atom((get) => {
  const { index } = get(bibleNavHistoryAtom)
  return index > 0
})

export const canGoForwardAtom = atom((get) => {
  const { items, index } = get(bibleNavHistoryAtom)
  return index >= 0 && index < items.length - 1
})
