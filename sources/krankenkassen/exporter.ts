import { Page } from 'playwright'
import { Exporter } from '@/types'
import { getBrowser } from '@/utils/playwright'

const extractPage = async (page: Page) => {
  const rows = await page.locator('tbody > tr').all()
  return Promise.all(
    rows.map(async (r) => {
      const name = (await r.locator('th').textContent()) as string
      const zusatzbeitrag = (await r.locator('td').first().textContent()) as string
      const openedIn = (await r.locator('td').last().textContent()) as string

      return {
        name: name.trim(),
        zusatzbeitrag: parseFloat(zusatzbeitrag.replace(' %', '').replace(',', '.')),
        openedIn: openedIn.trim().split(', ')
      }
    })
  )
}

export const KrankenkassenExporter: Exporter = async () => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  await page.goto('https://gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp', {
    waitUntil: 'domcontentloaded'
  })

  const results = []
  while (true) {
    const result = await extractPage(page)
    results.push(...result)

    // go to next page if possible
    const next = await page.locator('a.next').count()
    if (next > 0) {
      await page.locator('a.next').first().click()
    } else {
      console.log(results.length)
      browser.close()
      break
    }
  }

  return [
    {
      targetFile: 'main.json',
      data: results
    }
  ]
}
