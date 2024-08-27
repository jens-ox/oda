import axios from 'axios'
import { RigolettoSchema, RigolettoType } from '@/schemas/uba'
import { Exporter } from '@/types'
import { parseCsv } from '@/utils/csv'

export const RigolettoExporter: Exporter = async () => {
  const { data: rawData } = await axios.get(
    'https://webrigoletto.uba.de/Rigoletto/Home/GetClassificationFile/Export_Tabelle'
  )

  const parsedData = await parseCsv<RigolettoType>(rawData, { delimiter: '|', hasHeader: true })

  const validationResult = RigolettoSchema.safeParse(parsedData)

  if (!validationResult.success) {
    console.error(JSON.stringify(validationResult.error, null, 2))
    throw new Error('error validating data')
  }

  const sortedData = validationResult.data.sort((a, b) => b.Kennnummer - a.Kennnummer)

  return [
    {
      targetFile: 'main.json',
      data: sortedData
    }
  ]
}
