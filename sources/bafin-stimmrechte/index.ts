import { Source } from '../../types'
export { BafinExporter } from './exporter'

export const BafinStimmrechte: Source = {
  id: 'bafin-stimmrechte',
  name: 'Stimmrechte BaFin',
  description: 'Bedeutende Stimmrechtsanteile',
  sourceLink: 'https://portal.mvp.bafin.de/database/AnteileInfo/',
  sourceName: 'Bundesanstalt für Finanzdienstleistungsaufsicht'
}
