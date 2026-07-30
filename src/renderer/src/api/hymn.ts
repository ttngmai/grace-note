import { Hymn } from '@shared/models'
import { FindKeywordFromHymnParams, PagedResult } from '@shared/types'

export const fetchHymns = async ({
  pageParam = 1,
  ...params
}: FindKeywordFromHymnParams & { pageParam?: number }): Promise<PagedResult<Hymn>> => {
  const result = await window.context.findKeywordFromHymn({ ...params, page: pageParam })

  return result
}
