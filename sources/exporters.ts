import { BafinStimmrechte } from './bafin-stimmrechte'
import { BafinExporter } from './bafin-stimmrechte/exporter'
import { Lieferengpass } from './bfg-lieferengpass'
import { ArzneiEngpassExporter } from './bfg-lieferengpass/exporter'
import { Gemeindeverzeichnis } from './destatis-gemeindeverzeichnis'
import { GVExporter } from './destatis-gemeindeverzeichnis/exporter'
import { Krankenkassen } from './krankenkassen'
import { KrankenkassenExporter } from './krankenkassen/exporter'
import { Ladesaeulen } from './ladesaeulenregister'
import { LadesaeulenExporter } from './ladesaeulenregister/exporter'
import { Rigoletto } from './rigoletto'
import { RigolettoExporter } from './rigoletto/exporter'
import { ExporterMap } from '@/types'

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
  },
  {
    id: Ladesaeulen.id,
    exporter: LadesaeulenExporter
  },
  {
    id: Rigoletto.id,
    exporter: RigolettoExporter
  },
  {
    id: Krankenkassen.id,
    exporter: KrankenkassenExporter
  }
]
