import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  clipboard,
  protocol,
  Menu,
  nativeImage,
  dialog
} from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Store from 'electron-store'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
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
import {
  findBible,
  findKeywordFromBible,
  findLexicalCodeFromBible
} from '@/repository/BibleRepository.js'
import { findLexicon } from './repository/LexiconRepository.js'
import {
  findHymn,
  findHymnNumberAndTitle,
  findKeywordFromHymn
} from './repository/HymnRepository.js'
import icon from '../../resources/icon.ico?asset'
import { findCommentary } from './repository/CommentaryRepository.js'
import { findThemeById, findThemeIdAndWord } from './repository/ThemeRepository.js'

const store = new Store()

let bibleVerseWindow: BrowserWindow | null = null
let lexiconWindow: BrowserWindow | null = null
let hymnWindow: BrowserWindow | null = null
let themeWindow: BrowserWindow | null = null

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'local', // 사용자 정의 프로토콜 이름
    privileges: {
      standard: true, // 일반적인 URL처럼 사용 가능 (e.g., <a href="myapp://home">)
      secure: true, // HTTPS 같은 보안 설정 적용
      bypassCSP: true, // Content Security Policy(CSP) 무시
      supportFetchAPI: true, // `fetch()` 및 `XMLHttpRequest` 사용 가능
      corsEnabled: true // CORS(교차 출처 리소스 공유) 지원
    }
  }
])

export function handleVersionChange(): void {
  const currentVersion = app.getVersion()
  const lastVersion = store.get('lastVersion', '') as string

  if (lastVersion !== currentVersion) {
    console.log(`버전 변경 감지됨: ${lastVersion} → ${currentVersion}`)

    const configPath = path.join(app.getPath('userData'), 'config.json')
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath)
      console.log('이전 config.json 삭제됨')
    }

    store.set('lastVersion', currentVersion)
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    title: 'Grace Note',
    width: 1200,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(fileURLToPath(new URL('../renderer/index.html', import.meta.url)))
  }
}

app.whenReady().then(() => {
  handleVersionChange()

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  protocol.registerFileProtocol('local', (request, callback) => {
    const url = path.join(app.getAppPath(), request.url.replace('local://', ''))
    callback({ path: url })
  })

  ipcMain.on('electron-store-get', async (event, key) => {
    event.returnValue = store.get(key)
  })
  ipcMain.on('electron-store-set', async (_, key, val) => {
    store.set(key, val)
  })
  ipcMain.on('electron-store-delete', async (_, key) => {
    store.delete(key)
  })
  ipcMain.on('show-context-menu', (_, payload) => {
    let menuTemplate: Electron.MenuItemConstructorOptions[] = []

    if (payload?.kind === 'selection') {
      menuTemplate = [{ role: 'copy', label: '복사' }]
    } else if (payload?.kind === 'image' && payload?.src) {
      let absolutePath = payload.src as string
      if (absolutePath.startsWith('file://')) {
        absolutePath = fileURLToPath(absolutePath)
      } else if (!path.isAbsolute(absolutePath)) {
        absolutePath = path.join(
          app.getAppPath(),
          (payload.src as string).replace(/^local:\/\//, '')
        )
      }

      menuTemplate = [
        {
          label: '이미지 복사',
          click: (): void => {
            try {
              const image = nativeImage.createFromPath(absolutePath)
              if (!image.isEmpty()) clipboard.writeImage(image)
              else console.error('Failed to load image:', absolutePath)
            } catch (err) {
              console.error('Failed to copy image:', err)
            }
          }
        },
        {
          label: '이미지를 다른 이름으로 저장',
          click: async (): Promise<void> => {
            const { filePath } = await dialog.showSaveDialog({
              title: '이미지 저장',
              defaultPath: path.basename(absolutePath),
              filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif'] }]
            })
            if (filePath) {
              fs.copyFile(absolutePath, filePath, (err) => {
                if (err) console.error('Failed to save image:', err)
              })
            }
          }
        }
      ]
    } else if (payload?.kind === 'editable') {
      if (payload.hasSelection) {
        menuTemplate = [
          { role: 'copy', label: '복사' },
          { role: 'paste', label: '붙여넣기' },
          { role: 'cut', label: '잘라내기' }
        ]
      } else {
        menuTemplate = [{ role: 'paste', label: '붙여넣기' }]
      }
      menuTemplate.push({ type: 'separator' }, { role: 'selectAll', label: '모두 선택' })
    } else if (typeof payload === 'string') {
      if (payload === 'copyable-text') {
        menuTemplate = [{ role: 'copy', label: '복사' }]
      } else if (payload === 'text-input') {
        menuTemplate = [{ role: 'paste', label: '붙여넣기' }]
      } else {
        return
      }
    } else {
      return
    }

    const menu = Menu.buildFromTemplate(menuTemplate)
    menu.popup()
  })

  ipcMain.handle('findBible', (_, ...args: Parameters<FindBible>) => findBible(...args))
  ipcMain.handle('findCommentary', (_, ...args: Parameters<FindCommentary>) =>
    findCommentary(...args)
  )
  ipcMain.handle('findLexicon', (_, ...args: Parameters<FindLexicon>) => findLexicon(...args))
  ipcMain.handle('findHymn', (_, ...args: Parameters<FindHymn>) => findHymn(...args))
  ipcMain.handle('findKeywordFromBible', (_, ...args: Parameters<FindKeywordFromBible>) =>
    findKeywordFromBible(...args)
  )
  ipcMain.handle('findLexicalCodeFromBible', (_, ...args: Parameters<FindLexicalCodeFromBible>) =>
    findLexicalCodeFromBible(...args)
  )
  ipcMain.handle('findKeywordFromHymn', (_, ...args: Parameters<FindKeywordFromHymn>) =>
    findKeywordFromHymn(...args)
  )
  ipcMain.handle('findHymnNumberAndTitle', (_, ...args: Parameters<FindHymnNumberAndTitle>) =>
    findHymnNumberAndTitle(...args)
  )
  ipcMain.handle('findThemeById', (_, ...args: Parameters<FindThemeById>) => findThemeById(...args))
  ipcMain.handle('findThemeIdAndWord', (_, ...args: Parameters<FindThemeIdAndWord>) =>
    findThemeIdAndWord(...args)
  )
  ipcMain.handle('getAudioFilePath', (_, fileName) => {
    const filePath =
      process.env.NODE_ENV === 'development'
        ? `local://${path.join('src', 'audios', fileName)}`
        : `file://${path.join(process.resourcesPath, `./audios/${fileName}`)}`

    return filePath
  })
  ipcMain.handle('getImageFilePath', (_, fileName) => {
    const filePath =
      process.env.NODE_ENV === 'development'
        ? `local://${path.join('src', 'images', fileName)}`
        : `file://${path.join(process.resourcesPath, `./images/${fileName}`)}`

    return filePath
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('open-bible-verse-window', async () => {
  if (bibleVerseWindow) {
    bibleVerseWindow.focus()
    return
  }

  bibleVerseWindow = new BrowserWindow({
    title: '성구',
    width: 800,
    height: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    bibleVerseWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/bible-verse`)
  } else {
    bibleVerseWindow.loadFile(fileURLToPath(new URL(`../renderer/index.html`, import.meta.url)), {
      hash: '#/bible-verse'
    })
  }

  bibleVerseWindow.on('closed', () => {
    bibleVerseWindow = null
  })
})

ipcMain.on('open-lexicon-window', (_, keyword) => {
  if (lexiconWindow) {
    lexiconWindow.focus()
    lexiconWindow.webContents.send('update-lexical-code', keyword)
    return
  }

  lexiconWindow = new BrowserWindow({
    title: '원어코드',
    width: 800,
    height: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    lexiconWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/lexicon`)
  } else {
    lexiconWindow.loadFile(fileURLToPath(new URL(`../renderer/index.html`, import.meta.url)), {
      hash: '#/lexicon'
    })
  }

  lexiconWindow.webContents.on('did-finish-load', () => {
    if (lexiconWindow && !lexiconWindow.isDestroyed()) {
      lexiconWindow.webContents.send('update-lexical-code', keyword)
    }
  })

  lexiconWindow.on('closed', () => {
    lexiconWindow = null
  })
})

ipcMain.handle('open-hymn-window', async () => {
  if (hymnWindow) {
    hymnWindow.focus()
    return
  }

  hymnWindow = new BrowserWindow({
    title: '새찬송가',
    width: 800,
    height: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    hymnWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/hymn`)
  } else {
    hymnWindow.loadFile(fileURLToPath(new URL(`../renderer/index.html`, import.meta.url)), {
      hash: '#/hymn'
    })
  }

  hymnWindow.on('closed', () => {
    hymnWindow = null
  })
})

ipcMain.handle('open-theme-window', async () => {
  if (themeWindow) {
    themeWindow.focus()
    return
  }

  themeWindow = new BrowserWindow({
    title: '주제',
    width: 800,
    height: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    themeWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/theme`)
  } else {
    themeWindow.loadFile(fileURLToPath(new URL(`../renderer/index.html`, import.meta.url)), {
      hash: '#/theme'
    })
  }

  themeWindow.on('closed', () => {
    themeWindow = null
  })
})
