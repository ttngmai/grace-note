/**
 * ALL : All
 * OT : Old Testament
 * NT : New Testament
 */
export type SearchRange = 'ALL' | 'OT' | 'NT'

export function resolveBibleRange(start: number, end: number): SearchRange | null {
  if (start === 1 && end === 66) return 'ALL'
  if (start === 1 && end === 39) return 'OT'
  if (start === 40 && end === 66) return 'NT'

  return null
}
