import 'pretendard/dist/web/variable/pretendardvariable.css'
import './assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { createStore, Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HymnPage from './pages/HymnPage'
import GlobalContextMenu from './components/common/GlobalContextMenu'
import LexiconPage from './pages/LexiconPage'
import BibleVersePage from './pages/BibleVersePage'
import ThemePage from './pages/ThemePage'
import BibleNavInitializer from './components/common/BibleNavInitializer'

const rootStore = createStore()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <QueryClientProvider client={queryClient}>
        <GlobalContextMenu />
        <BibleNavInitializer />
        <HashRouter>
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/hymn" Component={HymnPage} />
            <Route path="/bible-verse" Component={BibleVersePage} />
            <Route path="/lexicon" Component={LexiconPage} />
            <Route path="/theme" Component={ThemePage} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
