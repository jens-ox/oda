import { Source } from '../types'
import { BafinStimmrechte } from './bafin-stimmrechte'
import { Lieferengpass } from './bfg-lieferengpass'
import { Gemeindeverzeichnis } from './destatis-gemeindeverzeichnis'

export const sources: Array<Source> = [BafinStimmrechte, Lieferengpass, Gemeindeverzeichnis]
