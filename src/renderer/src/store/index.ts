import { createPersistentAtom } from '@renderer/utils/createPersistentAtom'
import { createInitialPanelGrid } from '@renderer/utils/panelUtils'
import { PANEL_CATEGORIES_AND_VERSIONS, PANEL_COLUMNS } from '@shared/constants'
import { Bible, Hymn, Theme } from '@shared/models'
import {
  FindKeywordFromBibleParams,
  ColumnSelectorState,
  ScoreViewMode,
  FindLexicalCodeFromBibleParams,
  PanelCategory,
  PagedResult,
  PanelGrid,
  FindKeywordFromHymnParams,
  HymnPageViewMode,
  ViewerSettings
} from '@shared/types'
import { atom } from 'jotai'

export const panelGridAtom = createPersistentAtom<PanelGrid>('panelGrid', createInitialPanelGrid())
export const columnSelectorAtom = atom<ColumnSelectorState>({
  visible: false,
  selectedIndices: []
})
export const columnSizesAtom = createPersistentAtom<number[]>(
  'columnSizes',
  Array.from({ length: PANEL_COLUMNS }, () => 1)
)
export const columnSizesResetKeyAtom = atom<string>('columnSizesResetKey')
export const panelTitleSizeAtom = createPersistentAtom<number>('panelTitleSize', 14)
export const panelTextSizeAtom = createPersistentAtom<number>('panelTextSize', 16)
export const hasAutoScrolledBasePanelAtom = atom<boolean>(false)

export const bookAtom = createPersistentAtom<number>('book', 1)
export const chapterAtom = createPersistentAtom<number>('chapter', 1)
export const verseAtom = createPersistentAtom<number>('verse', 1)

export const bibleVerseTextSizeAtom = createPersistentAtom<number>('bibleVerseTextSize', 16)
export const bibleVerseViewerAtom = createPersistentAtom<Record<string, ViewerSettings>>(
  'bibleVerseViewer',
  {
    keywordMatchedVerses: { backgroundColor: '#fff', textColor: '#000' },
    fullChaptersWithKeyword: { backgroundColor: '#fff', textColor: '#000' }
  }
)
export const bibleVerseSearchParamsAtom = createPersistentAtom<FindKeywordFromBibleParams>(
  'bibleVerseSearchParams',
  {
    version: PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.BIBLE][0],
    bookRange: [1, 66],
    keywords: [],
    matchType: 'all'
  }
)
export const bibleVerseSearchResultAtom = atom<PagedResult<Bible>>({
  data: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0
})

export const lexicalCodeAtom = createPersistentAtom<string>('lexicalCode', '')
export const lexicalCodeTextSizeAtom = createPersistentAtom<number>('lexicalCodeTextSize', 16)
export const lexiconViewerAtom = createPersistentAtom<Record<string, ViewerSettings>>(
  'lexiconViewer',
  {
    keywordMatchedVerses: { backgroundColor: '#fff', textColor: '#000' },
    fullChaptersWithKeyword: { backgroundColor: '#fff', textColor: '#000' }
  }
)
export const lexicalCodeSearchParamsAtom = createPersistentAtom<FindLexicalCodeFromBibleParams>(
  'lexicalCodeSearchParams',
  {
    version: PANEL_CATEGORIES_AND_VERSIONS[PanelCategory.CODED_BIBLE][0],
    bookRange: [1, 66],
    codes: [],
    matchType: 'all'
  }
)
export const lexicalCodeSearchResultAtom = atom<PagedResult<Bible>>({
  data: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0
})

export const hymnAtom = createPersistentAtom<Hymn | null>('hymn', null)
export const hymnPageViewModeAtom = createPersistentAtom<HymnPageViewMode>(
  'hymnPageViewMode',
  'list'
)
export const scoreViewModeAtom = createPersistentAtom<ScoreViewMode>('scoreViewMode', 'imageMode')
export const showHymnIndexAtom = createPersistentAtom<boolean>('showHymnIndex', false)
export const hymnTextSizeAtom = createPersistentAtom<number>('hymnTextSize', 16)
export const hymnViewerAtom = createPersistentAtom<Record<string, ViewerSettings>>('hymnViewer', {
  hymnIndex: { backgroundColor: '#fff', textColor: '#000' },
  hymn: { backgroundColor: '#fff', textColor: '#000' }
})
export const hymnSearchParamsAtom = createPersistentAtom<FindKeywordFromHymnParams>(
  'hymnSearchParams',
  {
    searchTarget: 'lyrics',
    keywords: [],
    matchType: 'all'
  }
)
export const hymnSearchResultAtom = atom<PagedResult<Hymn>>({
  data: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0
})

// 플레이리스트 관련 atoms
export const hymnPlaylistAtom = createPersistentAtom<Hymn[]>('hymnPlaylist', [])
export const currentPlaylistIndexAtom = createPersistentAtom<number>('currentPlaylistIndex', 0)
export const isPlaylistModeAtom = createPersistentAtom<boolean>('isPlaylistMode', false)
export const playlistRepeatModeAtom = createPersistentAtom<boolean>('playlistRepeatMode', true)
export const playingAtom = createPersistentAtom<boolean>('playing', false)

export const themeAtom = createPersistentAtom<Theme | null>('theme', null)
export const themeTextSizeAtom = createPersistentAtom<number>('themeTextSize', 16)
export const themeViewerAtom = createPersistentAtom<Record<string, ViewerSettings>>('themeViewer', {
  themeIndex: { backgroundColor: '#fff', textColor: '#000' },
  theme: { backgroundColor: '#fff', textColor: '#000' }
})

// 플레이리스트 뷰어(좌측 영역)의 배경/글자 색
export const playlistViewerAtom = createPersistentAtom<Record<string, ViewerSettings>>(
  'playlistViewer',
  {
    playlist: { backgroundColor: '#fff', textColor: '#000' }
  }
)
