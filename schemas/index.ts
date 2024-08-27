import { bafinSchema } from './bafin'
import { bfgSchema } from './bfg'
import { LadesaeulenSchema } from './bna'
import { DestatisSchema } from './destatis'
import { krankenkassenSchema } from './gkv'
import { RigolettoSchema } from './uba'

export const schemas = {
  'bafin-stimmrechte': bafinSchema,
  'bfg-lieferengpass': bfgSchema,
  'destatis-gemeindeverzeichnis': DestatisSchema,
  'bna-ladesaeulen': LadesaeulenSchema,
  'uba-rigoletto': RigolettoSchema,
  'gkv-krankenkassen': krankenkassenSchema
}
