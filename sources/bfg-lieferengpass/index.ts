import { Source } from '@/types'

export const Lieferengpass: Source = {
  id: 'bfg-lieferengpass',
  name: 'Lieferengpassmeldungen',
  description: 'Lieferengpassmeldungen pharmazeutischer Unternehmen',
  sourceLink:
    'https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml',
  sourceName: 'Bundesministerium für Gesundheit',
  targets: {
    'main.json': 'bfg-lieferengpass'
  }
}
