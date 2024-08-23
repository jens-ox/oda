import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import { radixThemePreset } from 'radix-themes-tw'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './visualizations/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  presets: [radixThemePreset],
  plugins: [typography],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans]
      }
    }
  }
} satisfies Config
