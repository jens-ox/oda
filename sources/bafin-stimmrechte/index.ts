import { bafinSchema } from './schema'
import { Source } from '@/types'

export const BafinStimmrechte: Source = {
  id: 'bafin-stimmrechte',
  name: 'Stimmrechte BaFin',
  description: 'Bedeutende Stimmrechtsanteile',
  sourceLink: 'https://portal.mvp.bafin.de/database/AnteileInfo/',
  sourceName: 'Bundesanstalt für Finanzdienstleistungsaufsicht',
  targets: {
    'main.json': bafinSchema
  }
}
