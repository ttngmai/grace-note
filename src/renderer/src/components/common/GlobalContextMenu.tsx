import { useEffect } from 'react'

type CtxPayload =
  | { kind: 'editable'; hasSelection: boolean }
  | { kind: 'image'; src: string }
  | { kind: 'selection' }

function isEditable(
  el: EventTarget | null
): el is HTMLInputElement | HTMLTextAreaElement | HTMLElement {
  if (!(el instanceof HTMLElement)) return false
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return true
  return el.isContentEditable === true
}

function hasSelectionInEditable(el: HTMLInputElement | HTMLTextAreaElement | HTMLElement): boolean {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return (
      el.selectionStart !== null &&
      el.selectionEnd !== null &&
      el.selectionStart !== el.selectionEnd
    )
  }
  // contenteditable
  const sel = window.getSelection()
  return !!sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed && el.contains(sel.anchorNode)
}

export default function GlobalContextMenu(): JSX.Element | null {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent): void => {
      event.preventDefault()
      const target = event.target as HTMLElement

      // 1) 이미지
      if (target instanceof HTMLImageElement) {
        const payload: CtxPayload = { kind: 'image', src: target.src }
        window.electron.menu.showContextMenu(payload as any)
        return
      }

      // 2) 에디터블(입력/textarea/contenteditable)
      if (isEditable(target)) {
        const payload: CtxPayload = {
          kind: 'editable',
          hasSelection: hasSelectionInEditable(target)
        }
        window.electron.menu.showContextMenu(payload as any)
        return
      }

      // 3) 일반 선택 텍스트 (페이지 본문 등)
      const sel = window.getSelection()
      if (sel && sel.toString().trim().length > 0) {
        const payload: CtxPayload = { kind: 'selection' }
        window.electron.menu.showContextMenu(payload as any)
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return null
}
