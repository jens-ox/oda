import { Page } from 'playwright'
import { Exporter } from '@/types'
import { getBrowser } from '@/utils/playwright'
import { Krankenkasse, krankenkassenSchema } from '@/schemas/gkv'

const getLink = (pageCounter: number) =>
  `https://gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp?pageNo=${pageCounter}`

const extractPage = async (page: Page): Promise<Krankenkasse[]> => {
  const rows = await page.locator('tbody > tr').all()
  return Promise.all(
    rows.map(async (r) => {
      const name = (await r.locator('th').textContent()) as string
      const zusatzbeitrag = (await r.locator('td').first().textContent()) as string
      const openedIn = (await r.locator('td').last().textContent()) as string

      const zusatzbeitragValue = parseFloat(zusatzbeitrag.replace(' %', '').replace(',', '.'))

      return {
        name: name.trim(),
        zusatzbeitrag: isNaN(zusatzbeitragValue) ? null : zusatzbeitragValue,
        openedIn: openedIn.trim().split(', ')
      }
    })
  )
}

export const KrankenkassenExporter: Exporter = async () => {
  const browser = await getBrowser()
  const page = await browser.newPage()
  let counter = 1

  await page.goto(getLink(counter), {
    waitUntil: 'domcontentloaded'
  })

  // get correct total amount
  const total = (await page.locator('.results').first().textContent())?.split(' ')[0]
  if (!total) throw new Error('could not extract total count')
  const totalCount = parseInt(total)
  if (isNaN(totalCount)) throw new Error('could not parse total count')
  console.log('total: ', total)

  const results: Krankenkasse[] = []
  let previous: Krankenkasse[] = []
  while (true) {
    const result = await extractPage(page)

    // stop if no more changes are coming in
    if (JSON.stringify(result) === JSON.stringify(previous)) {
      await browser.close()
      break
    }

    // persist and increment
    results.push(...result)
    previous = result
    counter += 1

    await page.goto(getLink(counter), {
      waitUntil: 'domcontentloaded'
    })
  }

  const validationResult = krankenkassenSchema.safeParse(results)

  if (!validationResult.success) {
    console.error(JSON.stringify(validationResult.error, null, 2))
    throw new Error('error validating data')
  }

  if (validationResult.data.length !== totalCount) {
    throw new Error(
      `wrong entry count! Expected ${totalCount}, got ${validationResult.data.length}`
    )
  }

  return [
    {
      targetFile: 'main.json',
      data: validationResult.data
    }
  ]
}
