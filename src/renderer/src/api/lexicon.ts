import { Bible } from '@shared/models'
import { FindLexicalCodeFromBibleParams, PagedResult } from '@shared/types'

export const fetchLexicons = async ({
  pageParam = 1,
  ...params
}: FindLexicalCodeFromBibleParams & { pageParam?: number }): Promise<PagedResult<Bible>> => {
  const result = await window.context.findLexicalCodeFromBible({ ...params, page: pageParam })

  return result
}
