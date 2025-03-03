import { bafinSchema } from './bafin'
import { bfgSchema } from './bfg'
import { LadesaeulenSchema } from './bna'
import { DestatisSchema } from './destatis'
import { krankenkassenSchema } from './gkv'
import { RadabstellanlagenSchema } from './radparken'
import { RigolettoSchema } from './uba'
import { WahlenSchema } from './wahlen'

export const schemas = {
  'bafin-stimmrechte': bafinSchema,
  'bfg-lieferengpass': bfgSchema,
  'destatis-gemeindeverzeichnis': DestatisSchema,
  'bna-ladesaeulen': LadesaeulenSchema,
  'uba-rigoletto': RigolettoSchema,
  'gkv-krankenkassen': krankenkassenSchema,
  radabstellanlagen: RadabstellanlagenSchema,
  wahlen: WahlenSchema
}
