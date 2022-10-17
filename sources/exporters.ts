import BafinExporter from './bafin-stimmrechte/exporter'
import ArzneiEngpassExporter from './bfg-lieferengpass/exporter'
import { GVExporter } from './destatis-gemeindeverzeichnis/exporter'

const exporterSources = [
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
