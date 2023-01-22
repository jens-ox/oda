import { Source } from '../../types'
import { ArzneiEngpassExporter } from './exporter'
import { ArzneiEngpassResult } from './types'

export const Lieferengpass: Source<Array<ArzneiEngpassResult>> = {
  id: 'bfg-lieferengpass',
  name: 'Lieferengpassmeldungen',
  description: 'Lieferenpassmeldungen pharmazeutischer Unternehmen',
  sourceLink: 'https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml',
  sourceName: 'Bundesministerium für Gesundheit',
  exporter: ArzneiEngpassExporter
}
