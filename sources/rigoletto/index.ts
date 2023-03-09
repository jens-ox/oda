import { Source } from '../../types'
import { rigolettoSchema } from './schema'

export const Rigoletto: Source = {
  id: 'rigoletto',
  name: 'Rigoletto',
  description: 'Datenbank wassergefährdende Stoffe',
  sourceName: 'Umweltbundesamt',
  sourceLink: 'https://webrigoletto.uba.de/Rigoletto/',
  targets: {
    'main.json': rigolettoSchema
  }
}
