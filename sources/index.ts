import { ExporterMap, Source } from '../types'
import { BafinExporter, BafinStimmrechte } from './bafin-stimmrechte'
import { ArzneiEngpassExporter, Lieferengpass } from './bfg-lieferengpass'
import { Gemeindeverzeichnis, GVExporter } from './destatis-gemeindeverzeichnis'

export const sources: Array<Source> = [BafinStimmrechte, Lieferengpass, Gemeindeverzeichnis]

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
