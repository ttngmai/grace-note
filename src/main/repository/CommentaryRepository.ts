import { FindCommentary } from '@shared/types.js'
import { getCommentaryDB } from './getDB.js'
import { Commentary } from '@shared/models.js'

export const findCommentary: FindCommentary = async (version, book, chapter) => {
  try {
    const db = getCommentaryDB(version)

    const query = `SELECT * FROM Bible WHERE book = ${book} AND chapter = ${chapter}`
    const readQuery = db.prepare(query)
    const rowList = readQuery.all() as Commentary[]

    return Promise.resolve(rowList)
  } catch (err) {
    return Promise.resolve([])
  }
}
