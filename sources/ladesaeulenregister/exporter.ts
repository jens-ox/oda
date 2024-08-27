import axios from 'axios'
import type { Stecker } from './types'
import { germanDateToString } from '@/utils/germanDateToString'
import { Exporter } from '@/types'
import { parseCsv } from '@/utils/csv'
import { LadesaeuleSchema } from '@/schemas/bna'
import { validate } from '@/utils/validate'

const parseCoordinate = (entry: string) => parseFloat(entry.replace(',', '.'))

const createStecker = (typ: string, kW: string): Stecker => {
  const parsedKW = kW !== '' ? parseInt(kW) : undefined
  return {
    steckertypen: typ,
    kW: typeof parsedKW === 'undefined' || isNaN(parsedKW) ? undefined : parsedKW
  }
}

export const LadesaeulenExporter: Exporter = async () => {
  const { data: rawData } = await axios.get(
    'https://data.bundesnetzagentur.de/Bundesnetzagentur/SharedDocs/Downloads/DE/Sachgebiete/Energie/Unternehmen_Institutionen/E_Mobilitaet/ladesaeulenregister.csv',
    { insecureHTTPParser: true }
  )

  const cleanedData = rawData.split('\n').slice(11, -1).join('\n')

  const parsedData = await parseCsv<string[]>(cleanedData)

  const baseData = parsedData
    .map((e) => ({
      type: 'Feature',
      properties: {
        adresse: {
          street: e[1],
          houseNo: e[2],
          plz: e[4],
          city: e[5]
        },
        adresszusatz: e[3] !== '' ? e[3] : undefined,
        betreiber: e[0],
        datumInbetriebnahme: germanDateToString(e[10]) ?? '',
        anschlussLeistung: e[11] !== '' ? parseInt(e[11]) : '',
        anzahlLadepunkte: e[13] !== '' ? parseInt(e[13]) : '',
        stecker: [
          createStecker(e[14], e[15]),
          createStecker(e[17], e[18]),
          createStecker(e[20], e[21]),
          createStecker(e[23], e[24])
        ].filter((s) => s.steckertypen !== '')
      },
      geometry: {
        type: 'Point',
        coordinates: [parseCoordinate(e[9]), parseCoordinate(e[8])]
      }
    }))
    // filter out dead lines
    .filter((e) => e.properties.anzahlLadepunkte !== '')

  // filter out invalid entries
  const validationResult = validate(LadesaeuleSchema, baseData)

  if (validationResult.invalid.length > 0) {
    console.warn('invalid entries:')
    console.warn(JSON.stringify(validationResult.invalid, null, 2))
  }

  // sort results
  const sorted = validationResult.valid.sort(
    (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
  )

  const geojson = {
    type: 'FeatureCollection',
    features: sorted
  }

  return [
    {
      targetFile: 'main.json',
      data: geojson
    }
  ]
}
