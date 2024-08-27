import axios from 'axios'
import { Exporter } from '@/types'
import { germanDateToString } from '@/utils/germanDateToString'
import { parseCsv } from '@/utils/csv'
import { bafinSchema } from '@/schemas/bafin'

export const BafinExporter: Exporter = async () => {
  const { data: rawData } = await axios.get(
    'https://portal.mvp.bafin.de/database/AnteileInfo/aktiengesellschaft.do?d-3611442-e=1&cmd=zeigeGesamtExport&6578706f7274=1',
    { insecureHTTPParser: true }
  )

  const parsedData = await parseCsv<string[]>(rawData)

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

  const validationResult = bafinSchema.safeParse(data)

  if (!validationResult.success) {
    console.error(JSON.stringify(validationResult.error, null, 2))
    throw new Error('error validating data')
  }

  return [
    {
      targetFile: 'main.json',
      data: validationResult.data
    }
  ]
}
