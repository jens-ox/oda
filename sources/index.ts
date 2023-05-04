import { BafinStimmrechte } from './bafin-stimmrechte'
import { Lieferengpass } from './bfg-lieferengpass'
import { Gemeindeverzeichnis } from './destatis-gemeindeverzeichnis'
import { Ladesaeulen } from './ladesaeulenregister'
import { Rigoletto } from './rigoletto'
import { Source } from '@/types'

export const sources: Array<Source> = [BafinStimmrechte, Lieferengpass, Gemeindeverzeichnis, Ladesaeulen, Rigoletto]
