import { Source } from '../../types'
import { bafinSchema } from './schema'

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
