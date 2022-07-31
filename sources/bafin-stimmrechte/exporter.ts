import axios from 'axios'
import Papa from 'papaparse'
import { Exporter } from '../../types/exporter'
import germanDateToString from '../../utils/germanDateToString'
import { BafinResult } from './types'

const BafinExporter: Exporter<Array<BafinResult>> = async () => {
  const { data } = await axios.get(
    'https://portal.mvp.bafin.de/database/AnteileInfo/aktiengesellschaft.do?d-3611442-e=1&cmd=zeigeGesamtExport&6578706f7274=1'
  )
  const stuff = Papa.parse<Array<string>>(data).data.map((e) => {
    return {
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
    }
  })
  return stuff
}

export default BafinExporter
