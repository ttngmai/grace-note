import {
  Bible,
  Commentary,
  Hymn,
  HymnNumberAndTitle,
  Lexicon,
  Theme,
  ThemeIdAndWord
} from './models.js'

export type PagedResult<T> = {
  data: T[]
  totalCount: number
  currentPage: number
  totalPages: number
}

export enum PanelCategory {
  BIBLE = '성경',
  COMMENTARY = '주석',
  CODED_BIBLE = '코드역본',
  LEXICON = '원어사전',
  NONE = '없음'
}

export type PanelState = 'normal' | 'master' | 'hidden'

export type PanelLayout = {
  id: string
  row: number
  col: number
  state: PanelState
  originalState?: PanelState // 숨기기 전에 상태를 기억
  mergeRange?: { startRow: number; startCol: number; endRow: number; endCol: number }
}

export type PanelSettings = {
  id: string
  isBase: boolean
  category: PanelCategory
  version: string
  backgroundColor: string
  textColor: string
}

export type PanelGrid = {
  panels: PanelLayout[]
  settings: Record<string, PanelSettings>
}

export type ColumnSelectorState = {
  visible: boolean
  selectedIndices: number[]
}

export type ViewerSettings = {
  backgroundColor: string
  textColor: string
}

export type FindBible = (version: string, book: number, chapter: number) => Promise<Bible[]>

export type FindCommentary = (
  version: string,
  book: number,
  chapter: number
) => Promise<Commentary[]>

export type FindKeywordFromBibleParams = {
  version: string
  bookRange: [number, number]
  keywords: string[]
  matchType: 'all' | 'any'
}

export type FindKeywordFromBible = (
  params: FindKeywordFromBibleParams & {
    page?: number
    pageSize?: number
  }
) => Promise<PagedResult<Bible>>

export type FindLexicalCodeFromBibleParams = {
  version: string
  bookRange: [number, number]
  codes: string[]
  matchType: 'all' | 'any'
}

export type FindLexicalCodeFromBible = (
  params: FindLexicalCodeFromBibleParams & {
    page?: number
    pageSize?: number
  }
) => Promise<PagedResult<Bible>>

export type FindLexicon = (version: string, code: string) => Promise<Lexicon[]>

export type FindHymn = (hymnNumber: string) => Promise<Hymn[]>

export type FindKeywordFromHymnParams = {
  searchTarget: 'title' | 'lyrics'
  keywords: string[]
  matchType: 'all' | 'any'
}

export type FindKeywordFromHymn = (
  params: FindKeywordFromHymnParams & {
    page?: number
    pageSize?: number
  }
) => Promise<PagedResult<Hymn>>

export type FindHymnNumberAndTitle = () => Promise<HymnNumberAndTitle[]>

export type HymnPageViewMode = 'score' | 'search' | 'list'

export type ScoreViewMode = 'imageMode' | 'textMode'

export type FindThemeById = (id: number) => Promise<Theme | null>

export type FindThemeIdAndWord = () => Promise<ThemeIdAndWord[]>
