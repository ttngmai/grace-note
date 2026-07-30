export function formatNumberWithComma(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) return ''

  return num.toLocaleString('en-US')
}
