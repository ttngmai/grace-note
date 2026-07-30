/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FindBible,
  FindLexicalCodeFromBible,
  FindHymn,
  FindLexicon,
  FindCommentary,
  FindKeywordFromBible,
  FindKeywordFromHymn,
  FindThemeById,
  FindThemeIdAndWord,
  FindHymnNumberAndTitle
} from '@shared/types'

declare global {
  interface Window {
    electron: {
      locale: string
      store: {
        get: (key: string) => any
        set: (key: string, value: any) => void
        delete: (key: string) => void
      }
      menu: {
        showContextMenu: (elementType: string, imageUrl?: string) => void
      }
    }
    context: {
      findBible: FindBible
      findCommentary: FindCommentary
      findLexicon: FindLexicon
      findHymn: FindHymn
      findKeywordFromBible: FindKeywordFromBible
      findLexicalCodeFromBible: FindLexicalCodeFromBible
      findKeywordFromHymn: FindKeywordFromHymn
      findHymnNumberAndTitle: FindHymnNumberAndTitle
      findThemeById: FindThemeById
      findThemeIdAndWord: FindThemeIdAndWord
      getAudioFilePath: (fileName: string) => string
      getImageFilePath: (fileName: string) => string
      openBibleVerseWindow: () => void
      openLexiconWindow: (keyword?: string) => void
      onUpdateLexicalCode: (callback) => void
      openHymnWindow: () => void
      openThemeWindow: () => void
    }
  }
}
