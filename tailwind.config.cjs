const range = require('lodash/range')

const pxToRem = (px, base = 16) => `${px / base}rem`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/src/**/*.{ts,tsx}'],
  safelist: [
    ...range(1, 24 + 1).map((el) => `pl-${el}pxr`),
    ...range(1, 60 + 1).map((el) => `text-[${el}px]`),
    ...range(1, 12 + 1).map((el) => `grid-cols-${el}`),
    ...range(1, 2 + 1).map((el) => `row-start-${el}`),
    ...range(1, 12 + 1).map((el) => `col-start-${el}`),
    ...range(1, 2 + 1).map((el) => `row-end-${el}`),
    ...range(1, 12 + 1).map((el) => `col-end-${el}`)
  ],
  theme: {
    extend: {
      spacing: {
        ...range(1, 1440 + 1).reduce((acc, px) => {
          acc[`${px}pxr`] = pxToRem(px)
          return acc
        }, {})
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
}
