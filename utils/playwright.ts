import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

export const getBrowser = async () => {
  chromium.use(stealth())
  const browser = await chromium.launch({ headless: typeof process.env.CI !== 'undefined' })
  return browser
}
