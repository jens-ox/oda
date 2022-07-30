import ArzneiEngpassExporter from './arznei-engpass'
import BafinExporter from './bafin'

const exporters = [
  {
    sourceId: 'bafin-stimmrechte',
    exporter: BafinExporter
  },
  {
    sourceId: 'bfg-lieferengpass',
    exporter: ArzneiEngpassExporter
  }
]

export default exporters
