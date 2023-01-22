import { Source } from '../../types'
import { GVExporter } from './exporter'
import { Result } from './types'

export const Gemeindeverzeichnis: Source<Result> = {
  id: 'destatis-gemeindeverzeichnis',
  name: 'Gemeindeverzeichnis',
  description: 'Gemeindeverzeichnis des Statistischen Bundesamtes',
  sourceName: 'Statistisches Bundesamt',
  sourceLink: 'https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html',
  exporter: GVExporter
}
