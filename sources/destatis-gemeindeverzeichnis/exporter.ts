import { Readable } from 'stream'
import playwright from 'playwright'
import unzip from 'unzip-stream'
import { Exporter } from '../../types'
import streamToString from '../../utils/streamToString'
import { parseLine } from './parseLine'
import { EntryType, Result } from './types'

const parseDownloadStream = async (downloadStream: Readable): Promise<string> =>
  new Promise((resolve) => {
    downloadStream.pipe(unzip.Parse()).on('entry', async (entry) => {
      if (entry.path.startsWith('GV100AD')) {
        const content = await streamToString(entry)
        resolve(content)
      } else {
        entry.autodrain()
      }
    })
  })

const parseRawDownload = (content: string) =>
  content
    .split('\n')
    .map(parseLine)
    .reduce((acc, e) => {
      if (e === null) return acc
      const entryType: EntryType = e.type

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[entryType] = [...(acc[entryType] ?? []), e]

      return acc
    }, {} as Result)

export const GVExporter: Exporter = async () => {
  const browser = await playwright.chromium.launch({ headless: typeof process.env.CI !== 'undefined' })
  const page = await browser.newPage()

  await page.goto('https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html')

  // close cookie banner
  await page.locator('button >> text=Akzeptieren').click()

  // open regionale gliederung
  await page.locator('button >> text=Regionale Gliederung').first().click()

  // click first download link, which is most recent visible
  await page.locator('.RichTextIntLink.Publication.FTzip:visible').first().click()

  // on new page, click download zip
  const [download] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent('download'),
    // Triggers the download.
    page.locator('.downloadLink').click()
  ])

  const downloadStream = await download.createReadStream()
  downloadStream?.on('end', () => browser.close())

  if (downloadStream === null) {
    throw new Error('could not set up download stream')
  }

  const content = await parseDownloadStream(downloadStream)

  return [
    {
      data: parseRawDownload(content),
      targetFile: 'main.json'
    }
  ]
}
