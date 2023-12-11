import { krankenhausSchema } from './schema'
import { Source } from '@/types'

export const Krankenkassen: Source = {
  id: 'krankenkassen',
  name: 'Krankenkassenliste',
  description: 'Krankenkassenliste des Spitzenverbands GKV',
  sourceName: 'GKV Spitzenverband',
  sourceLink: 'https://www.gkv-spitzenverband.de/krankenkassenliste.pdf',
  targets: {
    'main.json': krankenhausSchema
  }
}
