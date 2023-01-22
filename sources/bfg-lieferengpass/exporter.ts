import Papa from 'papaparse'
import playwright from 'playwright'
import { Exporter } from '../../types'
import germanDateToString from '../../utils/germanDateToString'
import streamToString from '../../utils/streamToString'
import { ArzneiEngpassResult } from './types'

export const ArzneiEngpassExporter: Exporter<Array<ArzneiEngpassResult>> = async () => {
  const browser = await playwright.chromium.launch({ headless: typeof process.env.CI !== 'undefined' })
  const page = await browser.newPage()

  await page.goto('https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml')

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
  const parsedCsv = Papa.parse<any>(data, { header: true }).data
  const cleanedData = parsedCsv.map((e) => ({
    pzn: e.PZN.split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s !== '' && s !== '*'),
    enr: e.ENR,
    meldungsart: e.Meldungsart,
    datumBeginn: germanDateToString(e.Beginn),
    datumEnde: germanDateToString(e.Ende),
    datumLetzteMeldung: germanDateToString(e['Datum der letzten Meldung']),
    grundArt: e['Art des Grundes'],
    bezeichnung: e.Arzneimittlbezeichnung,
    atcCode: e['Atc Code'],
    wirkstoffe: e.Wirkstoffe,
    krankenhausrelevant: e.Krankenhausrelevant === 'ja',
    zulassungsinhaber: e.Zulassungsinhaber,
    telefon: e.Telefon,
    mail: e['E-Mail'],
    grund: e.Grund,
    grundAnmerkung: e['Anm. zum Grund'] !== 'N/A' ? e['Anm. zum Grund'] : undefined,
    alternativPraeparat: e['Alternativpräparat'] !== 'N/A' ? e['Alternativpräparat'] : undefined,
    datumErstmeldung: germanDateToString(e['Datum der Erstmeldung']),
    infoFachkreise: e['Info an Fachkreise']
  }))

  return [
    {
      data: cleanedData,
      targetFile: 'main.json'
    }
  ]
}
