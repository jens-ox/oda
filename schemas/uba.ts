import { z } from 'zod'
import { dateString, maybeEmptyString } from '@/utils/zod'

export const RigolettoObjectSchema = z.object({
  Kennnummer: z.coerce.number(),
  Einstufungsbezeichnung: z.string(),
  EinstufungsbezeichnungEnglisch: maybeEmptyString,
  Stoffname: z.string(),
  Gruppenname: maybeEmptyString,
  CAS_Nr: maybeEmptyString,
  EG_Nr: maybeEmptyString,
  MFaktor: maybeEmptyString,
  Synonym: maybeEmptyString,
  Veröffentlichungsdatum: dateString,
  WGK: z.string(),
  Fussnoten: maybeEmptyString
})

export const RigolettoSchema = z
  .array(RigolettoObjectSchema)
  .describe('Liste wassergefährdender Stoffe.')

export type RigolettoType = z.infer<typeof RigolettoObjectSchema>
