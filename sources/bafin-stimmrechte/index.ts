import { Source } from '../../types'
import { BafinExporter } from './exporter'
import { BafinResult } from './types'

export const BafinStimmrechte: Source<Array<BafinResult>> = {
  id: 'bafin-stimmrechte',
  name: 'Stimmrechte BaFin',
  description: 'Bedeutende Stimmrechtsanteile',
  sourceLink: 'https://portal.mvp.bafin.de/database/AnteileInfo/',
  sourceName: 'Bundesanstalt für Finanzdienstleistungsaufsicht',
  exporter: BafinExporter
}
