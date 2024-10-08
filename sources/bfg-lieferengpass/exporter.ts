import { bfgSchema } from '@/schemas/bfg'
import { parseOptionalString, parseStringArray } from '@/utils/format'
import { germanDateToString } from '@/utils/germanDateToString'
import streamToString from '@/utils/streamToString'
import { Exporter } from '@/types'
import { getBrowser } from '@/utils/playwright'
import { parseCsv } from '@/utils/csv'

export const ArzneiEngpassExporter: Exporter = async () => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  await page.goto(
    'https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml'
  )

  // select everything
  await Promise.all([
    page.selectOption('#meldungenForm\\:le_table-nb__xc_c', 'all'),
    page.waitForResponse((resp) => resp.url().includes('/meldungen.xhtml') && resp.status() === 200)
  ])

  await page.waitForTimeout(2000)

  // click download CSV button
  const [download] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent('download'),
    // Triggers the download.
    page.locator('text=Als CSV Speichern').click()
  ])

  const downloadStream = await download.createReadStream()

  if (downloadStream === null) {
    throw new Error('could not set up download stream')
  }

  const data = await streamToString(downloadStream, 'latin1')

  await browser.close()

  // parse downloaded CSV
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- no need to check this
  const parsedCsv = await parseCsv<any>(data, { hasHeader: true })

  const cleanedData = parsedCsv.map((e) => ({
    pzn: parseStringArray(e.PZN),
    enr: parseStringArray(e.ENR),
    meldungsart: e.Meldungsart,
    datumBeginn: germanDateToString(e.Beginn),
    datumEnde: germanDateToString(e.Ende),
    datumLetzteMeldung: germanDateToString(e['Datum der letzten Meldung']),
    grundArt: e['Art des Grundes'],
    bezeichnung: e.Arzneimittlbezeichnung,
    atcCode: e['Atc Code'] as string,
    wirkstoffe: e.Wirkstoffe,
    krankenhausrelevant: e.Krankenhausrelevant === 'ja',
    zulassungsinhaber: e.Zulassungsinhaber,
    telefon: parseOptionalString(e.Telefon),
    mail: parseOptionalString(e['E-Mail']),
    grund: e.Grund,
    grundAnmerkung: parseOptionalString(e['Anm. zum Grund']),
    alternativPraeparat: parseOptionalString(e['Alternativpräparat']),
    datumErstmeldung: germanDateToString(e['Datum der Erstmeldung']),
    infoFachkreise: parseOptionalString(e['Info an Fachkreise'])
  }))

  // filter out dead fields
  const filteredData = cleanedData.filter((e) => e.pzn && e.pzn.length > 0)

  // sort by atc code
  const sortedData = filteredData.sort((a, b) => a.atcCode.localeCompare(b.atcCode))

  // validate against schema
  const validationResult = bfgSchema.safeParse(sortedData)

  if (!validationResult.success) {
    console.error(JSON.stringify(validationResult.error, null, 2))
    throw new Error('error validating data')
  }

  return [
    {
      data: validationResult.data,
      targetFile: 'main.json'
    }
  ]
}
