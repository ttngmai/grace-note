import { Bible } from '@shared/models'
import { FindKeywordFromBibleParams, PagedResult } from '@shared/types'

export const fetchBibleVerses = async ({
  pageParam = 1,
  ...params
}: FindKeywordFromBibleParams & { pageParam?: number }): Promise<PagedResult<Bible>> => {
  const result = await window.context.findKeywordFromBible({ ...params, page: pageParam })

  return result
}
