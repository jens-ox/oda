/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './sources/**/*.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-garamond)', ...defaultTheme.fontFamily.serif]
      }
    }
  }
}
