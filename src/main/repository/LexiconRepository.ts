import { FindLexicon } from '@shared/types.js'
import { getLexiconDB } from './getDB.js'
import { Lexicon } from '@shared/models.js'

export const findLexicon: FindLexicon = async (version, code) => {
  try {
    const db = getLexiconDB(version)

    const query = `SELECT * FROM Lexicon WHERE code = '${code}'`
    const readQuery = db.prepare(query)
    const rowList = readQuery.all() as Lexicon[]

    return Promise.resolve(rowList)
  } catch (err) {
    return Promise.resolve([])
  }
}
