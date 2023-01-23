import { ExporterMap } from '../types'
import { BafinStimmrechte } from './bafin-stimmrechte'
import { BafinExporter } from './bafin-stimmrechte/exporter'
import { Lieferengpass } from './bfg-lieferengpass'
import { ArzneiEngpassExporter } from './bfg-lieferengpass/exporter'
import { Gemeindeverzeichnis } from './destatis-gemeindeverzeichnis'
import { GVExporter } from './destatis-gemeindeverzeichnis/exporter'

export const exporters: Array<ExporterMap> = [
  {
    id: BafinStimmrechte.id,
    exporter: BafinExporter
  },
  {
    id: Lieferengpass.id,
    exporter: ArzneiEngpassExporter
  },
  {
    id: Gemeindeverzeichnis.id,
    exporter: GVExporter
  }
]
