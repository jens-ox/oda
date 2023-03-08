import axios from 'axios'
import { parse } from 'papaparse'
import { rigolettoObjectSchema, RigolettoType } from './schema'
import { validate } from '@/utils/validate'
import { Exporter } from '@/types'

export const RigolettoExporter: Exporter<Array<RigolettoType>> = async () => {
  const { data: rawData } = await axios.get(
    'https://webrigoletto.uba.de/Rigoletto/Home/GetClassificationFile/Export_Tabelle'
  )

  const parsedData = parse<RigolettoType>(rawData, { delimiter: '|', header: true }).data

  const data = validate(rigolettoObjectSchema, parsedData)

  return [
    {
      targetFile: 'main.json',
      data
    }
  ]
}
