import { Source } from '@/types'

export const Wahlen: Source = {
  id: 'wahlen',
  name: 'Wahlergebnisse',
  description: 'Aggregierte Wahlergebnisse auf Wahlbezirks-Ebene',
  sourceName: 'Votemanager',
  sourceLink: 'https://wahlen.votemanager.de/',
  targets: {
    'main.json': 'wahlen'
  }
}
