// colorUtils.ts

export type RGB = [number, number, number]
type Method = 'hsl' | 'invert'

// -------------------- Public APIs --------------------

/**
 * 색상이 "밝은지" 여부를 반환
 * - 입력: #hex / rgb() / rgba() / oklch()
 * - 밝기 계산: 0~255 가중합 (R*299 + G*587 + B*114) / 1000
 * @param color 입력 색상 문자열
 * @param threshold 밝기 임계값(기본 128). 클수록 밝게 판단
 */
export function isLight(color: string, threshold = 128): boolean {
  const { r, g, b } = parseColor(color) // sRGB 0..255
  const luminance = (r * 299 + g * 587 + b * 114) / 1000 // 0..255
  return luminance > threshold
}

/**
 * 보색 반환 (입력: #hex / rgb() / rgba() / oklch())
 * - 기본 HSL 보색, 옵션 "invert"는 RGB 반전
 * - rgba/oklch-alpha 입력이면 알파 보존 → #RRGGBBAA
 */
export function complementaryHex(color: string, method: Method = 'hsl'): string {
  const { r, g, b, a, hasAlpha } = parseColor(color)

  let R: number, G: number, B: number
  if (method === 'invert') {
    R = 255 - r
    G = 255 - g
    B = 255 - b
  } else {
    const { h, s, l } = rgbToHsl(r, g, b)
    const { r: rr, g: gg, b: bb } = hslToRgb((h + 180) % 360, s, l)
    R = rr
    G = gg
    B = bb
  }

  const hexRGB = [R, G, B]
    .map((v) => Math.round(v).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
  const hexA = hasAlpha && a !== null ? a.toString(16).padStart(2, '0').toUpperCase() : ''
  return `#${hexRGB}${hexA}`
}

// -------------------- Parsing & Conversions (internal) --------------------

interface ParsedColor {
  r: number // 0..255
  g: number // 0..255
  b: number // 0..255
  a: number | null // 0..255 (null = no alpha)
  hasAlpha: boolean
}

/** 통합 파서: #hex / rgb()/rgba() / oklch() → sRGB(0..255), alpha(0..255) */
function parseColor(input: string): ParsedColor {
  const s = input.trim()
  if (s.startsWith('#')) return parseHex(s)
  if (/^rgba?\(/i.test(s)) return rgbFuncToRgba(s)
  if (/^oklch\(/i.test(s)) return oklchToRgba(s)
  throw new Error(`Invalid color format: ${input}`)
}

// ---- HEX parsing (#RGB, #RRGGBB, #RGBA, #RRGGBBAA) ----
function parseHex(h: string): ParsedColor {
  let s = h.trim()
  if (s.startsWith('#')) s = s.slice(1)
  if (![3, 4, 6, 8].includes(s.length) || /[^0-9a-fA-F]/.test(s)) {
    throw new Error(`유효하지 않은 HEX: ${h}`)
  }
  if (s.length === 3 || s.length === 4) {
    s = s
      .split('')
      .map((ch) => ch + ch)
      .join('')
  }
  const hasAlpha = s.length === 8
  const r = parseInt(s.slice(0, 2), 16)
  const g = parseInt(s.slice(2, 4), 16)
  const b = parseInt(s.slice(4, 6), 16)
  const a = hasAlpha ? parseInt(s.slice(6, 8), 16) : null
  return { r, g, b, a, hasAlpha }
}

// ---- rgb()/rgba() parsing (정수/백분율, 알파: 0~1 또는 %) ----
function rgbFuncToRgba(str: string): ParsedColor {
  const compact = str.replace(/\s+/g, '')
  const chan = '(-?\\d{1,3}%?)' // 255 or 50%
  const alpha = '(-?(?:0|1|0?\\.\\d+|\\d{1,3}%))' // 0..1 or 0%..100%
  const re = new RegExp(`^rgba?\\(${chan},${chan},${chan}(?:,${alpha})?\\)$`, 'i')
  const m = compact.match(re)
  if (!m) throw new Error(`Invalid rgb()/rgba() format: ${str}`)

  const r = parseChannelTo255(m[1])
  const g = parseChannelTo255(m[2])
  const b = parseChannelTo255(m[3])

  let hasAlpha = false
  let aByte: number | null = null
  if (m[4] !== undefined) {
    hasAlpha = true
    aByte = parseAlphaToByte(m[4])
  }

  return { r, g, b, a: aByte, hasAlpha }
}

function parseChannelTo255(token: string): number {
  if (token.endsWith('%')) {
    const pct = clamp(Number(token.slice(0, -1)), 0, 100)
    return Math.round((pct / 100) * 255)
  }
  return clamp(parseInt(token, 10), 0, 255)
}

function parseAlphaToByte(token: string): number {
  if (token.endsWith('%')) {
    const pct = clamp(Number(token.slice(0, -1)), 0, 100)
    return Math.round((pct / 100) * 255)
  }
  const val = Number(token)
  return Math.round(clamp(val, 0, 1) * 255)
}

// ---- oklch() parsing & conversion → sRGB ----
/**
 * CSS oklch(L C H / A) 파싱
 * - L: 0..1 또는 0%..100% (둘 다 허용)
 * - C: >= 0 (단위 없음)
 * - H: 각도 (deg|rad|grad|turn). 단위 없으면 deg로 간주
 * - A: 0..1 또는 0%..100% (옵션)
 */
function oklchToRgba(str: string): ParsedColor {
  const inner = str
    .trim()
    .slice(str.indexOf('(') + 1, str.lastIndexOf(')'))
    .trim()

  // 공백 기준 토큰화하되, '/' 앞뒤 분리
  const slashIdx = inner.indexOf('/')
  const parts = (slashIdx >= 0 ? inner.slice(0, slashIdx) : inner).trim().split(/\s+/)
  if (parts.length < 3) throw new Error(`Invalid oklch() content: ${str}`)

  const alphaToken = slashIdx >= 0 ? inner.slice(slashIdx + 1).trim() : null

  const L = parseOklchLightness(parts[0]) // 0..1
  const C = Math.max(0, Number(parts[1]))
  if (!isFinite(C)) throw new Error(`Invalid oklch() chroma: ${parts[1]}`)

  const H = parseHueToDegrees(parts[2]) // degrees 0..360

  const a_ok = C * Math.cos((H * Math.PI) / 180)
  const b_ok = C * Math.sin((H * Math.PI) / 180)

  // oklab -> linear sRGB -> sRGB
  const { r, g, b } = oklabToSrgb({ L, a: a_ok, b: b_ok })

  const aByte = alphaToken ? parseAlphaToByte(alphaToken) : null
  const hasAlpha = alphaToken !== null

  return { r, g, b, a: aByte, hasAlpha }
}

function parseOklchLightness(token: string): number {
  if (token.endsWith('%')) {
    const pct = clamp(Number(token.slice(0, -1)), 0, 100)
    return pct / 100 // 0..1
  }
  const num = Number(token)
  if (!isFinite(num)) throw new Error(`Invalid oklch() lightness: ${token}`)
  // 관용 처리: 0..1 이면 그대로, 1보다 크면 %로 판단하여 0..100 → 0..1
  return num <= 1 ? clamp(num, 0, 1) : clamp(num / 100, 0, 1)
}

function parseHueToDegrees(token: string): number {
  const t = token.trim().toLowerCase()
  // 단위 판별
  if (t.endsWith('deg')) return normAngle(Number(t.slice(0, -3)))
  if (t.endsWith('grad')) return normAngle(Number(t.slice(0, -4)) * 0.9)
  if (t.endsWith('turn')) return normAngle(Number(t.slice(0, -4)) * 360)
  if (t.endsWith('rad')) return normAngle((Number(t.slice(0, -3)) * 180) / Math.PI)
  // 단위 없음 → deg 가정
  return normAngle(Number(t))
}

function normAngle(deg: number): number {
  let d = deg % 360
  if (d < 0) d += 360
  return d
}

// ---- OKLab → sRGB ----
interface OKLab {
  L: number
  a: number
  b: number
}

function oklabToSrgb({ L, a, b: bb }: OKLab): { r: number; g: number; b: number } {
  // OKLab → LMS'
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bb
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bb
  const s_ = L - 0.0894841775 * a - 1.291485548 * bb

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  // LMS' → linear sRGB
  const r_lin = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g_lin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const b_lin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  // linear → sRGB (0..1)
  const r = srgbEncode(clamp(r_lin, 0, 1))
  const g = srgbEncode(clamp(g_lin, 0, 1))
  const b = srgbEncode(clamp(b_lin, 0, 1))

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

function srgbEncode(x: number): number {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
}

// ---- Common utils ----
function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

// ---- RGB <-> HSL (HSL 보색용) ----
interface HSL {
  h: number
  s: number
  l: number
}
interface RGBf {
  r: number
  g: number
  b: number
}

function rgbToHsl(r255: number, g255: number, b255: number): HSL {
  const r = r255 / 255,
    g = g255 / 255,
    b = b255 / 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }
  return { h, s, l }
}

function hslToRgb(h: number, s: number, l: number): RGBf {
  const C = (1 - Math.abs(2 * l - 1)) * s
  const hp = h / 60
  const X = C * (1 - Math.abs((hp % 2) - 1))
  let r1 = 0,
    g1 = 0,
    b1 = 0

  if (0 <= hp && hp < 1) {
    r1 = C
    g1 = X
    b1 = 0
  } else if (1 <= hp && hp < 2) {
    r1 = X
    g1 = C
    b1 = 0
  } else if (2 <= hp && hp < 3) {
    r1 = 0
    g1 = C
    b1 = X
  } else if (3 <= hp && hp < 4) {
    r1 = 0
    g1 = X
    b1 = C
  } else if (4 <= hp && hp < 5) {
    r1 = X
    g1 = 0
    b1 = C
  } else {
    r1 = C
    g1 = 0
    b1 = X
  }

  const m = l - C / 2
  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255
  }
}
