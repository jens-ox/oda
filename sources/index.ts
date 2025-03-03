import { BafinStimmrechte } from './bafin-stimmrechte'
import { Lieferengpass } from './bfg-lieferengpass'
import { Gemeindeverzeichnis } from './destatis-gemeindeverzeichnis'
import { Krankenkassen } from './krankenkassen'
import { Ladesaeulen } from './ladesaeulenregister'
import { Rigoletto } from './rigoletto'
import { Source } from '@/types'
import { Wahlen } from './wahlen'

export const sources: Array<Source> = [
  BafinStimmrechte,
  Lieferengpass,
  Gemeindeverzeichnis,
  Ladesaeulen,
  Rigoletto,
  Krankenkassen,
  Wahlen
]
