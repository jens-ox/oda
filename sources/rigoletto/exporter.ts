import axios from 'axios'
import { parse } from 'papaparse'
import { z } from 'zod'
import { validate } from '../../utils/validate'
import { rigolettoObjectSchema, RigolettoType } from './schema'
import { Exporter } from '@/types'

export const RigolettoExporter: Exporter<Array<RigolettoType>> = async () => {
  const { data: rawData } = await axios.get(
    'https://webrigoletto.uba.de/Rigoletto/Home/GetClassificationFile/Export_Tabelle'
  )

  const parsedData = parse<z.infer<typeof rigolettoObjectSchema>>(rawData, { delimiter: '|', header: true }).data

  const data = validate(rigolettoObjectSchema, parsedData)

  return [
    {
      targetFile: 'main.json',
      data
    }
  ]
}
