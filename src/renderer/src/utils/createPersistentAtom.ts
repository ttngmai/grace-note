import { atom, WritableAtom } from 'jotai'

export function createPersistentAtom<T>(key: string, defaultValue: T): WritableAtom<T, [T], void> {
  const baseAtom = atom(window.electron.store.get(key) ?? defaultValue)

  const persistentAtom = atom(
    (get) => get(baseAtom),
    (_, set, newValue) => {
      set(baseAtom, newValue)
      window.electron.store.set(key, newValue)
    }
  )

  return persistentAtom
}
