import axios from 'axios'
import { parse } from 'papaparse'
import { RigolettoEntry } from './types'
import { Exporter } from '@/types'

export const RigolettoExporter: Exporter<Array<RigolettoEntry>> = async () => {
  const { data: rawData } = await axios.get(
    'https://webrigoletto.uba.de/Rigoletto/Home/GetClassificationFile/Export_Tabelle'
  )

  const data = parse<RigolettoEntry>(rawData, { delimiter: '|', header: true }).data

  return [
    {
      targetFile: 'main.json',
      data
    }
  ]
}
