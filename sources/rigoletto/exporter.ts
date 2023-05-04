import axios from 'axios'
import { parse } from 'papaparse'
import { rigolettoObjectSchema, RigolettoType } from './schema'
import { validate } from '@/utils/validate'
import { Exporter } from '@/types'

export const RigolettoExporter: Exporter = async () => {
  const { data: rawData } = await axios.get(
    'https://webrigoletto.uba.de/Rigoletto/Home/GetClassificationFile/Export_Tabelle'
  )

  const parsedData = parse<RigolettoType>(rawData, { delimiter: '|', header: true }).data

  const data = validate<RigolettoType>(rigolettoObjectSchema, parsedData)

  const sortedData = data.sort((a, b) => b.Kennnummer - a.Kennnummer)

  return [
    {
      targetFile: 'main.json',
      data: sortedData
    }
  ]
}
