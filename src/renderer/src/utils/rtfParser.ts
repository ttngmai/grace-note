export function parseRtfLikeToHtml(raw: string, isLight: boolean): string {
  const tokens = raw.split(/(\\par|\\f\d+|\\cf\d+|\\ATXht\d+\([^)]+\)\\ATXht0)/)

  let html = ''
  let currentFont = ''
  let currentColor = ''
  let buffer = '' // 현재 열린 span 내부의 텍스트 버퍼

  // 현재 열린 span
  function openSpan(): string {
    const fontClass = currentFont === '3' ? 'font-bold' : ''
    const colorClass =
      currentColor === '5' ? (isLight ? 'font-bold text-blue-600' : 'font-bold text-blue-300') : ''
    const classList = [fontClass, colorClass].filter(Boolean).join(' ')
    return classList ? `<span class="${classList}">` : ''
  }

  function flushBuffer(): void {
    if (buffer) {
      html += openSpan() + buffer + (currentFont || currentColor ? '</span>' : '')
      buffer = ''
    }
  }

  for (const t of tokens) {
    if (!t) continue

    // 줄바꿈 처리
    if (t === '\\par') {
      flushBuffer()
      html += '<br/>'
      continue
    }

    // 글꼴 변경
    if (/^\\f\d+/.test(t)) {
      flushBuffer()
      currentFont = t.slice(2) // "f2" → "2"
      continue
    }

    // 색상 변경
    if (/^\\cf\d+/.test(t)) {
      flushBuffer()
      currentColor = t.slice(3) // "cf5" → "5"
      if (currentColor === '0') currentColor = '' // cf0 은 초기화
      continue
    }

    // 성경 레퍼런스
    if (t.startsWith('\\ATXht')) {
      const m = t.match(/\\ATXht\d+\(([^)]+)\)\\ATXht0/)
      if (m) {
        flushBuffer()
        html += `<span class="${isLight ? 'text-red-600' : 'text-red-300'}">(${m[1]})</span>`
      }
      continue
    }

    // 일반 텍스트 → 버퍼에 저장
    buffer += t
  }

  flushBuffer() // 남은 버퍼 처리
  return html.replace(/\s+<br\/>/g, '<br/>').trim()
}
