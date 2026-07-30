import { contextBridge, ipcRenderer } from 'electron'
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
} from '@shared/types.js'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

/**
 * 렌더러 프로세스에서 사용할 수 있는 API를 제한하여,
 * 메인 프로세스의 기능을 안전하게 호출할 수 있도록 함.
 */
try {
  contextBridge.exposeInMainWorld('electron', {
    locale: navigator.language,
    store: {
      get(key) {
        return ipcRenderer.sendSync('electron-store-get', key)
      },
      set(property, val) {
        ipcRenderer.send('electron-store-set', property, val)
      },
      delete(key) {
        return ipcRenderer.sendSync('electron-store-delete', key)
      }
    },
    menu: {
      showContextMenu(elementType, imageUrl) {
        ipcRenderer.send('show-context-menu', elementType, imageUrl)
      }
    }
  })
  contextBridge.exposeInMainWorld('context', {
    findBible: (...args: Parameters<FindBible>) => ipcRenderer.invoke('findBible', ...args),
    findCommentary: (...args: Parameters<FindCommentary>) =>
      ipcRenderer.invoke('findCommentary', ...args),
    findLexicon: (...args: Parameters<FindLexicon>) => ipcRenderer.invoke('findLexicon', ...args),
    findHymn: (...args: Parameters<FindHymn>) => ipcRenderer.invoke('findHymn', ...args),
    findKeywordFromBible: (...args: Parameters<FindKeywordFromBible>) =>
      ipcRenderer.invoke('findKeywordFromBible', ...args),
    findLexicalCodeFromBible: (...args: Parameters<FindLexicalCodeFromBible>) =>
      ipcRenderer.invoke('findLexicalCodeFromBible', ...args),
    findKeywordFromHymn: (...args: Parameters<FindKeywordFromHymn>) =>
      ipcRenderer.invoke('findKeywordFromHymn', ...args),
    findHymnNumberAndTitle: (...args: Parameters<FindHymnNumberAndTitle>) =>
      ipcRenderer.invoke('findHymnNumberAndTitle', ...args),
    findThemeById: (...args: Parameters<FindThemeById>) =>
      ipcRenderer.invoke('findThemeById', ...args),
    findThemeIdAndWord: (...args: Parameters<FindThemeIdAndWord>) =>
      ipcRenderer.invoke('findThemeIdAndWord', ...args),
    getAudioFilePath: (fileName: string) => ipcRenderer.invoke('getAudioFilePath', fileName),
    getImageFilePath: (fileName: string) => ipcRenderer.invoke('getImageFilePath', fileName),
    openBibleVerseWindow: () => ipcRenderer.invoke('open-bible-verse-window'),
    openLexiconWindow: (keyword?: string) => ipcRenderer.send('open-lexicon-window', keyword),
    onUpdateLexicalCode: (callback) => {
      ipcRenderer.on('update-lexical-code', (_event, keyword) => {
        callback(keyword)
      })
    },
    openHymnWindow: () => ipcRenderer.invoke('open-hymn-window'),
    openThemeWindow: () => ipcRenderer.invoke('open-theme-window')
  })
} catch (error) {
  console.error(error)
}
