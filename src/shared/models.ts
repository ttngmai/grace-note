export type Bible = {
  id: number
  book: number
  chapter: number
  verse: number
  btext: string
}

export type Commentary = {
  id: number
  book: number
  chapter: number
  verse: number
  btext: string
}

export type Lexicon = {
  id: number
  code: string
  word: string
  definition: string
}

export type Hymn = {
  id: number
  hymn_number: string
  title: string
  lyrics: string
}

export type HymnNumberAndTitle = Pick<Hymn, 'hymn_number' | 'title'>

export type Theme = {
  id: number
  word_ko: string
  word_en: string
  name_type: string
  meaning: string
  mid_bracket: string
  content_rich: string
  content_strong: string
  content_strong2: string
}

export type ThemeIdAndWord = Pick<Theme, 'id' | 'word_ko'>
