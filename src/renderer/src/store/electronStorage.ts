export const electronStorage = {
  getItem: (key: string): unknown => window.electron.store.get(key),
  setItem: (key: string, value): void => window.electron.store.set(key, value),
  removeItem: (key: string): void => window.electron.store.delete(key)
}
