import axios from 'axios'
import { parse } from 'papaparse'
import { validate } from '../../utils/validate'
import { Exporter } from '../../types'
import { rigolettoObjectSchema, RigolettoType } from './schema'

export const RigolettoExporter: Exporter = async () => {
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