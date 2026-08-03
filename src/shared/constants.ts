import { PanelCategory } from './types.js'

type BibleCountInfo = { book: number; chapter: number; lastVerse: number }
type BookInfo = { id: number; name: string; shortName: string }

export const MAX_PANELS = 24
export const PANEL_ROWS = 2
export const PANEL_COLUMNS = 12

export const PANEL_CATEGORIES_AND_VERSIONS: { [key in PanelCategory]: string[] } = {
  [PanelCategory.BIBLE]: [
    '개역개정',
    '개역한글',
    '공동번역',
    '바른성경',
    '새번역',
    '쉬운말',
    '쉬운성경',
    '우리말',
    '카톨릭',
    '킹흠정역',
    '표준킹',
    '한글킹',
    '현대어',
    '현대인',
    '중문화간체',
    'NIRV (G3)',
    'NLT (G6)',
    'KJV1769',
    'NIV1984',
    'NAS2020'
  ],
  [PanelCategory.COMMENTARY]: ['매튜헨리', '성경관주'],
  [PanelCategory.CODED_BIBLE]: ['개역개정S', '개역한글S'],
  [PanelCategory.LEXICON]: ['원어설명', '원어분해'],
  [PanelCategory.NONE]: []
}

export const BOOK_INFO: Array<BookInfo> = [
  {
    id: 1,
    name: '창세기',
    shortName: '창'
  },
  {
    id: 2,
    name: '출애굽기',
    shortName: '출'
  },
  {
    id: 3,
    name: '레위기',
    shortName: '레'
  },
  {
    id: 4,
    name: '민수기',
    shortName: '민'
  },
  {
    id: 5,
    name: '신명기',
    shortName: '신'
  },
  {
    id: 6,
    name: '여호수아',
    shortName: '수'
  },
  {
    id: 7,
    name: '사사기',
    shortName: '삿'
  },
  {
    id: 8,
    name: '룻기',
    shortName: '룻'
  },
  {
    id: 9,
    name: '사무엘상',
    shortName: '삼상'
  },
  {
    id: 10,
    name: '사무엘하',
    shortName: '삼하'
  },
  {
    id: 11,
    name: '열왕기상',
    shortName: '왕상'
  },
  {
    id: 12,
    name: '열왕기하',
    shortName: '왕하'
  },
  {
    id: 13,
    name: '역대상',
    shortName: '대상'
  },
  {
    id: 14,
    name: '역대하',
    shortName: '대하'
  },
  {
    id: 15,
    name: '에스라',
    shortName: '스'
  },
  {
    id: 16,
    name: '느헤미야',
    shortName: '느'
  },
  {
    id: 17,
    name: '에스더',
    shortName: '에'
  },
  {
    id: 18,
    name: '욥기',
    shortName: '욥'
  },
  {
    id: 19,
    name: '시편',
    shortName: '시'
  },
  {
    id: 20,
    name: '잠언',
    shortName: '잠'
  },
  {
    id: 21,
    name: '전도서',
    shortName: '전'
  },
  {
    id: 22,
    name: '아가',
    shortName: '아'
  },
  {
    id: 23,
    name: '이사야',
    shortName: '사'
  },
  {
    id: 24,
    name: '예레미야',
    shortName: '렘'
  },
  {
    id: 25,
    name: '예레미야애가',
    shortName: '애'
  },
  {
    id: 26,
    name: '에스겔',
    shortName: '겔'
  },
  {
    id: 27,
    name: '다니엘',
    shortName: '단'
  },
  {
    id: 28,
    name: '호세아',
    shortName: '호'
  },
  {
    id: 29,
    name: '요엘',
    shortName: '욜'
  },
  {
    id: 30,
    name: '아모스',
    shortName: '암'
  },
  {
    id: 31,
    name: '오바댜',
    shortName: '옵'
  },
  {
    id: 32,
    name: '요나',
    shortName: '욘'
  },
  {
    id: 33,
    name: '미가',
    shortName: '미'
  },
  {
    id: 34,
    name: '나훔',
    shortName: '나'
  },
  {
    id: 35,
    name: '하박국',
    shortName: '합'
  },
  {
    id: 36,
    name: '스바냐',
    shortName: '습'
  },
  {
    id: 37,
    name: '학개',
    shortName: '학'
  },
  {
    id: 38,
    name: '스가랴',
    shortName: '슥'
  },
  {
    id: 39,
    name: '말라기',
    shortName: '말'
  },
  {
    id: 40,
    name: '마태복음',
    shortName: '마'
  },
  {
    id: 41,
    name: '마가복음',
    shortName: '막'
  },
  {
    id: 42,
    name: '누가복음',
    shortName: '눅'
  },
  {
    id: 43,
    name: '요한복음',
    shortName: '요'
  },
  {
    id: 44,
    name: '사도행전',
    shortName: '행'
  },
  {
    id: 45,
    name: '로마서',
    shortName: '롬'
  },
  {
    id: 46,
    name: '고린도전서',
    shortName: '고전'
  },
  {
    id: 47,
    name: '고린도후서',
    shortName: '고후'
  },
  {
    id: 48,
    name: '갈라디아서',
    shortName: '갈'
  },
  {
    id: 49,
    name: '에베소서',
    shortName: '엡'
  },
  {
    id: 50,
    name: '빌립보서',
    shortName: '빌'
  },
  {
    id: 51,
    name: '골로새서',
    shortName: '골'
  },
  {
    id: 52,
    name: '데살로니가전서',
    shortName: '살전'
  },
  {
    id: 53,
    name: '데살로니가후서',
    shortName: '살후'
  },
  {
    id: 54,
    name: '디모데전서',
    shortName: '딤전'
  },
  {
    id: 55,
    name: '디모데후서',
    shortName: '딤후'
  },
  {
    id: 56,
    name: '디도서',
    shortName: '딛'
  },
  {
    id: 57,
    name: '빌레몬서',
    shortName: '몬'
  },
  {
    id: 58,
    name: '히브리서',
    shortName: '히'
  },
  {
    id: 59,
    name: '야고보서',
    shortName: '약'
  },
  {
    id: 60,
    name: '베드로전서',
    shortName: '벧전'
  },
  {
    id: 61,
    name: '베드로후서',
    shortName: '벧후'
  },
  {
    id: 62,
    name: '요한일서',
    shortName: '요일'
  },
  {
    id: 63,
    name: '요한이서',
    shortName: '요이'
  },
  {
    id: 64,
    name: '요한삼서',
    shortName: '요삼'
  },
  {
    id: 65,
    name: '유다서',
    shortName: '유'
  },
  {
    id: 66,
    name: '요한계시록',
    shortName: '계'
  }
]

export const BIBLE_COUNT_INFO: Array<BibleCountInfo> = [
  {
    book: 1,
    chapter: 1,
    lastVerse: 31
  },
  {
    book: 1,
    chapter: 2,
    lastVerse: 25
  },
  {
    book: 1,
    chapter: 3,
    lastVerse: 24
  },
  {
    book: 1,
    chapter: 4,
    lastVerse: 26
  },
  {
    book: 1,
    chapter: 5,
    lastVerse: 32
  },
  {
    book: 1,
    chapter: 6,
    lastVerse: 22
  },
  {
    book: 1,
    chapter: 7,
    lastVerse: 24
  },
  {
    book: 1,
    chapter: 8,
    lastVerse: 22
  },
  {
    book: 1,
    chapter: 9,
    lastVerse: 29
  },
  {
    book: 1,
    chapter: 10,
    lastVerse: 32
  },
  {
    book: 1,
    chapter: 11,
    lastVerse: 32
  },
  {
    book: 1,
    chapter: 12,
    lastVerse: 20
  },
  {
    book: 1,
    chapter: 13,
    lastVerse: 18
  },
  {
    book: 1,
    chapter: 14,
    lastVerse: 24
  },
  {
    book: 1,
    chapter: 15,
    lastVerse: 21
  },
  {
    book: 1,
    chapter: 16,
    lastVerse: 16
  },
  {
    book: 1,
    chapter: 17,
    lastVerse: 27
  },
  {
    book: 1,
    chapter: 18,
    lastVerse: 33
  },
  {
    book: 1,
    chapter: 19,
    lastVerse: 38
  },
  {
    book: 1,
    chapter: 20,
    lastVerse: 18
  },
  {
    book: 1,
    chapter: 21,
    lastVerse: 34
  },
  {
    book: 1,
    chapter: 22,
    lastVerse: 24
  },
  {
    book: 1,
    chapter: 23,
    lastVerse: 20
  },
  {
    book: 1,
    chapter: 24,
    lastVerse: 67
  },
  {
    book: 1,
    chapter: 25,
    lastVerse: 34
  },
  {
    book: 1,
    chapter: 26,
    lastVerse: 35
  },
  {
    book: 1,
    chapter: 27,
    lastVerse: 46
  },
  {
    book: 1,
    chapter: 28,
    lastVerse: 22
  },
  {
    book: 1,
    chapter: 29,
    lastVerse: 35
  },
  {
    book: 1,
    chapter: 30,
    lastVerse: 43
  },
  {
    book: 1,
    chapter: 31,
    lastVerse: 55
  },
  {
    book: 1,
    chapter: 32,
    lastVerse: 32
  },
  {
    book: 1,
    chapter: 33,
    lastVerse: 20
  },
  {
    book: 1,
    chapter: 34,
    lastVerse: 31
  },
  {
    book: 1,
    chapter: 35,
    lastVerse: 29
  },
  {
    book: 1,
    chapter: 36,
    lastVerse: 43
  },
  {
    book: 1,
    chapter: 37,
    lastVerse: 36
  },
  {
    book: 1,
    chapter: 38,
    lastVerse: 30
  },
  {
    book: 1,
    chapter: 39,
    lastVerse: 23
  },
  {
    book: 1,
    chapter: 40,
    lastVerse: 23
  },
  {
    book: 1,
    chapter: 41,
    lastVerse: 57
  },
  {
    book: 1,
    chapter: 42,
    lastVerse: 38
  },
  {
    book: 1,
    chapter: 43,
    lastVerse: 34
  },
  {
    book: 1,
    chapter: 44,
    lastVerse: 34
  },
  {
    book: 1,
    chapter: 45,
    lastVerse: 28
  },
  {
    book: 1,
    chapter: 46,
    lastVerse: 34
  },
  {
    book: 1,
    chapter: 47,
    lastVerse: 31
  },
  {
    book: 1,
    chapter: 48,
    lastVerse: 22
  },
  {
    book: 1,
    chapter: 49,
    lastVerse: 33
  },
  {
    book: 1,
    chapter: 50,
    lastVerse: 26
  },
  {
    book: 2,
    chapter: 1,
    lastVerse: 22
  },
  {
    book: 2,
    chapter: 2,
    lastVerse: 25
  },
  {
    book: 2,
    chapter: 3,
    lastVerse: 22
  },
  {
    book: 2,
    chapter: 4,
    lastVerse: 31
  },
  {
    book: 2,
    chapter: 5,
    lastVerse: 23
  },
  {
    book: 2,
    chapter: 6,
    lastVerse: 30
  },
  {
    book: 2,
    chapter: 7,
    lastVerse: 25
  },
  {
    book: 2,
    chapter: 8,
    lastVerse: 32
  },
  {
    book: 2,
    chapter: 9,
    lastVerse: 35
  },
  {
    book: 2,
    chapter: 10,
    lastVerse: 29
  },
  {
    book: 2,
    chapter: 11,
    lastVerse: 10
  },
  {
    book: 2,
    chapter: 12,
    lastVerse: 51
  },
  {
    book: 2,
    chapter: 13,
    lastVerse: 22
  },
  {
    book: 2,
    chapter: 14,
    lastVerse: 31
  },
  {
    book: 2,
    chapter: 15,
    lastVerse: 27
  },
  {
    book: 2,
    chapter: 16,
    lastVerse: 36
  },
  {
    book: 2,
    chapter: 17,
    lastVerse: 16
  },
  {
    book: 2,
    chapter: 18,
    lastVerse: 27
  },
  {
    book: 2,
    chapter: 19,
    lastVerse: 25
  },
  {
    book: 2,
    chapter: 20,
    lastVerse: 26
  },
  {
    book: 2,
    chapter: 21,
    lastVerse: 36
  },
  {
    book: 2,
    chapter: 22,
    lastVerse: 31
  },
  {
    book: 2,
    chapter: 23,
    lastVerse: 33
  },
  {
    book: 2,
    chapter: 24,
    lastVerse: 18
  },
  {
    book: 2,
    chapter: 25,
    lastVerse: 40
  },
  {
    book: 2,
    chapter: 26,
    lastVerse: 37
  },
  {
    book: 2,
    chapter: 27,
    lastVerse: 21
  },
  {
    book: 2,
    chapter: 28,
    lastVerse: 43
  },
  {
    book: 2,
    chapter: 29,
    lastVerse: 46
  },
  {
    book: 2,
    chapter: 30,
    lastVerse: 38
  },
  {
    book: 2,
    chapter: 31,
    lastVerse: 18
  },
  {
    book: 2,
    chapter: 32,
    lastVerse: 35
  },
  {
    book: 2,
    chapter: 33,
    lastVerse: 23
  },
  {
    book: 2,
    chapter: 34,
    lastVerse: 35
  },
  {
    book: 2,
    chapter: 35,
    lastVerse: 35
  },
  {
    book: 2,
    chapter: 36,
    lastVerse: 38
  },
  {
    book: 2,
    chapter: 37,
    lastVerse: 29
  },
  {
    book: 2,
    chapter: 38,
    lastVerse: 31
  },
  {
    book: 2,
    chapter: 39,
    lastVerse: 43
  },
  {
    book: 2,
    chapter: 40,
    lastVerse: 38
  },
  {
    book: 3,
    chapter: 1,
    lastVerse: 17
  },
  {
    book: 3,
    chapter: 2,
    lastVerse: 16
  },
  {
    book: 3,
    chapter: 3,
    lastVerse: 17
  },
  {
    book: 3,
    chapter: 4,
    lastVerse: 35
  },
  {
    book: 3,
    chapter: 5,
    lastVerse: 19
  },
  {
    book: 3,
    chapter: 6,
    lastVerse: 30
  },
  {
    book: 3,
    chapter: 7,
    lastVerse: 38
  },
  {
    book: 3,
    chapter: 8,
    lastVerse: 36
  },
  {
    book: 3,
    chapter: 9,
    lastVerse: 24
  },
  {
    book: 3,
    chapter: 10,
    lastVerse: 20
  },
  {
    book: 3,
    chapter: 11,
    lastVerse: 47
  },
  {
    book: 3,
    chapter: 12,
    lastVerse: 8
  },
  {
    book: 3,
    chapter: 13,
    lastVerse: 59
  },
  {
    book: 3,
    chapter: 14,
    lastVerse: 57
  },
  {
    book: 3,
    chapter: 15,
    lastVerse: 33
  },
  {
    book: 3,
    chapter: 16,
    lastVerse: 34
  },
  {
    book: 3,
    chapter: 17,
    lastVerse: 16
  },
  {
    book: 3,
    chapter: 18,
    lastVerse: 30
  },
  {
    book: 3,
    chapter: 19,
    lastVerse: 37
  },
  {
    book: 3,
    chapter: 20,
    lastVerse: 27
  },
  {
    book: 3,
    chapter: 21,
    lastVerse: 24
  },
  {
    book: 3,
    chapter: 22,
    lastVerse: 33
  },
  {
    book: 3,
    chapter: 23,
    lastVerse: 44
  },
  {
    book: 3,
    chapter: 24,
    lastVerse: 23
  },
  {
    book: 3,
    chapter: 25,
    lastVerse: 55
  },
  {
    book: 3,
    chapter: 26,
    lastVerse: 46
  },
  {
    book: 3,
    chapter: 27,
    lastVerse: 34
  },
  {
    book: 4,
    chapter: 1,
    lastVerse: 54
  },
  {
    book: 4,
    chapter: 2,
    lastVerse: 34
  },
  {
    book: 4,
    chapter: 3,
    lastVerse: 51
  },
  {
    book: 4,
    chapter: 4,
    lastVerse: 49
  },
  {
    book: 4,
    chapter: 5,
    lastVerse: 31
  },
  {
    book: 4,
    chapter: 6,
    lastVerse: 27
  },
  {
    book: 4,
    chapter: 7,
    lastVerse: 89
  },
  {
    book: 4,
    chapter: 8,
    lastVerse: 26
  },
  {
    book: 4,
    chapter: 9,
    lastVerse: 23
  },
  {
    book: 4,
    chapter: 10,
    lastVerse: 36
  },
  {
    book: 4,
    chapter: 11,
    lastVerse: 35
  },
  {
    book: 4,
    chapter: 12,
    lastVerse: 16
  },
  {
    book: 4,
    chapter: 13,
    lastVerse: 33
  },
  {
    book: 4,
    chapter: 14,
    lastVerse: 45
  },
  {
    book: 4,
    chapter: 15,
    lastVerse: 41
  },
  {
    book: 4,
    chapter: 16,
    lastVerse: 50
  },
  {
    book: 4,
    chapter: 17,
    lastVerse: 13
  },
  {
    book: 4,
    chapter: 18,
    lastVerse: 32
  },
  {
    book: 4,
    chapter: 19,
    lastVerse: 22
  },
  {
    book: 4,
    chapter: 20,
    lastVerse: 29
  },
  {
    book: 4,
    chapter: 21,
    lastVerse: 35
  },
  {
    book: 4,
    chapter: 22,
    lastVerse: 41
  },
  {
    book: 4,
    chapter: 23,
    lastVerse: 30
  },
  {
    book: 4,
    chapter: 24,
    lastVerse: 25
  },
  {
    book: 4,
    chapter: 25,
    lastVerse: 18
  },
  {
    book: 4,
    chapter: 26,
    lastVerse: 65
  },
  {
    book: 4,
    chapter: 27,
    lastVerse: 23
  },
  {
    book: 4,
    chapter: 28,
    lastVerse: 31
  },
  {
    book: 4,
    chapter: 29,
    lastVerse: 40
  },
  {
    book: 4,
    chapter: 30,
    lastVerse: 16
  },
  {
    book: 4,
    chapter: 31,
    lastVerse: 54
  },
  {
    book: 4,
    chapter: 32,
    lastVerse: 42
  },
  {
    book: 4,
    chapter: 33,
    lastVerse: 56
  },
  {
    book: 4,
    chapter: 34,
    lastVerse: 29
  },
  {
    book: 4,
    chapter: 35,
    lastVerse: 34
  },
  {
    book: 4,
    chapter: 36,
    lastVerse: 13
  },
  {
    book: 5,
    chapter: 1,
    lastVerse: 46
  },
  {
    book: 5,
    chapter: 2,
    lastVerse: 37
  },
  {
    book: 5,
    chapter: 3,
    lastVerse: 29
  },
  {
    book: 5,
    chapter: 4,
    lastVerse: 49
  },
  {
    book: 5,
    chapter: 5,
    lastVerse: 33
  },
  {
    book: 5,
    chapter: 6,
    lastVerse: 25
  },
  {
    book: 5,
    chapter: 7,
    lastVerse: 26
  },
  {
    book: 5,
    chapter: 8,
    lastVerse: 20
  },
  {
    book: 5,
    chapter: 9,
    lastVerse: 29
  },
  {
    book: 5,
    chapter: 10,
    lastVerse: 22
  },
  {
    book: 5,
    chapter: 11,
    lastVerse: 32
  },
  {
    book: 5,
    chapter: 12,
    lastVerse: 32
  },
  {
    book: 5,
    chapter: 13,
    lastVerse: 18
  },
  {
    book: 5,
    chapter: 14,
    lastVerse: 29
  },
  {
    book: 5,
    chapter: 15,
    lastVerse: 23
  },
  {
    book: 5,
    chapter: 16,
    lastVerse: 22
  },
  {
    book: 5,
    chapter: 17,
    lastVerse: 20
  },
  {
    book: 5,
    chapter: 18,
    lastVerse: 22
  },
  {
    book: 5,
    chapter: 19,
    lastVerse: 21
  },
  {
    book: 5,
    chapter: 20,
    lastVerse: 20
  },
  {
    book: 5,
    chapter: 21,
    lastVerse: 23
  },
  {
    book: 5,
    chapter: 22,
    lastVerse: 30
  },
  {
    book: 5,
    chapter: 23,
    lastVerse: 25
  },
  {
    book: 5,
    chapter: 24,
    lastVerse: 22
  },
  {
    book: 5,
    chapter: 25,
    lastVerse: 19
  },
  {
    book: 5,
    chapter: 26,
    lastVerse: 19
  },
  {
    book: 5,
    chapter: 27,
    lastVerse: 26
  },
  {
    book: 5,
    chapter: 28,
    lastVerse: 68
  },
  {
    book: 5,
    chapter: 29,
    lastVerse: 29
  },
  {
    book: 5,
    chapter: 30,
    lastVerse: 20
  },
  {
    book: 5,
    chapter: 31,
    lastVerse: 30
  },
  {
    book: 5,
    chapter: 32,
    lastVerse: 52
  },
  {
    book: 5,
    chapter: 33,
    lastVerse: 29
  },
  {
    book: 5,
    chapter: 34,
    lastVerse: 12
  },
  {
    book: 6,
    chapter: 1,
    lastVerse: 18
  },
  {
    book: 6,
    chapter: 2,
    lastVerse: 24
  },
  {
    book: 6,
    chapter: 3,
    lastVerse: 17
  },
  {
    book: 6,
    chapter: 4,
    lastVerse: 24
  },
  {
    book: 6,
    chapter: 5,
    lastVerse: 15
  },
  {
    book: 6,
    chapter: 6,
    lastVerse: 27
  },
  {
    book: 6,
    chapter: 7,
    lastVerse: 26
  },
  {
    book: 6,
    chapter: 8,
    lastVerse: 35
  },
  {
    book: 6,
    chapter: 9,
    lastVerse: 27
  },
  {
    book: 6,
    chapter: 10,
    lastVerse: 43
  },
  {
    book: 6,
    chapter: 11,
    lastVerse: 23
  },
  {
    book: 6,
    chapter: 12,
    lastVerse: 24
  },
  {
    book: 6,
    chapter: 13,
    lastVerse: 33
  },
  {
    book: 6,
    chapter: 14,
    lastVerse: 15
  },
  {
    book: 6,
    chapter: 15,
    lastVerse: 63
  },
  {
    book: 6,
    chapter: 16,
    lastVerse: 10
  },
  {
    book: 6,
    chapter: 17,
    lastVerse: 18
  },
  {
    book: 6,
    chapter: 18,
    lastVerse: 28
  },
  {
    book: 6,
    chapter: 19,
    lastVerse: 51
  },
  {
    book: 6,
    chapter: 20,
    lastVerse: 9
  },
  {
    book: 6,
    chapter: 21,
    lastVerse: 45
  },
  {
    book: 6,
    chapter: 22,
    lastVerse: 34
  },
  {
    book: 6,
    chapter: 23,
    lastVerse: 16
  },
  {
    book: 6,
    chapter: 24,
    lastVerse: 33
  },
  {
    book: 7,
    chapter: 1,
    lastVerse: 36
  },
  {
    book: 7,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 7,
    chapter: 3,
    lastVerse: 31
  },
  {
    book: 7,
    chapter: 4,
    lastVerse: 24
  },
  {
    book: 7,
    chapter: 5,
    lastVerse: 31
  },
  {
    book: 7,
    chapter: 6,
    lastVerse: 40
  },
  {
    book: 7,
    chapter: 7,
    lastVerse: 25
  },
  {
    book: 7,
    chapter: 8,
    lastVerse: 35
  },
  {
    book: 7,
    chapter: 9,
    lastVerse: 57
  },
  {
    book: 7,
    chapter: 10,
    lastVerse: 18
  },
  {
    book: 7,
    chapter: 11,
    lastVerse: 40
  },
  {
    book: 7,
    chapter: 12,
    lastVerse: 15
  },
  {
    book: 7,
    chapter: 13,
    lastVerse: 25
  },
  {
    book: 7,
    chapter: 14,
    lastVerse: 20
  },
  {
    book: 7,
    chapter: 15,
    lastVerse: 20
  },
  {
    book: 7,
    chapter: 16,
    lastVerse: 31
  },
  {
    book: 7,
    chapter: 17,
    lastVerse: 13
  },
  {
    book: 7,
    chapter: 18,
    lastVerse: 31
  },
  {
    book: 7,
    chapter: 19,
    lastVerse: 30
  },
  {
    book: 7,
    chapter: 20,
    lastVerse: 48
  },
  {
    book: 7,
    chapter: 21,
    lastVerse: 25
  },
  {
    book: 8,
    chapter: 1,
    lastVerse: 22
  },
  {
    book: 8,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 8,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 8,
    chapter: 4,
    lastVerse: 22
  },
  {
    book: 9,
    chapter: 1,
    lastVerse: 28
  },
  {
    book: 9,
    chapter: 2,
    lastVerse: 36
  },
  {
    book: 9,
    chapter: 3,
    lastVerse: 21
  },
  {
    book: 9,
    chapter: 4,
    lastVerse: 22
  },
  {
    book: 9,
    chapter: 5,
    lastVerse: 12
  },
  {
    book: 9,
    chapter: 6,
    lastVerse: 21
  },
  {
    book: 9,
    chapter: 7,
    lastVerse: 17
  },
  {
    book: 9,
    chapter: 8,
    lastVerse: 22
  },
  {
    book: 9,
    chapter: 9,
    lastVerse: 27
  },
  {
    book: 9,
    chapter: 10,
    lastVerse: 27
  },
  {
    book: 9,
    chapter: 11,
    lastVerse: 15
  },
  {
    book: 9,
    chapter: 12,
    lastVerse: 25
  },
  {
    book: 9,
    chapter: 13,
    lastVerse: 23
  },
  {
    book: 9,
    chapter: 14,
    lastVerse: 52
  },
  {
    book: 9,
    chapter: 15,
    lastVerse: 35
  },
  {
    book: 9,
    chapter: 16,
    lastVerse: 23
  },
  {
    book: 9,
    chapter: 17,
    lastVerse: 58
  },
  {
    book: 9,
    chapter: 18,
    lastVerse: 30
  },
  {
    book: 9,
    chapter: 19,
    lastVerse: 24
  },
  {
    book: 9,
    chapter: 20,
    lastVerse: 42
  },
  {
    book: 9,
    chapter: 21,
    lastVerse: 15
  },
  {
    book: 9,
    chapter: 22,
    lastVerse: 23
  },
  {
    book: 9,
    chapter: 23,
    lastVerse: 29
  },
  {
    book: 9,
    chapter: 24,
    lastVerse: 22
  },
  {
    book: 9,
    chapter: 25,
    lastVerse: 44
  },
  {
    book: 9,
    chapter: 26,
    lastVerse: 25
  },
  {
    book: 9,
    chapter: 27,
    lastVerse: 12
  },
  {
    book: 9,
    chapter: 28,
    lastVerse: 25
  },
  {
    book: 9,
    chapter: 29,
    lastVerse: 11
  },
  {
    book: 9,
    chapter: 30,
    lastVerse: 31
  },
  {
    book: 9,
    chapter: 31,
    lastVerse: 13
  },
  {
    book: 10,
    chapter: 1,
    lastVerse: 27
  },
  {
    book: 10,
    chapter: 2,
    lastVerse: 32
  },
  {
    book: 10,
    chapter: 3,
    lastVerse: 39
  },
  {
    book: 10,
    chapter: 4,
    lastVerse: 12
  },
  {
    book: 10,
    chapter: 5,
    lastVerse: 25
  },
  {
    book: 10,
    chapter: 6,
    lastVerse: 23
  },
  {
    book: 10,
    chapter: 7,
    lastVerse: 29
  },
  {
    book: 10,
    chapter: 8,
    lastVerse: 18
  },
  {
    book: 10,
    chapter: 9,
    lastVerse: 13
  },
  {
    book: 10,
    chapter: 10,
    lastVerse: 19
  },
  {
    book: 10,
    chapter: 11,
    lastVerse: 27
  },
  {
    book: 10,
    chapter: 12,
    lastVerse: 31
  },
  {
    book: 10,
    chapter: 13,
    lastVerse: 39
  },
  {
    book: 10,
    chapter: 14,
    lastVerse: 33
  },
  {
    book: 10,
    chapter: 15,
    lastVerse: 37
  },
  {
    book: 10,
    chapter: 16,
    lastVerse: 23
  },
  {
    book: 10,
    chapter: 17,
    lastVerse: 29
  },
  {
    book: 10,
    chapter: 18,
    lastVerse: 33
  },
  {
    book: 10,
    chapter: 19,
    lastVerse: 43
  },
  {
    book: 10,
    chapter: 20,
    lastVerse: 26
  },
  {
    book: 10,
    chapter: 21,
    lastVerse: 22
  },
  {
    book: 10,
    chapter: 22,
    lastVerse: 51
  },
  {
    book: 10,
    chapter: 23,
    lastVerse: 39
  },
  {
    book: 10,
    chapter: 24,
    lastVerse: 25
  },
  {
    book: 11,
    chapter: 1,
    lastVerse: 53
  },
  {
    book: 11,
    chapter: 2,
    lastVerse: 46
  },
  {
    book: 11,
    chapter: 3,
    lastVerse: 28
  },
  {
    book: 11,
    chapter: 4,
    lastVerse: 34
  },
  {
    book: 11,
    chapter: 5,
    lastVerse: 18
  },
  {
    book: 11,
    chapter: 6,
    lastVerse: 38
  },
  {
    book: 11,
    chapter: 7,
    lastVerse: 51
  },
  {
    book: 11,
    chapter: 8,
    lastVerse: 66
  },
  {
    book: 11,
    chapter: 9,
    lastVerse: 28
  },
  {
    book: 11,
    chapter: 10,
    lastVerse: 29
  },
  {
    book: 11,
    chapter: 11,
    lastVerse: 43
  },
  {
    book: 11,
    chapter: 12,
    lastVerse: 33
  },
  {
    book: 11,
    chapter: 13,
    lastVerse: 34
  },
  {
    book: 11,
    chapter: 14,
    lastVerse: 31
  },
  {
    book: 11,
    chapter: 15,
    lastVerse: 34
  },
  {
    book: 11,
    chapter: 16,
    lastVerse: 34
  },
  {
    book: 11,
    chapter: 17,
    lastVerse: 24
  },
  {
    book: 11,
    chapter: 18,
    lastVerse: 46
  },
  {
    book: 11,
    chapter: 19,
    lastVerse: 21
  },
  {
    book: 11,
    chapter: 20,
    lastVerse: 43
  },
  {
    book: 11,
    chapter: 21,
    lastVerse: 29
  },
  {
    book: 11,
    chapter: 22,
    lastVerse: 53
  },
  {
    book: 12,
    chapter: 1,
    lastVerse: 18
  },
  {
    book: 12,
    chapter: 2,
    lastVerse: 25
  },
  {
    book: 12,
    chapter: 3,
    lastVerse: 27
  },
  {
    book: 12,
    chapter: 4,
    lastVerse: 44
  },
  {
    book: 12,
    chapter: 5,
    lastVerse: 27
  },
  {
    book: 12,
    chapter: 6,
    lastVerse: 33
  },
  {
    book: 12,
    chapter: 7,
    lastVerse: 20
  },
  {
    book: 12,
    chapter: 8,
    lastVerse: 29
  },
  {
    book: 12,
    chapter: 9,
    lastVerse: 37
  },
  {
    book: 12,
    chapter: 10,
    lastVerse: 36
  },
  {
    book: 12,
    chapter: 11,
    lastVerse: 21
  },
  {
    book: 12,
    chapter: 12,
    lastVerse: 21
  },
  {
    book: 12,
    chapter: 13,
    lastVerse: 25
  },
  {
    book: 12,
    chapter: 14,
    lastVerse: 29
  },
  {
    book: 12,
    chapter: 15,
    lastVerse: 38
  },
  {
    book: 12,
    chapter: 16,
    lastVerse: 20
  },
  {
    book: 12,
    chapter: 17,
    lastVerse: 41
  },
  {
    book: 12,
    chapter: 18,
    lastVerse: 37
  },
  {
    book: 12,
    chapter: 19,
    lastVerse: 37
  },
  {
    book: 12,
    chapter: 20,
    lastVerse: 21
  },
  {
    book: 12,
    chapter: 21,
    lastVerse: 26
  },
  {
    book: 12,
    chapter: 22,
    lastVerse: 20
  },
  {
    book: 12,
    chapter: 23,
    lastVerse: 37
  },
  {
    book: 12,
    chapter: 24,
    lastVerse: 20
  },
  {
    book: 12,
    chapter: 25,
    lastVerse: 30
  },
  {
    book: 13,
    chapter: 1,
    lastVerse: 54
  },
  {
    book: 13,
    chapter: 2,
    lastVerse: 55
  },
  {
    book: 13,
    chapter: 3,
    lastVerse: 24
  },
  {
    book: 13,
    chapter: 4,
    lastVerse: 43
  },
  {
    book: 13,
    chapter: 5,
    lastVerse: 26
  },
  {
    book: 13,
    chapter: 6,
    lastVerse: 81
  },
  {
    book: 13,
    chapter: 7,
    lastVerse: 40
  },
  {
    book: 13,
    chapter: 8,
    lastVerse: 40
  },
  {
    book: 13,
    chapter: 9,
    lastVerse: 44
  },
  {
    book: 13,
    chapter: 10,
    lastVerse: 14
  },
  {
    book: 13,
    chapter: 11,
    lastVerse: 47
  },
  {
    book: 13,
    chapter: 12,
    lastVerse: 40
  },
  {
    book: 13,
    chapter: 13,
    lastVerse: 14
  },
  {
    book: 13,
    chapter: 14,
    lastVerse: 17
  },
  {
    book: 13,
    chapter: 15,
    lastVerse: 29
  },
  {
    book: 13,
    chapter: 16,
    lastVerse: 43
  },
  {
    book: 13,
    chapter: 17,
    lastVerse: 27
  },
  {
    book: 13,
    chapter: 18,
    lastVerse: 17
  },
  {
    book: 13,
    chapter: 19,
    lastVerse: 19
  },
  {
    book: 13,
    chapter: 20,
    lastVerse: 8
  },
  {
    book: 13,
    chapter: 21,
    lastVerse: 30
  },
  {
    book: 13,
    chapter: 22,
    lastVerse: 19
  },
  {
    book: 13,
    chapter: 23,
    lastVerse: 32
  },
  {
    book: 13,
    chapter: 24,
    lastVerse: 31
  },
  {
    book: 13,
    chapter: 25,
    lastVerse: 31
  },
  {
    book: 13,
    chapter: 26,
    lastVerse: 32
  },
  {
    book: 13,
    chapter: 27,
    lastVerse: 34
  },
  {
    book: 13,
    chapter: 28,
    lastVerse: 21
  },
  {
    book: 13,
    chapter: 29,
    lastVerse: 30
  },
  {
    book: 14,
    chapter: 1,
    lastVerse: 17
  },
  {
    book: 14,
    chapter: 2,
    lastVerse: 18
  },
  {
    book: 14,
    chapter: 3,
    lastVerse: 17
  },
  {
    book: 14,
    chapter: 4,
    lastVerse: 22
  },
  {
    book: 14,
    chapter: 5,
    lastVerse: 14
  },
  {
    book: 14,
    chapter: 6,
    lastVerse: 42
  },
  {
    book: 14,
    chapter: 7,
    lastVerse: 22
  },
  {
    book: 14,
    chapter: 8,
    lastVerse: 18
  },
  {
    book: 14,
    chapter: 9,
    lastVerse: 31
  },
  {
    book: 14,
    chapter: 10,
    lastVerse: 19
  },
  {
    book: 14,
    chapter: 11,
    lastVerse: 23
  },
  {
    book: 14,
    chapter: 12,
    lastVerse: 16
  },
  {
    book: 14,
    chapter: 13,
    lastVerse: 22
  },
  {
    book: 14,
    chapter: 14,
    lastVerse: 15
  },
  {
    book: 14,
    chapter: 15,
    lastVerse: 19
  },
  {
    book: 14,
    chapter: 16,
    lastVerse: 14
  },
  {
    book: 14,
    chapter: 17,
    lastVerse: 19
  },
  {
    book: 14,
    chapter: 18,
    lastVerse: 34
  },
  {
    book: 14,
    chapter: 19,
    lastVerse: 11
  },
  {
    book: 14,
    chapter: 20,
    lastVerse: 37
  },
  {
    book: 14,
    chapter: 21,
    lastVerse: 20
  },
  {
    book: 14,
    chapter: 22,
    lastVerse: 12
  },
  {
    book: 14,
    chapter: 23,
    lastVerse: 21
  },
  {
    book: 14,
    chapter: 24,
    lastVerse: 27
  },
  {
    book: 14,
    chapter: 25,
    lastVerse: 28
  },
  {
    book: 14,
    chapter: 26,
    lastVerse: 23
  },
  {
    book: 14,
    chapter: 27,
    lastVerse: 9
  },
  {
    book: 14,
    chapter: 28,
    lastVerse: 27
  },
  {
    book: 14,
    chapter: 29,
    lastVerse: 36
  },
  {
    book: 14,
    chapter: 30,
    lastVerse: 27
  },
  {
    book: 14,
    chapter: 31,
    lastVerse: 21
  },
  {
    book: 14,
    chapter: 32,
    lastVerse: 33
  },
  {
    book: 14,
    chapter: 33,
    lastVerse: 25
  },
  {
    book: 14,
    chapter: 34,
    lastVerse: 33
  },
  {
    book: 14,
    chapter: 35,
    lastVerse: 27
  },
  {
    book: 14,
    chapter: 36,
    lastVerse: 23
  },
  {
    book: 15,
    chapter: 1,
    lastVerse: 11
  },
  {
    book: 15,
    chapter: 2,
    lastVerse: 70
  },
  {
    book: 15,
    chapter: 3,
    lastVerse: 13
  },
  {
    book: 15,
    chapter: 4,
    lastVerse: 24
  },
  {
    book: 15,
    chapter: 5,
    lastVerse: 17
  },
  {
    book: 15,
    chapter: 6,
    lastVerse: 22
  },
  {
    book: 15,
    chapter: 7,
    lastVerse: 28
  },
  {
    book: 15,
    chapter: 8,
    lastVerse: 36
  },
  {
    book: 15,
    chapter: 9,
    lastVerse: 15
  },
  {
    book: 15,
    chapter: 10,
    lastVerse: 44
  },
  {
    book: 16,
    chapter: 1,
    lastVerse: 11
  },
  {
    book: 16,
    chapter: 2,
    lastVerse: 20
  },
  {
    book: 16,
    chapter: 3,
    lastVerse: 32
  },
  {
    book: 16,
    chapter: 4,
    lastVerse: 23
  },
  {
    book: 16,
    chapter: 5,
    lastVerse: 19
  },
  {
    book: 16,
    chapter: 6,
    lastVerse: 19
  },
  {
    book: 16,
    chapter: 7,
    lastVerse: 73
  },
  {
    book: 16,
    chapter: 8,
    lastVerse: 18
  },
  {
    book: 16,
    chapter: 9,
    lastVerse: 38
  },
  {
    book: 16,
    chapter: 10,
    lastVerse: 39
  },
  {
    book: 16,
    chapter: 11,
    lastVerse: 36
  },
  {
    book: 16,
    chapter: 12,
    lastVerse: 47
  },
  {
    book: 16,
    chapter: 13,
    lastVerse: 31
  },
  {
    book: 17,
    chapter: 1,
    lastVerse: 22
  },
  {
    book: 17,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 17,
    chapter: 3,
    lastVerse: 15
  },
  {
    book: 17,
    chapter: 4,
    lastVerse: 17
  },
  {
    book: 17,
    chapter: 5,
    lastVerse: 14
  },
  {
    book: 17,
    chapter: 6,
    lastVerse: 14
  },
  {
    book: 17,
    chapter: 7,
    lastVerse: 10
  },
  {
    book: 17,
    chapter: 8,
    lastVerse: 17
  },
  {
    book: 17,
    chapter: 9,
    lastVerse: 32
  },
  {
    book: 17,
    chapter: 10,
    lastVerse: 3
  },
  {
    book: 18,
    chapter: 1,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 2,
    lastVerse: 13
  },
  {
    book: 18,
    chapter: 3,
    lastVerse: 26
  },
  {
    book: 18,
    chapter: 4,
    lastVerse: 21
  },
  {
    book: 18,
    chapter: 5,
    lastVerse: 27
  },
  {
    book: 18,
    chapter: 6,
    lastVerse: 30
  },
  {
    book: 18,
    chapter: 7,
    lastVerse: 21
  },
  {
    book: 18,
    chapter: 8,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 9,
    lastVerse: 35
  },
  {
    book: 18,
    chapter: 10,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 11,
    lastVerse: 20
  },
  {
    book: 18,
    chapter: 12,
    lastVerse: 25
  },
  {
    book: 18,
    chapter: 13,
    lastVerse: 28
  },
  {
    book: 18,
    chapter: 14,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 15,
    lastVerse: 35
  },
  {
    book: 18,
    chapter: 16,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 17,
    lastVerse: 16
  },
  {
    book: 18,
    chapter: 18,
    lastVerse: 21
  },
  {
    book: 18,
    chapter: 19,
    lastVerse: 29
  },
  {
    book: 18,
    chapter: 20,
    lastVerse: 29
  },
  {
    book: 18,
    chapter: 21,
    lastVerse: 34
  },
  {
    book: 18,
    chapter: 22,
    lastVerse: 30
  },
  {
    book: 18,
    chapter: 23,
    lastVerse: 17
  },
  {
    book: 18,
    chapter: 24,
    lastVerse: 25
  },
  {
    book: 18,
    chapter: 25,
    lastVerse: 6
  },
  {
    book: 18,
    chapter: 26,
    lastVerse: 14
  },
  {
    book: 18,
    chapter: 27,
    lastVerse: 23
  },
  {
    book: 18,
    chapter: 28,
    lastVerse: 28
  },
  {
    book: 18,
    chapter: 29,
    lastVerse: 25
  },
  {
    book: 18,
    chapter: 30,
    lastVerse: 31
  },
  {
    book: 18,
    chapter: 31,
    lastVerse: 40
  },
  {
    book: 18,
    chapter: 32,
    lastVerse: 22
  },
  {
    book: 18,
    chapter: 33,
    lastVerse: 33
  },
  {
    book: 18,
    chapter: 34,
    lastVerse: 37
  },
  {
    book: 18,
    chapter: 35,
    lastVerse: 16
  },
  {
    book: 18,
    chapter: 36,
    lastVerse: 33
  },
  {
    book: 18,
    chapter: 37,
    lastVerse: 24
  },
  {
    book: 18,
    chapter: 38,
    lastVerse: 41
  },
  {
    book: 18,
    chapter: 39,
    lastVerse: 30
  },
  {
    book: 18,
    chapter: 40,
    lastVerse: 24
  },
  {
    book: 18,
    chapter: 41,
    lastVerse: 34
  },
  {
    book: 18,
    chapter: 42,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 1,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 2,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 3,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 4,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 5,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 6,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 7,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 8,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 9,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 10,
    lastVerse: 18
  },
  {
    book: 19,
    chapter: 11,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 12,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 13,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 14,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 15,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 16,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 17,
    lastVerse: 15
  },
  {
    book: 19,
    chapter: 18,
    lastVerse: 50
  },
  {
    book: 19,
    chapter: 19,
    lastVerse: 14
  },
  {
    book: 19,
    chapter: 20,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 21,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 22,
    lastVerse: 31
  },
  {
    book: 19,
    chapter: 23,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 24,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 25,
    lastVerse: 22
  },
  {
    book: 19,
    chapter: 26,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 27,
    lastVerse: 14
  },
  {
    book: 19,
    chapter: 28,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 29,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 30,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 31,
    lastVerse: 24
  },
  {
    book: 19,
    chapter: 32,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 33,
    lastVerse: 22
  },
  {
    book: 19,
    chapter: 34,
    lastVerse: 22
  },
  {
    book: 19,
    chapter: 35,
    lastVerse: 28
  },
  {
    book: 19,
    chapter: 36,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 37,
    lastVerse: 40
  },
  {
    book: 19,
    chapter: 38,
    lastVerse: 22
  },
  {
    book: 19,
    chapter: 39,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 40,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 41,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 42,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 43,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 44,
    lastVerse: 26
  },
  {
    book: 19,
    chapter: 45,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 46,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 47,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 48,
    lastVerse: 14
  },
  {
    book: 19,
    chapter: 49,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 50,
    lastVerse: 23
  },
  {
    book: 19,
    chapter: 51,
    lastVerse: 19
  },
  {
    book: 19,
    chapter: 52,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 53,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 54,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 55,
    lastVerse: 23
  },
  {
    book: 19,
    chapter: 56,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 57,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 58,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 59,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 60,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 61,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 62,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 63,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 64,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 65,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 66,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 67,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 68,
    lastVerse: 35
  },
  {
    book: 19,
    chapter: 69,
    lastVerse: 36
  },
  {
    book: 19,
    chapter: 70,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 71,
    lastVerse: 24
  },
  {
    book: 19,
    chapter: 72,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 73,
    lastVerse: 28
  },
  {
    book: 19,
    chapter: 74,
    lastVerse: 23
  },
  {
    book: 19,
    chapter: 75,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 76,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 77,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 78,
    lastVerse: 72
  },
  {
    book: 19,
    chapter: 79,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 80,
    lastVerse: 19
  },
  {
    book: 19,
    chapter: 81,
    lastVerse: 16
  },
  {
    book: 19,
    chapter: 82,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 83,
    lastVerse: 18
  },
  {
    book: 19,
    chapter: 84,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 85,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 86,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 87,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 88,
    lastVerse: 18
  },
  {
    book: 19,
    chapter: 89,
    lastVerse: 52
  },
  {
    book: 19,
    chapter: 90,
    lastVerse: 17
  },
  {
    book: 19,
    chapter: 91,
    lastVerse: 16
  },
  {
    book: 19,
    chapter: 92,
    lastVerse: 15
  },
  {
    book: 19,
    chapter: 93,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 94,
    lastVerse: 23
  },
  {
    book: 19,
    chapter: 95,
    lastVerse: 11
  },
  {
    book: 19,
    chapter: 96,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 97,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 98,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 99,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 100,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 101,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 102,
    lastVerse: 28
  },
  {
    book: 19,
    chapter: 103,
    lastVerse: 22
  },
  {
    book: 19,
    chapter: 104,
    lastVerse: 35
  },
  {
    book: 19,
    chapter: 105,
    lastVerse: 45
  },
  {
    book: 19,
    chapter: 106,
    lastVerse: 48
  },
  {
    book: 19,
    chapter: 107,
    lastVerse: 43
  },
  {
    book: 19,
    chapter: 108,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 109,
    lastVerse: 31
  },
  {
    book: 19,
    chapter: 110,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 111,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 112,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 113,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 114,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 115,
    lastVerse: 18
  },
  {
    book: 19,
    chapter: 116,
    lastVerse: 19
  },
  {
    book: 19,
    chapter: 117,
    lastVerse: 2
  },
  {
    book: 19,
    chapter: 118,
    lastVerse: 29
  },
  {
    book: 19,
    chapter: 119,
    lastVerse: 176
  },
  {
    book: 19,
    chapter: 120,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 121,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 122,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 123,
    lastVerse: 4
  },
  {
    book: 19,
    chapter: 124,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 125,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 126,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 127,
    lastVerse: 5
  },
  {
    book: 19,
    chapter: 128,
    lastVerse: 6
  },
  {
    book: 19,
    chapter: 129,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 130,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 131,
    lastVerse: 3
  },
  {
    book: 19,
    chapter: 132,
    lastVerse: 18
  },
  {
    book: 19,
    chapter: 133,
    lastVerse: 3
  },
  {
    book: 19,
    chapter: 134,
    lastVerse: 3
  },
  {
    book: 19,
    chapter: 135,
    lastVerse: 21
  },
  {
    book: 19,
    chapter: 136,
    lastVerse: 26
  },
  {
    book: 19,
    chapter: 137,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 138,
    lastVerse: 8
  },
  {
    book: 19,
    chapter: 139,
    lastVerse: 24
  },
  {
    book: 19,
    chapter: 140,
    lastVerse: 13
  },
  {
    book: 19,
    chapter: 141,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 142,
    lastVerse: 7
  },
  {
    book: 19,
    chapter: 143,
    lastVerse: 12
  },
  {
    book: 19,
    chapter: 144,
    lastVerse: 15
  },
  {
    book: 19,
    chapter: 145,
    lastVerse: 21
  },
  {
    book: 19,
    chapter: 146,
    lastVerse: 10
  },
  {
    book: 19,
    chapter: 147,
    lastVerse: 20
  },
  {
    book: 19,
    chapter: 148,
    lastVerse: 14
  },
  {
    book: 19,
    chapter: 149,
    lastVerse: 9
  },
  {
    book: 19,
    chapter: 150,
    lastVerse: 6
  },
  {
    book: 20,
    chapter: 1,
    lastVerse: 33
  },
  {
    book: 20,
    chapter: 2,
    lastVerse: 22
  },
  {
    book: 20,
    chapter: 3,
    lastVerse: 35
  },
  {
    book: 20,
    chapter: 4,
    lastVerse: 27
  },
  {
    book: 20,
    chapter: 5,
    lastVerse: 23
  },
  {
    book: 20,
    chapter: 6,
    lastVerse: 35
  },
  {
    book: 20,
    chapter: 7,
    lastVerse: 27
  },
  {
    book: 20,
    chapter: 8,
    lastVerse: 36
  },
  {
    book: 20,
    chapter: 9,
    lastVerse: 18
  },
  {
    book: 20,
    chapter: 10,
    lastVerse: 32
  },
  {
    book: 20,
    chapter: 11,
    lastVerse: 31
  },
  {
    book: 20,
    chapter: 12,
    lastVerse: 28
  },
  {
    book: 20,
    chapter: 13,
    lastVerse: 25
  },
  {
    book: 20,
    chapter: 14,
    lastVerse: 35
  },
  {
    book: 20,
    chapter: 15,
    lastVerse: 33
  },
  {
    book: 20,
    chapter: 16,
    lastVerse: 33
  },
  {
    book: 20,
    chapter: 17,
    lastVerse: 28
  },
  {
    book: 20,
    chapter: 18,
    lastVerse: 24
  },
  {
    book: 20,
    chapter: 19,
    lastVerse: 29
  },
  {
    book: 20,
    chapter: 20,
    lastVerse: 30
  },
  {
    book: 20,
    chapter: 21,
    lastVerse: 31
  },
  {
    book: 20,
    chapter: 22,
    lastVerse: 29
  },
  {
    book: 20,
    chapter: 23,
    lastVerse: 35
  },
  {
    book: 20,
    chapter: 24,
    lastVerse: 34
  },
  {
    book: 20,
    chapter: 25,
    lastVerse: 28
  },
  {
    book: 20,
    chapter: 26,
    lastVerse: 28
  },
  {
    book: 20,
    chapter: 27,
    lastVerse: 27
  },
  {
    book: 20,
    chapter: 28,
    lastVerse: 28
  },
  {
    book: 20,
    chapter: 29,
    lastVerse: 27
  },
  {
    book: 20,
    chapter: 30,
    lastVerse: 33
  },
  {
    book: 20,
    chapter: 31,
    lastVerse: 31
  },
  {
    book: 21,
    chapter: 1,
    lastVerse: 18
  },
  {
    book: 21,
    chapter: 2,
    lastVerse: 26
  },
  {
    book: 21,
    chapter: 3,
    lastVerse: 22
  },
  {
    book: 21,
    chapter: 4,
    lastVerse: 16
  },
  {
    book: 21,
    chapter: 5,
    lastVerse: 20
  },
  {
    book: 21,
    chapter: 6,
    lastVerse: 12
  },
  {
    book: 21,
    chapter: 7,
    lastVerse: 29
  },
  {
    book: 21,
    chapter: 8,
    lastVerse: 17
  },
  {
    book: 21,
    chapter: 9,
    lastVerse: 18
  },
  {
    book: 21,
    chapter: 10,
    lastVerse: 20
  },
  {
    book: 21,
    chapter: 11,
    lastVerse: 10
  },
  {
    book: 21,
    chapter: 12,
    lastVerse: 14
  },
  {
    book: 22,
    chapter: 1,
    lastVerse: 17
  },
  {
    book: 22,
    chapter: 2,
    lastVerse: 17
  },
  {
    book: 22,
    chapter: 3,
    lastVerse: 11
  },
  {
    book: 22,
    chapter: 4,
    lastVerse: 16
  },
  {
    book: 22,
    chapter: 5,
    lastVerse: 16
  },
  {
    book: 22,
    chapter: 6,
    lastVerse: 13
  },
  {
    book: 22,
    chapter: 7,
    lastVerse: 13
  },
  {
    book: 22,
    chapter: 8,
    lastVerse: 14
  },
  {
    book: 23,
    chapter: 1,
    lastVerse: 31
  },
  {
    book: 23,
    chapter: 2,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 3,
    lastVerse: 26
  },
  {
    book: 23,
    chapter: 4,
    lastVerse: 6
  },
  {
    book: 23,
    chapter: 5,
    lastVerse: 30
  },
  {
    book: 23,
    chapter: 6,
    lastVerse: 13
  },
  {
    book: 23,
    chapter: 7,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 8,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 9,
    lastVerse: 21
  },
  {
    book: 23,
    chapter: 10,
    lastVerse: 34
  },
  {
    book: 23,
    chapter: 11,
    lastVerse: 16
  },
  {
    book: 23,
    chapter: 12,
    lastVerse: 6
  },
  {
    book: 23,
    chapter: 13,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 14,
    lastVerse: 32
  },
  {
    book: 23,
    chapter: 15,
    lastVerse: 9
  },
  {
    book: 23,
    chapter: 16,
    lastVerse: 14
  },
  {
    book: 23,
    chapter: 17,
    lastVerse: 14
  },
  {
    book: 23,
    chapter: 18,
    lastVerse: 7
  },
  {
    book: 23,
    chapter: 19,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 20,
    lastVerse: 6
  },
  {
    book: 23,
    chapter: 21,
    lastVerse: 17
  },
  {
    book: 23,
    chapter: 22,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 23,
    lastVerse: 18
  },
  {
    book: 23,
    chapter: 24,
    lastVerse: 23
  },
  {
    book: 23,
    chapter: 25,
    lastVerse: 12
  },
  {
    book: 23,
    chapter: 26,
    lastVerse: 21
  },
  {
    book: 23,
    chapter: 27,
    lastVerse: 13
  },
  {
    book: 23,
    chapter: 28,
    lastVerse: 29
  },
  {
    book: 23,
    chapter: 29,
    lastVerse: 24
  },
  {
    book: 23,
    chapter: 30,
    lastVerse: 33
  },
  {
    book: 23,
    chapter: 31,
    lastVerse: 9
  },
  {
    book: 23,
    chapter: 32,
    lastVerse: 20
  },
  {
    book: 23,
    chapter: 33,
    lastVerse: 24
  },
  {
    book: 23,
    chapter: 34,
    lastVerse: 17
  },
  {
    book: 23,
    chapter: 35,
    lastVerse: 10
  },
  {
    book: 23,
    chapter: 36,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 37,
    lastVerse: 38
  },
  {
    book: 23,
    chapter: 38,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 39,
    lastVerse: 8
  },
  {
    book: 23,
    chapter: 40,
    lastVerse: 31
  },
  {
    book: 23,
    chapter: 41,
    lastVerse: 29
  },
  {
    book: 23,
    chapter: 42,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 43,
    lastVerse: 28
  },
  {
    book: 23,
    chapter: 44,
    lastVerse: 28
  },
  {
    book: 23,
    chapter: 45,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 46,
    lastVerse: 13
  },
  {
    book: 23,
    chapter: 47,
    lastVerse: 15
  },
  {
    book: 23,
    chapter: 48,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 49,
    lastVerse: 26
  },
  {
    book: 23,
    chapter: 50,
    lastVerse: 11
  },
  {
    book: 23,
    chapter: 51,
    lastVerse: 23
  },
  {
    book: 23,
    chapter: 52,
    lastVerse: 15
  },
  {
    book: 23,
    chapter: 53,
    lastVerse: 12
  },
  {
    book: 23,
    chapter: 54,
    lastVerse: 17
  },
  {
    book: 23,
    chapter: 55,
    lastVerse: 13
  },
  {
    book: 23,
    chapter: 56,
    lastVerse: 12
  },
  {
    book: 23,
    chapter: 57,
    lastVerse: 21
  },
  {
    book: 23,
    chapter: 58,
    lastVerse: 14
  },
  {
    book: 23,
    chapter: 59,
    lastVerse: 21
  },
  {
    book: 23,
    chapter: 60,
    lastVerse: 22
  },
  {
    book: 23,
    chapter: 61,
    lastVerse: 11
  },
  {
    book: 23,
    chapter: 62,
    lastVerse: 12
  },
  {
    book: 23,
    chapter: 63,
    lastVerse: 19
  },
  {
    book: 23,
    chapter: 64,
    lastVerse: 12
  },
  {
    book: 23,
    chapter: 65,
    lastVerse: 25
  },
  {
    book: 23,
    chapter: 66,
    lastVerse: 24
  },
  {
    book: 24,
    chapter: 1,
    lastVerse: 19
  },
  {
    book: 24,
    chapter: 2,
    lastVerse: 37
  },
  {
    book: 24,
    chapter: 3,
    lastVerse: 25
  },
  {
    book: 24,
    chapter: 4,
    lastVerse: 31
  },
  {
    book: 24,
    chapter: 5,
    lastVerse: 31
  },
  {
    book: 24,
    chapter: 6,
    lastVerse: 30
  },
  {
    book: 24,
    chapter: 7,
    lastVerse: 34
  },
  {
    book: 24,
    chapter: 8,
    lastVerse: 22
  },
  {
    book: 24,
    chapter: 9,
    lastVerse: 26
  },
  {
    book: 24,
    chapter: 10,
    lastVerse: 25
  },
  {
    book: 24,
    chapter: 11,
    lastVerse: 23
  },
  {
    book: 24,
    chapter: 12,
    lastVerse: 17
  },
  {
    book: 24,
    chapter: 13,
    lastVerse: 27
  },
  {
    book: 24,
    chapter: 14,
    lastVerse: 22
  },
  {
    book: 24,
    chapter: 15,
    lastVerse: 21
  },
  {
    book: 24,
    chapter: 16,
    lastVerse: 21
  },
  {
    book: 24,
    chapter: 17,
    lastVerse: 27
  },
  {
    book: 24,
    chapter: 18,
    lastVerse: 23
  },
  {
    book: 24,
    chapter: 19,
    lastVerse: 15
  },
  {
    book: 24,
    chapter: 20,
    lastVerse: 18
  },
  {
    book: 24,
    chapter: 21,
    lastVerse: 14
  },
  {
    book: 24,
    chapter: 22,
    lastVerse: 30
  },
  {
    book: 24,
    chapter: 23,
    lastVerse: 40
  },
  {
    book: 24,
    chapter: 24,
    lastVerse: 10
  },
  {
    book: 24,
    chapter: 25,
    lastVerse: 38
  },
  {
    book: 24,
    chapter: 26,
    lastVerse: 24
  },
  {
    book: 24,
    chapter: 27,
    lastVerse: 22
  },
  {
    book: 24,
    chapter: 28,
    lastVerse: 17
  },
  {
    book: 24,
    chapter: 29,
    lastVerse: 32
  },
  {
    book: 24,
    chapter: 30,
    lastVerse: 24
  },
  {
    book: 24,
    chapter: 31,
    lastVerse: 40
  },
  {
    book: 24,
    chapter: 32,
    lastVerse: 44
  },
  {
    book: 24,
    chapter: 33,
    lastVerse: 26
  },
  {
    book: 24,
    chapter: 34,
    lastVerse: 22
  },
  {
    book: 24,
    chapter: 35,
    lastVerse: 19
  },
  {
    book: 24,
    chapter: 36,
    lastVerse: 32
  },
  {
    book: 24,
    chapter: 37,
    lastVerse: 21
  },
  {
    book: 24,
    chapter: 38,
    lastVerse: 28
  },
  {
    book: 24,
    chapter: 39,
    lastVerse: 18
  },
  {
    book: 24,
    chapter: 40,
    lastVerse: 16
  },
  {
    book: 24,
    chapter: 41,
    lastVerse: 18
  },
  {
    book: 24,
    chapter: 42,
    lastVerse: 22
  },
  {
    book: 24,
    chapter: 43,
    lastVerse: 13
  },
  {
    book: 24,
    chapter: 44,
    lastVerse: 30
  },
  {
    book: 24,
    chapter: 45,
    lastVerse: 5
  },
  {
    book: 24,
    chapter: 46,
    lastVerse: 28
  },
  {
    book: 24,
    chapter: 47,
    lastVerse: 7
  },
  {
    book: 24,
    chapter: 48,
    lastVerse: 47
  },
  {
    book: 24,
    chapter: 49,
    lastVerse: 39
  },
  {
    book: 24,
    chapter: 50,
    lastVerse: 46
  },
  {
    book: 24,
    chapter: 51,
    lastVerse: 64
  },
  {
    book: 24,
    chapter: 52,
    lastVerse: 34
  },
  {
    book: 25,
    chapter: 1,
    lastVerse: 22
  },
  {
    book: 25,
    chapter: 2,
    lastVerse: 22
  },
  {
    book: 25,
    chapter: 3,
    lastVerse: 66
  },
  {
    book: 25,
    chapter: 4,
    lastVerse: 22
  },
  {
    book: 25,
    chapter: 5,
    lastVerse: 22
  },
  {
    book: 26,
    chapter: 1,
    lastVerse: 28
  },
  {
    book: 26,
    chapter: 2,
    lastVerse: 10
  },
  {
    book: 26,
    chapter: 3,
    lastVerse: 27
  },
  {
    book: 26,
    chapter: 4,
    lastVerse: 17
  },
  {
    book: 26,
    chapter: 5,
    lastVerse: 17
  },
  {
    book: 26,
    chapter: 6,
    lastVerse: 14
  },
  {
    book: 26,
    chapter: 7,
    lastVerse: 27
  },
  {
    book: 26,
    chapter: 8,
    lastVerse: 18
  },
  {
    book: 26,
    chapter: 9,
    lastVerse: 11
  },
  {
    book: 26,
    chapter: 10,
    lastVerse: 22
  },
  {
    book: 26,
    chapter: 11,
    lastVerse: 25
  },
  {
    book: 26,
    chapter: 12,
    lastVerse: 28
  },
  {
    book: 26,
    chapter: 13,
    lastVerse: 23
  },
  {
    book: 26,
    chapter: 14,
    lastVerse: 23
  },
  {
    book: 26,
    chapter: 15,
    lastVerse: 8
  },
  {
    book: 26,
    chapter: 16,
    lastVerse: 63
  },
  {
    book: 26,
    chapter: 17,
    lastVerse: 24
  },
  {
    book: 26,
    chapter: 18,
    lastVerse: 32
  },
  {
    book: 26,
    chapter: 19,
    lastVerse: 14
  },
  {
    book: 26,
    chapter: 20,
    lastVerse: 49
  },
  {
    book: 26,
    chapter: 21,
    lastVerse: 32
  },
  {
    book: 26,
    chapter: 22,
    lastVerse: 31
  },
  {
    book: 26,
    chapter: 23,
    lastVerse: 49
  },
  {
    book: 26,
    chapter: 24,
    lastVerse: 27
  },
  {
    book: 26,
    chapter: 25,
    lastVerse: 17
  },
  {
    book: 26,
    chapter: 26,
    lastVerse: 21
  },
  {
    book: 26,
    chapter: 27,
    lastVerse: 36
  },
  {
    book: 26,
    chapter: 28,
    lastVerse: 26
  },
  {
    book: 26,
    chapter: 29,
    lastVerse: 21
  },
  {
    book: 26,
    chapter: 30,
    lastVerse: 26
  },
  {
    book: 26,
    chapter: 31,
    lastVerse: 18
  },
  {
    book: 26,
    chapter: 32,
    lastVerse: 32
  },
  {
    book: 26,
    chapter: 33,
    lastVerse: 33
  },
  {
    book: 26,
    chapter: 34,
    lastVerse: 31
  },
  {
    book: 26,
    chapter: 35,
    lastVerse: 15
  },
  {
    book: 26,
    chapter: 36,
    lastVerse: 38
  },
  {
    book: 26,
    chapter: 37,
    lastVerse: 28
  },
  {
    book: 26,
    chapter: 38,
    lastVerse: 23
  },
  {
    book: 26,
    chapter: 39,
    lastVerse: 29
  },
  {
    book: 26,
    chapter: 40,
    lastVerse: 49
  },
  {
    book: 26,
    chapter: 41,
    lastVerse: 26
  },
  {
    book: 26,
    chapter: 42,
    lastVerse: 20
  },
  {
    book: 26,
    chapter: 43,
    lastVerse: 27
  },
  {
    book: 26,
    chapter: 44,
    lastVerse: 31
  },
  {
    book: 26,
    chapter: 45,
    lastVerse: 25
  },
  {
    book: 26,
    chapter: 46,
    lastVerse: 24
  },
  {
    book: 26,
    chapter: 47,
    lastVerse: 23
  },
  {
    book: 26,
    chapter: 48,
    lastVerse: 35
  },
  {
    book: 27,
    chapter: 1,
    lastVerse: 21
  },
  {
    book: 27,
    chapter: 2,
    lastVerse: 49
  },
  {
    book: 27,
    chapter: 3,
    lastVerse: 30
  },
  {
    book: 27,
    chapter: 4,
    lastVerse: 37
  },
  {
    book: 27,
    chapter: 5,
    lastVerse: 31
  },
  {
    book: 27,
    chapter: 6,
    lastVerse: 28
  },
  {
    book: 27,
    chapter: 7,
    lastVerse: 28
  },
  {
    book: 27,
    chapter: 8,
    lastVerse: 27
  },
  {
    book: 27,
    chapter: 9,
    lastVerse: 27
  },
  {
    book: 27,
    chapter: 10,
    lastVerse: 21
  },
  {
    book: 27,
    chapter: 11,
    lastVerse: 45
  },
  {
    book: 27,
    chapter: 12,
    lastVerse: 13
  },
  {
    book: 28,
    chapter: 1,
    lastVerse: 11
  },
  {
    book: 28,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 28,
    chapter: 3,
    lastVerse: 5
  },
  {
    book: 28,
    chapter: 4,
    lastVerse: 19
  },
  {
    book: 28,
    chapter: 5,
    lastVerse: 15
  },
  {
    book: 28,
    chapter: 6,
    lastVerse: 11
  },
  {
    book: 28,
    chapter: 7,
    lastVerse: 16
  },
  {
    book: 28,
    chapter: 8,
    lastVerse: 14
  },
  {
    book: 28,
    chapter: 9,
    lastVerse: 17
  },
  {
    book: 28,
    chapter: 10,
    lastVerse: 15
  },
  {
    book: 28,
    chapter: 11,
    lastVerse: 12
  },
  {
    book: 28,
    chapter: 12,
    lastVerse: 14
  },
  {
    book: 28,
    chapter: 13,
    lastVerse: 16
  },
  {
    book: 28,
    chapter: 14,
    lastVerse: 9
  },
  {
    book: 29,
    chapter: 1,
    lastVerse: 20
  },
  {
    book: 29,
    chapter: 2,
    lastVerse: 32
  },
  {
    book: 29,
    chapter: 3,
    lastVerse: 21
  },
  {
    book: 30,
    chapter: 1,
    lastVerse: 15
  },
  {
    book: 30,
    chapter: 2,
    lastVerse: 16
  },
  {
    book: 30,
    chapter: 3,
    lastVerse: 15
  },
  {
    book: 30,
    chapter: 4,
    lastVerse: 13
  },
  {
    book: 30,
    chapter: 5,
    lastVerse: 27
  },
  {
    book: 30,
    chapter: 6,
    lastVerse: 14
  },
  {
    book: 30,
    chapter: 7,
    lastVerse: 17
  },
  {
    book: 30,
    chapter: 8,
    lastVerse: 14
  },
  {
    book: 30,
    chapter: 9,
    lastVerse: 15
  },
  {
    book: 31,
    chapter: 1,
    lastVerse: 21
  },
  {
    book: 32,
    chapter: 1,
    lastVerse: 17
  },
  {
    book: 32,
    chapter: 2,
    lastVerse: 10
  },
  {
    book: 32,
    chapter: 3,
    lastVerse: 10
  },
  {
    book: 32,
    chapter: 4,
    lastVerse: 11
  },
  {
    book: 33,
    chapter: 1,
    lastVerse: 16
  },
  {
    book: 33,
    chapter: 2,
    lastVerse: 13
  },
  {
    book: 33,
    chapter: 3,
    lastVerse: 12
  },
  {
    book: 33,
    chapter: 4,
    lastVerse: 13
  },
  {
    book: 33,
    chapter: 5,
    lastVerse: 15
  },
  {
    book: 33,
    chapter: 6,
    lastVerse: 16
  },
  {
    book: 33,
    chapter: 7,
    lastVerse: 20
  },
  {
    book: 34,
    chapter: 1,
    lastVerse: 15
  },
  {
    book: 34,
    chapter: 2,
    lastVerse: 13
  },
  {
    book: 34,
    chapter: 3,
    lastVerse: 19
  },
  {
    book: 35,
    chapter: 1,
    lastVerse: 17
  },
  {
    book: 35,
    chapter: 2,
    lastVerse: 20
  },
  {
    book: 35,
    chapter: 3,
    lastVerse: 19
  },
  {
    book: 36,
    chapter: 1,
    lastVerse: 18
  },
  {
    book: 36,
    chapter: 2,
    lastVerse: 15
  },
  {
    book: 36,
    chapter: 3,
    lastVerse: 20
  },
  {
    book: 37,
    chapter: 1,
    lastVerse: 15
  },
  {
    book: 37,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 38,
    chapter: 1,
    lastVerse: 21
  },
  {
    book: 38,
    chapter: 2,
    lastVerse: 13
  },
  {
    book: 38,
    chapter: 3,
    lastVerse: 10
  },
  {
    book: 38,
    chapter: 4,
    lastVerse: 14
  },
  {
    book: 38,
    chapter: 5,
    lastVerse: 11
  },
  {
    book: 38,
    chapter: 6,
    lastVerse: 15
  },
  {
    book: 38,
    chapter: 7,
    lastVerse: 14
  },
  {
    book: 38,
    chapter: 8,
    lastVerse: 23
  },
  {
    book: 38,
    chapter: 9,
    lastVerse: 17
  },
  {
    book: 38,
    chapter: 10,
    lastVerse: 12
  },
  {
    book: 38,
    chapter: 11,
    lastVerse: 17
  },
  {
    book: 38,
    chapter: 12,
    lastVerse: 14
  },
  {
    book: 38,
    chapter: 13,
    lastVerse: 9
  },
  {
    book: 38,
    chapter: 14,
    lastVerse: 21
  },
  {
    book: 39,
    chapter: 1,
    lastVerse: 14
  },
  {
    book: 39,
    chapter: 2,
    lastVerse: 17
  },
  {
    book: 39,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 39,
    chapter: 4,
    lastVerse: 6
  },
  {
    book: 40,
    chapter: 1,
    lastVerse: 25
  },
  {
    book: 40,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 40,
    chapter: 3,
    lastVerse: 17
  },
  {
    book: 40,
    chapter: 4,
    lastVerse: 25
  },
  {
    book: 40,
    chapter: 5,
    lastVerse: 48
  },
  {
    book: 40,
    chapter: 6,
    lastVerse: 34
  },
  {
    book: 40,
    chapter: 7,
    lastVerse: 29
  },
  {
    book: 40,
    chapter: 8,
    lastVerse: 34
  },
  {
    book: 40,
    chapter: 9,
    lastVerse: 38
  },
  {
    book: 40,
    chapter: 10,
    lastVerse: 42
  },
  {
    book: 40,
    chapter: 11,
    lastVerse: 30
  },
  {
    book: 40,
    chapter: 12,
    lastVerse: 50
  },
  {
    book: 40,
    chapter: 13,
    lastVerse: 58
  },
  {
    book: 40,
    chapter: 14,
    lastVerse: 36
  },
  {
    book: 40,
    chapter: 15,
    lastVerse: 39
  },
  {
    book: 40,
    chapter: 16,
    lastVerse: 28
  },
  {
    book: 40,
    chapter: 17,
    lastVerse: 27
  },
  {
    book: 40,
    chapter: 18,
    lastVerse: 35
  },
  {
    book: 40,
    chapter: 19,
    lastVerse: 30
  },
  {
    book: 40,
    chapter: 20,
    lastVerse: 34
  },
  {
    book: 40,
    chapter: 21,
    lastVerse: 46
  },
  {
    book: 40,
    chapter: 22,
    lastVerse: 46
  },
  {
    book: 40,
    chapter: 23,
    lastVerse: 39
  },
  {
    book: 40,
    chapter: 24,
    lastVerse: 51
  },
  {
    book: 40,
    chapter: 25,
    lastVerse: 46
  },
  {
    book: 40,
    chapter: 26,
    lastVerse: 75
  },
  {
    book: 40,
    chapter: 27,
    lastVerse: 66
  },
  {
    book: 40,
    chapter: 28,
    lastVerse: 20
  },
  {
    book: 41,
    chapter: 1,
    lastVerse: 45
  },
  {
    book: 41,
    chapter: 2,
    lastVerse: 28
  },
  {
    book: 41,
    chapter: 3,
    lastVerse: 35
  },
  {
    book: 41,
    chapter: 4,
    lastVerse: 41
  },
  {
    book: 41,
    chapter: 5,
    lastVerse: 43
  },
  {
    book: 41,
    chapter: 6,
    lastVerse: 56
  },
  {
    book: 41,
    chapter: 7,
    lastVerse: 37
  },
  {
    book: 41,
    chapter: 8,
    lastVerse: 38
  },
  {
    book: 41,
    chapter: 9,
    lastVerse: 50
  },
  {
    book: 41,
    chapter: 10,
    lastVerse: 52
  },
  {
    book: 41,
    chapter: 11,
    lastVerse: 33
  },
  {
    book: 41,
    chapter: 12,
    lastVerse: 44
  },
  {
    book: 41,
    chapter: 13,
    lastVerse: 37
  },
  {
    book: 41,
    chapter: 14,
    lastVerse: 72
  },
  {
    book: 41,
    chapter: 15,
    lastVerse: 47
  },
  {
    book: 41,
    chapter: 16,
    lastVerse: 20
  },
  {
    book: 42,
    chapter: 1,
    lastVerse: 80
  },
  {
    book: 42,
    chapter: 2,
    lastVerse: 52
  },
  {
    book: 42,
    chapter: 3,
    lastVerse: 38
  },
  {
    book: 42,
    chapter: 4,
    lastVerse: 44
  },
  {
    book: 42,
    chapter: 5,
    lastVerse: 39
  },
  {
    book: 42,
    chapter: 6,
    lastVerse: 49
  },
  {
    book: 42,
    chapter: 7,
    lastVerse: 50
  },
  {
    book: 42,
    chapter: 8,
    lastVerse: 56
  },
  {
    book: 42,
    chapter: 9,
    lastVerse: 62
  },
  {
    book: 42,
    chapter: 10,
    lastVerse: 42
  },
  {
    book: 42,
    chapter: 11,
    lastVerse: 54
  },
  {
    book: 42,
    chapter: 12,
    lastVerse: 59
  },
  {
    book: 42,
    chapter: 13,
    lastVerse: 35
  },
  {
    book: 42,
    chapter: 14,
    lastVerse: 35
  },
  {
    book: 42,
    chapter: 15,
    lastVerse: 32
  },
  {
    book: 42,
    chapter: 16,
    lastVerse: 31
  },
  {
    book: 42,
    chapter: 17,
    lastVerse: 37
  },
  {
    book: 42,
    chapter: 18,
    lastVerse: 43
  },
  {
    book: 42,
    chapter: 19,
    lastVerse: 48
  },
  {
    book: 42,
    chapter: 20,
    lastVerse: 47
  },
  {
    book: 42,
    chapter: 21,
    lastVerse: 38
  },
  {
    book: 42,
    chapter: 22,
    lastVerse: 71
  },
  {
    book: 42,
    chapter: 23,
    lastVerse: 56
  },
  {
    book: 42,
    chapter: 24,
    lastVerse: 53
  },
  {
    book: 43,
    chapter: 1,
    lastVerse: 51
  },
  {
    book: 43,
    chapter: 2,
    lastVerse: 25
  },
  {
    book: 43,
    chapter: 3,
    lastVerse: 36
  },
  {
    book: 43,
    chapter: 4,
    lastVerse: 54
  },
  {
    book: 43,
    chapter: 5,
    lastVerse: 47
  },
  {
    book: 43,
    chapter: 6,
    lastVerse: 71
  },
  {
    book: 43,
    chapter: 7,
    lastVerse: 53
  },
  {
    book: 43,
    chapter: 8,
    lastVerse: 59
  },
  {
    book: 43,
    chapter: 9,
    lastVerse: 41
  },
  {
    book: 43,
    chapter: 10,
    lastVerse: 42
  },
  {
    book: 43,
    chapter: 11,
    lastVerse: 57
  },
  {
    book: 43,
    chapter: 12,
    lastVerse: 50
  },
  {
    book: 43,
    chapter: 13,
    lastVerse: 38
  },
  {
    book: 43,
    chapter: 14,
    lastVerse: 31
  },
  {
    book: 43,
    chapter: 15,
    lastVerse: 27
  },
  {
    book: 43,
    chapter: 16,
    lastVerse: 33
  },
  {
    book: 43,
    chapter: 17,
    lastVerse: 26
  },
  {
    book: 43,
    chapter: 18,
    lastVerse: 40
  },
  {
    book: 43,
    chapter: 19,
    lastVerse: 42
  },
  {
    book: 43,
    chapter: 20,
    lastVerse: 31
  },
  {
    book: 43,
    chapter: 21,
    lastVerse: 25
  },
  {
    book: 44,
    chapter: 1,
    lastVerse: 26
  },
  {
    book: 44,
    chapter: 2,
    lastVerse: 47
  },
  {
    book: 44,
    chapter: 3,
    lastVerse: 26
  },
  {
    book: 44,
    chapter: 4,
    lastVerse: 37
  },
  {
    book: 44,
    chapter: 5,
    lastVerse: 42
  },
  {
    book: 44,
    chapter: 6,
    lastVerse: 15
  },
  {
    book: 44,
    chapter: 7,
    lastVerse: 60
  },
  {
    book: 44,
    chapter: 8,
    lastVerse: 40
  },
  {
    book: 44,
    chapter: 9,
    lastVerse: 43
  },
  {
    book: 44,
    chapter: 10,
    lastVerse: 48
  },
  {
    book: 44,
    chapter: 11,
    lastVerse: 30
  },
  {
    book: 44,
    chapter: 12,
    lastVerse: 25
  },
  {
    book: 44,
    chapter: 13,
    lastVerse: 52
  },
  {
    book: 44,
    chapter: 14,
    lastVerse: 28
  },
  {
    book: 44,
    chapter: 15,
    lastVerse: 41
  },
  {
    book: 44,
    chapter: 16,
    lastVerse: 40
  },
  {
    book: 44,
    chapter: 17,
    lastVerse: 34
  },
  {
    book: 44,
    chapter: 18,
    lastVerse: 28
  },
  {
    book: 44,
    chapter: 19,
    lastVerse: 41
  },
  {
    book: 44,
    chapter: 20,
    lastVerse: 38
  },
  {
    book: 44,
    chapter: 21,
    lastVerse: 40
  },
  {
    book: 44,
    chapter: 22,
    lastVerse: 30
  },
  {
    book: 44,
    chapter: 23,
    lastVerse: 35
  },
  {
    book: 44,
    chapter: 24,
    lastVerse: 27
  },
  {
    book: 44,
    chapter: 25,
    lastVerse: 27
  },
  {
    book: 44,
    chapter: 26,
    lastVerse: 32
  },
  {
    book: 44,
    chapter: 27,
    lastVerse: 44
  },
  {
    book: 44,
    chapter: 28,
    lastVerse: 31
  },
  {
    book: 45,
    chapter: 1,
    lastVerse: 32
  },
  {
    book: 45,
    chapter: 2,
    lastVerse: 29
  },
  {
    book: 45,
    chapter: 3,
    lastVerse: 31
  },
  {
    book: 45,
    chapter: 4,
    lastVerse: 25
  },
  {
    book: 45,
    chapter: 5,
    lastVerse: 21
  },
  {
    book: 45,
    chapter: 6,
    lastVerse: 23
  },
  {
    book: 45,
    chapter: 7,
    lastVerse: 25
  },
  {
    book: 45,
    chapter: 8,
    lastVerse: 39
  },
  {
    book: 45,
    chapter: 9,
    lastVerse: 33
  },
  {
    book: 45,
    chapter: 10,
    lastVerse: 21
  },
  {
    book: 45,
    chapter: 11,
    lastVerse: 36
  },
  {
    book: 45,
    chapter: 12,
    lastVerse: 21
  },
  {
    book: 45,
    chapter: 13,
    lastVerse: 14
  },
  {
    book: 45,
    chapter: 14,
    lastVerse: 23
  },
  {
    book: 45,
    chapter: 15,
    lastVerse: 33
  },
  {
    book: 45,
    chapter: 16,
    lastVerse: 27
  },
  {
    book: 46,
    chapter: 1,
    lastVerse: 31
  },
  {
    book: 46,
    chapter: 2,
    lastVerse: 16
  },
  {
    book: 46,
    chapter: 3,
    lastVerse: 23
  },
  {
    book: 46,
    chapter: 4,
    lastVerse: 21
  },
  {
    book: 46,
    chapter: 5,
    lastVerse: 13
  },
  {
    book: 46,
    chapter: 6,
    lastVerse: 20
  },
  {
    book: 46,
    chapter: 7,
    lastVerse: 40
  },
  {
    book: 46,
    chapter: 8,
    lastVerse: 13
  },
  {
    book: 46,
    chapter: 9,
    lastVerse: 27
  },
  {
    book: 46,
    chapter: 10,
    lastVerse: 33
  },
  {
    book: 46,
    chapter: 11,
    lastVerse: 34
  },
  {
    book: 46,
    chapter: 12,
    lastVerse: 31
  },
  {
    book: 46,
    chapter: 13,
    lastVerse: 13
  },
  {
    book: 46,
    chapter: 14,
    lastVerse: 40
  },
  {
    book: 46,
    chapter: 15,
    lastVerse: 58
  },
  {
    book: 46,
    chapter: 16,
    lastVerse: 24
  },
  {
    book: 47,
    chapter: 1,
    lastVerse: 24
  },
  {
    book: 47,
    chapter: 2,
    lastVerse: 17
  },
  {
    book: 47,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 47,
    chapter: 4,
    lastVerse: 18
  },
  {
    book: 47,
    chapter: 5,
    lastVerse: 21
  },
  {
    book: 47,
    chapter: 6,
    lastVerse: 18
  },
  {
    book: 47,
    chapter: 7,
    lastVerse: 16
  },
  {
    book: 47,
    chapter: 8,
    lastVerse: 24
  },
  {
    book: 47,
    chapter: 9,
    lastVerse: 15
  },
  {
    book: 47,
    chapter: 10,
    lastVerse: 18
  },
  {
    book: 47,
    chapter: 11,
    lastVerse: 33
  },
  {
    book: 47,
    chapter: 12,
    lastVerse: 21
  },
  {
    book: 47,
    chapter: 13,
    lastVerse: 13
  },
  {
    book: 48,
    chapter: 1,
    lastVerse: 24
  },
  {
    book: 48,
    chapter: 2,
    lastVerse: 21
  },
  {
    book: 48,
    chapter: 3,
    lastVerse: 29
  },
  {
    book: 48,
    chapter: 4,
    lastVerse: 31
  },
  {
    book: 48,
    chapter: 5,
    lastVerse: 26
  },
  {
    book: 48,
    chapter: 6,
    lastVerse: 18
  },
  {
    book: 49,
    chapter: 1,
    lastVerse: 23
  },
  {
    book: 49,
    chapter: 2,
    lastVerse: 22
  },
  {
    book: 49,
    chapter: 3,
    lastVerse: 21
  },
  {
    book: 49,
    chapter: 4,
    lastVerse: 32
  },
  {
    book: 49,
    chapter: 5,
    lastVerse: 33
  },
  {
    book: 49,
    chapter: 6,
    lastVerse: 24
  },
  {
    book: 50,
    chapter: 1,
    lastVerse: 30
  },
  {
    book: 50,
    chapter: 2,
    lastVerse: 30
  },
  {
    book: 50,
    chapter: 3,
    lastVerse: 21
  },
  {
    book: 50,
    chapter: 4,
    lastVerse: 23
  },
  {
    book: 51,
    chapter: 1,
    lastVerse: 29
  },
  {
    book: 51,
    chapter: 2,
    lastVerse: 23
  },
  {
    book: 51,
    chapter: 3,
    lastVerse: 25
  },
  {
    book: 51,
    chapter: 4,
    lastVerse: 18
  },
  {
    book: 52,
    chapter: 1,
    lastVerse: 10
  },
  {
    book: 52,
    chapter: 2,
    lastVerse: 20
  },
  {
    book: 52,
    chapter: 3,
    lastVerse: 13
  },
  {
    book: 52,
    chapter: 4,
    lastVerse: 18
  },
  {
    book: 52,
    chapter: 5,
    lastVerse: 28
  },
  {
    book: 53,
    chapter: 1,
    lastVerse: 12
  },
  {
    book: 53,
    chapter: 2,
    lastVerse: 17
  },
  {
    book: 53,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 54,
    chapter: 1,
    lastVerse: 20
  },
  {
    book: 54,
    chapter: 2,
    lastVerse: 15
  },
  {
    book: 54,
    chapter: 3,
    lastVerse: 16
  },
  {
    book: 54,
    chapter: 4,
    lastVerse: 16
  },
  {
    book: 54,
    chapter: 5,
    lastVerse: 25
  },
  {
    book: 54,
    chapter: 6,
    lastVerse: 21
  },
  {
    book: 55,
    chapter: 1,
    lastVerse: 18
  },
  {
    book: 55,
    chapter: 2,
    lastVerse: 26
  },
  {
    book: 55,
    chapter: 3,
    lastVerse: 17
  },
  {
    book: 55,
    chapter: 4,
    lastVerse: 22
  },
  {
    book: 56,
    chapter: 1,
    lastVerse: 16
  },
  {
    book: 56,
    chapter: 2,
    lastVerse: 15
  },
  {
    book: 56,
    chapter: 3,
    lastVerse: 15
  },
  {
    book: 57,
    chapter: 1,
    lastVerse: 25
  },
  {
    book: 58,
    chapter: 1,
    lastVerse: 14
  },
  {
    book: 58,
    chapter: 2,
    lastVerse: 18
  },
  {
    book: 58,
    chapter: 3,
    lastVerse: 19
  },
  {
    book: 58,
    chapter: 4,
    lastVerse: 16
  },
  {
    book: 58,
    chapter: 5,
    lastVerse: 14
  },
  {
    book: 58,
    chapter: 6,
    lastVerse: 20
  },
  {
    book: 58,
    chapter: 7,
    lastVerse: 28
  },
  {
    book: 58,
    chapter: 8,
    lastVerse: 13
  },
  {
    book: 58,
    chapter: 9,
    lastVerse: 28
  },
  {
    book: 58,
    chapter: 10,
    lastVerse: 39
  },
  {
    book: 58,
    chapter: 11,
    lastVerse: 40
  },
  {
    book: 58,
    chapter: 12,
    lastVerse: 29
  },
  {
    book: 58,
    chapter: 13,
    lastVerse: 25
  },
  {
    book: 59,
    chapter: 1,
    lastVerse: 27
  },
  {
    book: 59,
    chapter: 2,
    lastVerse: 26
  },
  {
    book: 59,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 59,
    chapter: 4,
    lastVerse: 17
  },
  {
    book: 59,
    chapter: 5,
    lastVerse: 20
  },
  {
    book: 60,
    chapter: 1,
    lastVerse: 25
  },
  {
    book: 60,
    chapter: 2,
    lastVerse: 25
  },
  {
    book: 60,
    chapter: 3,
    lastVerse: 22
  },
  {
    book: 60,
    chapter: 4,
    lastVerse: 19
  },
  {
    book: 60,
    chapter: 5,
    lastVerse: 14
  },
  {
    book: 61,
    chapter: 1,
    lastVerse: 21
  },
  {
    book: 61,
    chapter: 2,
    lastVerse: 22
  },
  {
    book: 61,
    chapter: 3,
    lastVerse: 18
  },
  {
    book: 62,
    chapter: 1,
    lastVerse: 10
  },
  {
    book: 62,
    chapter: 2,
    lastVerse: 29
  },
  {
    book: 62,
    chapter: 3,
    lastVerse: 24
  },
  {
    book: 62,
    chapter: 4,
    lastVerse: 21
  },
  {
    book: 62,
    chapter: 5,
    lastVerse: 21
  },
  {
    book: 63,
    chapter: 1,
    lastVerse: 13
  },
  {
    book: 64,
    chapter: 1,
    lastVerse: 15
  },
  {
    book: 65,
    chapter: 1,
    lastVerse: 25
  },
  {
    book: 66,
    chapter: 1,
    lastVerse: 20
  },
  {
    book: 66,
    chapter: 2,
    lastVerse: 29
  },
  {
    book: 66,
    chapter: 3,
    lastVerse: 22
  },
  {
    book: 66,
    chapter: 4,
    lastVerse: 11
  },
  {
    book: 66,
    chapter: 5,
    lastVerse: 14
  },
  {
    book: 66,
    chapter: 6,
    lastVerse: 17
  },
  {
    book: 66,
    chapter: 7,
    lastVerse: 17
  },
  {
    book: 66,
    chapter: 8,
    lastVerse: 13
  },
  {
    book: 66,
    chapter: 9,
    lastVerse: 21
  },
  {
    book: 66,
    chapter: 10,
    lastVerse: 11
  },
  {
    book: 66,
    chapter: 11,
    lastVerse: 19
  },
  {
    book: 66,
    chapter: 12,
    lastVerse: 17
  },
  {
    book: 66,
    chapter: 13,
    lastVerse: 18
  },
  {
    book: 66,
    chapter: 14,
    lastVerse: 20
  },
  {
    book: 66,
    chapter: 15,
    lastVerse: 8
  },
  {
    book: 66,
    chapter: 16,
    lastVerse: 21
  },
  {
    book: 66,
    chapter: 17,
    lastVerse: 18
  },
  {
    book: 66,
    chapter: 18,
    lastVerse: 24
  },
  {
    book: 66,
    chapter: 19,
    lastVerse: 21
  },
  {
    book: 66,
    chapter: 20,
    lastVerse: 15
  },
  {
    book: 66,
    chapter: 21,
    lastVerse: 27
  },
  {
    book: 66,
    chapter: 22,
    lastVerse: 21
  }
]
