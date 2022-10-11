import { Exporter } from '../types/exporter'
import BafinExporter from './bafin-stimmrechte/exporter'
import ArzneiEngpassExporter from './bfg-lieferengpass/exporter'
import { GVExporter } from './destatis-gemeindeverzeichnis/exporter'

interface ExporterSource {
  id: string
  exporter: Exporter
}

const exporterSources: Array<ExporterSource> = [
  {
    id: 'bafin-stimmrechte',
    exporter: BafinExporter
  },
  {
    id: 'bfg-lieferengpass',
    exporter: ArzneiEngpassExporter
  },
  {
    id: 'destatis-gemeindeverzeichnis',
    exporter: GVExporter
  }
]

export default exporterSources
