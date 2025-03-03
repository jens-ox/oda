/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { WahlSchema, WahlType } from '@/schemas/wahlen'
import { Exporter } from '@/types'
import { parseCsv } from '@/utils/csv'
import { formatISO, parse } from 'date-fns'
import { access, constants, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { z } from 'zod'

/**
 * Hinweise zu den Daten:
 * - manche Wahlen liegen in der Zukunft, weswegen termine.json aus guten Gründen nicht existiert
 * - in einigen Fällen gibt es Daten, aber keine open_data.json - das müsste manuell repariert werden
 * - in einigen Fällen ist im Feld AGS der ARS des Gemeindeverbandes hinterlegt
 * - in einigen Fällen wird eine Version der Anwendung benutzt, die keine API-Calls macht. In diesen Fällen gibt es schon keine termine.json. Hier müsste manuell nachgeschaut werden.
 * - Encoding-Probleme https://wahlen.landkreis-boerde.de/20240609/15083040/daten/opendata/opendata-wahllokale.csv
 * - "feld": "D12 / F12" in open_data.json macht automatisches Verarbeiten richtig eklig
 * - manche Instanzen benutzen daten/opendata als basepath, manche praesentation
 * - was ist bitte feld "D\u003Cpos\u003E"??
 */

const SKIP_ENTRY = [
  'https://okvote.osrz-akdb.de/OK.VOTE_SW/097715701/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/092785256/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OB/091905174/api/termine.json', // Seite komplett kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095725512/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_SW/097785758/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OB/091895166/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/096795645/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094725417/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/096775622/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094725416/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_SW/097715704/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095715507/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095755521/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_SW/097785766/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094755430/api/termine.json.', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/096795647/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OB/091765116/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/096795646/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094715407/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094755430/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OB/091815138/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095715538/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OB/091815144/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095715508/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_SW/097805745/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_MF/095715504/api/termine.json', // Open Data-Seite kaputt
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/094725415/api/termine.json', // Open Data-Seite kaputt
  'https://www.aschheim.de/wahlen/2021/09184112/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/09673141/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/096735634/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/096735635/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/09673114/api/termine.json', // Seite offline
  'https://wahlen.rhoen-grabfeld.de/okvote/09673116/api/termine.json', // Seite offline
  'https://wahlen.rhoen-grabfeld.de/okvote/09673116/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/09673116/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/09673117/api/termine.json', // Seite offline
  'https://wahlen.rhoen-grabfeld.de/okvote/096735637/api/termine.json', // Seite offline
  'http://wahlen.rhoen-grabfeld.de/okvote/096735637/api/termine.json', // Seite offline
  'https://www.landkreis-eichstaett.de/wahlen/kow_20/09176000/api/termine.json', // Seite offline
  'https://wahlen-heidekreis.de/BEHKK2021/033585401/api/termine.json', // keine API-Calls
  'https://wahlen-heidekreis.de/BEHKK2021/03358002/api/termine.json', // keine API-Calls
  'https://wahlen-heidekreis.de/BEHKK2021/03358008/api/termine.json', // keine API-Calls
  'https://wahlen-heidekreis.de/BEHKK2021/03358023/api/termine.json', // keine API-Calls
  'https://wahlen-heidekreis.de/BEHKK2021/03358024/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-gap.de/Kommunal20/Wallgau/Wahl-2020-03-15/09180136/html5/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/093755337/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375117/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375118/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375119/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/093755335/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375213/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/093755336/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375209/api/termine.json', // keine API-Calls
  'https://wahlen.landkreis-regensburg.de/kommunal2020/09375208/api/termine.json', // keine API-Calls
  'https://wahlen.freyung-grafenau.de/wahlen/KW2020/09272000/api/termine.json', // keine API-Calls
  'https://www.forchheim.de/wahl/2020/09474126/api/termine.json', // keine API-Calls
  'https://wahlen.ostallgaeu.de/097775753/api/termine.json', // keine API-Calls
  'http://wahlen.ostallgaeu.de/097775753/api/termine.json', // keine API-Calls
  'https://votemanager.kdo.de/01058043/api/termine.json', // keine API-Calls
  'https://www.wahlen-in-mil.de/wahlergebnisse/096765626/api/termine.json', // keine API-Calls
  'https://www.fuerstenzell.de/wahlen/www.fuerstenzell.de/wahlen/09275122/api/termine.json', // keine API-Calls
  'https://wahlen2020.freibad-bogen.de/09278118/api/termine.json', // Domain offline
  'http://wahl.frammersbach.de/09677129/api/termine.json', // Seite offline
  'http://friedberg.ftp.citywerk.net/EXTERN/Wahlen/09771130/api/termine.json', // Seite offline
  'https://gemeinde-zandt.de/wahl-2020/09372177/api/termine.json', // Seite offline
  'https://wahlen.wolfsburg.de/praesentation/api/termine.json', // Seite offline
  'https://don-ris.de/wahl/09779131/api/termine.json' // Seite offline
]

const SKIP_OPEN_DATA = [
  'https://votemanager-da.ekom21cdn.de/2025-03-16/06439001/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240623/08118001/daten/opendata/open_data.json', // "nicht aufbereitet"
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09271111/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240929/08115001/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager.kdo.de/20241013/130755553/daten/opendata/open_data.json', // in der Zukunft
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09271113/daten/opendata/open_data.json', // in der Zukunft
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/test_2023_10_15/09672112/daten/opendata/open_data.json', // Daten fehlen!
  'https://okvote.osrz-akdb.de/OK.VOTE_OF/BTW21/09479166/daten/opendata/open_data.json', // Daten fehlen!
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20241013/08117012/daten/opendata/ open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_UF/2022_09_25/09672000/daten/opendata/open_data.json', // "nicht aufbereitet"
  'http://dv.wedel.de/voteman/Wahl-2022-05-08/01056050/daten/opendata/open_data.json', // "nicht aufbereitet"
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09276115/daten/opendata/open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09276118/daten/opendata/open_data.json', // Test-Daten
  'https://wahlen.ego-saar.de/vm_prod/prod/20220327/10045111/daten/opendata/open_data.json', // Seite offline
  'https://wahlen.ego-saar.de/vm_prod/prod/20220327/10042111/daten/opendata/open_data.json', // Seite offline
  'https://votemanager-gi.ekom21cdn.de/2024-10-06/06532003/daten/opendata/open_data.json', // in der Zukunft
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09274194/daten/opendata/open_data.json', // Test-Daten
  'https://wahlen.regioit.de/4/lr2025/145225102/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager-da.ekom21cdn.de/2024-11-10/06440005/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager.kdo.de/20241013/15089055/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20250330/08226010/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlen.regioit.de/4/lr2025/14522180/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlen.regioit.de/4/lr2025/14522150/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20241013/08317029/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240915/08225024/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager.kdo.de/20241027/15091391/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager-gi.ekom21cdn.de/2024-10-06/06534022/daten/opendata/open_data.json', // in der Zukunft
  'https://votemanager-da.ekom21cdn.de/2024-10-27/06440025/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20241020/08119091/daten/opendata/open_data.json', // in der Zukunft
  'https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20241013/08117012/daten/opendata/open_data.json', // in der Zukunft
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09276121/daten/opendata/open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09276122/daten/opendata/open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09271153/daten/opendata/open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09278197/daten/opendata/open_data.json', // Test-Daten
  'https://okvote.osrz-akdb.de/OK.VOTE_NB/TestBTW/09279000/daten/opendata/open_data.json' // Test-Daten
]

const fileExists = async (path: string) => {
  try {
    await access(path, constants.F_OK)
    return true
  } catch (_e) {
    return false
  }
}

const htmlDecode = (content: string) => {
  return content.trim().replace('<a href="', '').replace('</a>', '').split('" >')
}

const intOrZeroOrNull = (value: string) =>
  value === undefined ? null : value === '' ? 0 : parseInt(value)

const getEntryData = async (url: string): Promise<any> => {
  try {
    const request = await fetch(url)

    if (request.status !== 200) {
      return null
    }

    try {
      const result = await request.json()
      return result
    } catch (_e) {
      return null
    }
  } catch (_e) {
    return null
  }
}

const getOpenDataInfo = async (url: URL): Promise<any> => {
  const request = await fetch(url.toString())

  try {
    const openDataInfo = await request.json()
    return openDataInfo
  } catch (_e) {
    const secondTryRequest = await fetch(
      url.toString().replace('daten/opendata', 'api/praesentation')
    )

    try {
      const openDataInfo = await secondTryRequest.json()
      return openDataInfo
    } catch (_e) {
      return null
    }
  }
}

const getCsv = async (url: string): Promise<Array<Record<string, string>> | null> => {
  const csvRequest = await fetch(url)
  const csvContent = await csvRequest.text()
  let parsed
  try {
    parsed = await parseCsv<Record<string, string>>(csvContent, { hasHeader: true })
  } catch (_e) {
    return url.includes('praesentation')
      ? null
      : await getCsv(url.replace('daten/opendata', 'praesentation'))
  }

  return parsed
}

/**
 * https://votemanager.kdo.de/03451001/index.html
 * becomes
 * https://votemanager.kdo.de/03451001/api/termine.json
 */
const remapLink = (link: string): string => {
  if (link === ' http://stadt-gk.de/wahlen/Produktiv/05370012/index.html')
    return 'https://wahlen.geilenkirchen.de/Produktiv/05370012/api/termine.json'
  if (link === 'https://wahlen.bonn.de')
    return 'https://wahlen.bonn.de/wahlen/05314000/api/termine.json'
  if (link.includes('/index.html')) return link.replace('/index.html', '/api/termine.json')
  if (link === 'https://wahlen.digistadtdo.de/wahlergebnisse')
    return 'https://wahlen.digistadtdo.de/wahlergebnisse/05913000/api/termine.json'

  // exception for http://wahlen.gkd-re.net/05562004
  return `${link}/api/termine.json`
}

export const WahlenExporter: Exporter = async () => {
  const existingFiles = await glob('./temp/*.json')
  const rawRequest = await fetch('https://wahlen.votemanager.de/behoerden.json')
  let rawResult
  try {
    rawResult = await rawRequest.json()
  } catch (error) {
    console.error('error parsing json from: ', rawRequest.url)
    console.error(error)
    throw new Error('error parsing json')
  }
  const list = rawResult.data.map((e: string[]) => {
    const [link, nameCity] = htmlDecode(e[0])
    return {
      link: remapLink(link),
      nameCity,
      nameState: e[2]
    }
  })

  for (const entry of list) {
    const baseData = await getEntryData(entry.link)

    if (baseData === null) {
      if (SKIP_ENTRY.includes(entry.link)) {
        continue
      }
      console.error('error fetching base data from: ', entry.link)
      continue
    }

    console.log('processing: ', entry.link)

    // https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240609/08335001/praesentation/
    // https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240609/08335001/daten/opendata/open_data.json
    // https://wahlergebnisse.komm.one/lb/produktion/wahltermin-20240609/08335001/daten/opendata/Open-Data-08335001-Europawahl-2024-Wahlbezirk.csv?ts=1725653112372
    const baseUrl = new URL(baseData.termine[0].url, entry.link.replace('api/termine.json', ''))

    const openDataInfoUrl = new URL('../daten/opendata/open_data.json', baseUrl)

    const openDataInfo = await getOpenDataInfo(openDataInfoUrl)
    if (openDataInfo === null) {
      if (SKIP_OPEN_DATA.includes(openDataInfoUrl.toString())) {
        continue
      }
      console.error(
        'error fetching open data info from: ',
        openDataInfoUrl.toString(),
        'entry link',
        entry.link
      )
      continue
    }

    const csvs = openDataInfo.csvs
      .filter((csv: any) => csv.ebene === 'Wahlbezirk')
      .map((csv: any) => csv.url)

    for (const csv of csvs) {
      const jsonName = csv.replace('.csv', '.json')
      if (existingFiles.includes(`temp/${jsonName}`)) {
        continue
      }

      const csvUrl = new URL(csv, openDataInfoUrl).toString()
      console.log('parsing: ', csvUrl)

      const parsed = await getCsv(csvUrl)
      if (parsed === null) {
        console.error('error fetching csv from: ', csvUrl)
        continue
      }

      const electionName = parsed[0].wahl

      let fieldsUtf8 = openDataInfo.dateifelder.find(
        (fieldSet: any) => fieldSet.name === electionName
      )
      if (!fieldsUtf8) {
        fieldsUtf8 = openDataInfo.dateifelder.find(
          (fieldSet: any) => fieldSet.name === Buffer.from(electionName, 'latin1').toString('utf8')
        )
      }
      if (!fieldsUtf8) throw new Error(`could not find fields for ${electionName}`)

      /**
       * Bei Wahlen mit Erst- und Zweitstimme werden die Felder richtig widerlich dokumentiert
       */
      const fields = fieldsUtf8.parteien.flatMap((partei: any) => {
        if (partei.feld.includes('/')) {
          const [first, second] = partei.feld.split(' / ')
          return [
            {
              key: first,
              name: partei.wert
            },
            {
              key: second,
              name: partei.wert
            }
          ]
        }
        return [
          {
            key: partei.feld,
            name: partei.wert
          }
        ]
      })

      const result = parsed.map((row) => {
        return {
          sourceUrl: csvUrl,
          date: formatISO(parse(row.datum, 'dd.MM.yyyy', new Date()), { representation: 'date' }),
          name: electionName,
          districtId: row['gebiet-nr'],
          districtName: row['gebiet-name'],
          ags: row.ags,
          eligible: intOrZeroOrNull(row.A),
          total_votes: intOrZeroOrNull(row.B),
          total_valid: intOrZeroOrNull(row.D),
          total_invalid:
            row.C !== undefined
              ? intOrZeroOrNull(row.C)
              : row.C1 != undefined
                ? intOrZeroOrNull(row.C1)
                : 0,
          total_valid_second: intOrZeroOrNull(row.F),
          total_invalid_second: intOrZeroOrNull(row.E),
          votes: Object.entries(row)
            .filter(([key, value]) => /^D\d+$/.test(key) && value !== '')
            .map(([key, value]) => {
              const name = fields.find((field: any) => field.key === key)?.name

              if (!name) {
                console.error('could not find name for key: ', key)
              }
              return {
                name: name ?? 'freie Zeile',
                value: intOrZeroOrNull(value)
              }
            }),
          votes_second: Object.entries(row).some(([key]) => key === 'F1')
            ? Object.entries(row)
                .filter(([key, value]) => /^F\d+$/.test(key) && value !== '')
                .map(([key, value]) => {
                  return {
                    name: fields.find((field: any) => field.key === key)?.name,
                    value: intOrZeroOrNull(value)
                  }
                })
            : null
        }
      })

      const validationResult = z.array(WahlSchema).safeParse(result)
      if (!validationResult.success) {
        console.error('validation failed for: ', csvUrl.toString())
        console.error(JSON.stringify(validationResult.error))
        throw new Error('validation failed')
      }

      const exists = await fileExists(`./temp/${jsonName}`)
      if (exists) {
        throw new Error(`file already exists: ${jsonName}`)
      }

      await writeFile(`./temp/${jsonName}`, JSON.stringify(validationResult.data, null, 2))
    }
  }

  return [
    {
      targetFile: 'main.json',
      data: []
    }
  ]
}
