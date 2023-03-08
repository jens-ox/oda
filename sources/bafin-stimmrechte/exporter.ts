import axios from 'axios'
import { parse } from 'papaparse'
import { Exporter } from '../../types'
import { germanDateToString } from '../../utils/germanDateToString'
import { validate } from '../../utils/validate'
import { bafinObjectSchema, BafinObjectType } from './schema'

export const BafinExporter: Exporter<Array<BafinObjectType>> = async () => {
  const { data: rawData } = await axios.get(
    'https://portal.mvp.bafin.de/database/AnteileInfo/aktiengesellschaft.do?d-3611442-e=1&cmd=zeigeGesamtExport&6578706f7274=1',
    { insecureHTTPParser: true }
  )

  const parsedData = parse<Array<string>>(rawData).data
  const data = parsedData.map((e) => ({
    veroeffentlichung: germanDateToString(e[9]),
    emittent: {
      name: e[0],
      sitz: e[1],
      land: e[2]
    },
    meldepflichtiger: {
      name: e[3],
      sitz: e[4],
      land: e[5]
    },
    stimmrechtsanteile: {
      gesamt: e[6] ? parseFloat(e[6].replace(',', '.')) : undefined,
      instrumente: e[7] ? parseFloat(e[7].replace(',', '.')) : undefined,
      summe: e[8] ? parseFloat(e[8].replace(',', '.')) : undefined
    }
  }))

  const validatedData = validate(bafinObjectSchema, data)
  return [
    {
      targetFile: 'main.json',
      data: validatedData
    }
  ]
}
