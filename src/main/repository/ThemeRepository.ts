import { FindThemeIdAndWord, FindThemeById } from '@shared/types.js'
import { getThemeDB } from './getDB.js'
import { Theme, ThemeIdAndWord } from '@shared/models.js'

export const findThemeById: FindThemeById = async (id) => {
  try {
    const db = getThemeDB('주제')

    const selectQuery = db.prepare('SELECT * FROM Theme WHERE id = ?')
    const result = selectQuery.get(id) as Theme

    return Promise.resolve(result)
  } catch (err) {
    return Promise.resolve(null)
  }
}

export const findThemeIdAndWord: FindThemeIdAndWord = async () => {
  try {
    const db = getThemeDB('주제')

    const stmt = db.prepare<[]>('SELECT id, word_ko FROM Theme')
    const rows = stmt.all() as ThemeIdAndWord[]

    return Promise.resolve(rows.length ? rows : [])
  } catch (err) {
    return Promise.resolve([])
  }
}
