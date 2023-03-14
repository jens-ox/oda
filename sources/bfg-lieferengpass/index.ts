import { Source } from '../../types'
import { bfgSchema } from './schema'

export const Lieferengpass: Source = {
  id: 'bfg-lieferengpass',
  name: 'Lieferengpassmeldungen',
  description: 'Lieferenpassmeldungen pharmazeutischer Unternehmen',
  sourceLink: 'https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml',
  sourceName: 'Bundesministerium für Gesundheit',
  targets: {
    'main.json': bfgSchema
  }
}
