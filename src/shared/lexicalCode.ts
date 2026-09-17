const LEXICAL_CODE_PATTERN = /^([HG])(\d*)([A-Za-z])?$/i

export const normalizeLexicalCode = (raw: string): string => {
  const trimmed = raw.trim()
  if (!trimmed) return ''

  const match = trimmed.match(LEXICAL_CODE_PATTERN)
  if (!match) return trimmed

  const [, prefix, digits, suffix] = match
  return `${prefix.toUpperCase()}${digits}${suffix ? suffix.toLowerCase() : ''}`
}
