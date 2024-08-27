import { Source } from '@/types'

export const Gemeindeverzeichnis: Source = {
  id: 'destatis-gemeindeverzeichnis',
  name: 'Gemeindeverzeichnis',
  description: 'Gemeindeverzeichnis des Statistischen Bundesamtes',
  sourceName: 'Statistisches Bundesamt',
  sourceLink:
    'https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html',
  targets: {
    'main.json': 'destatis-gemeindeverzeichnis'
  }
}
