import { z } from 'zod'
import { dateString, maybeEmptyString } from '../../utils/zod'

export const rigolettoObjectSchema = z.object({
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

export const rigolettoSchema = z.array(rigolettoObjectSchema)

export type RigolettoType = z.infer<typeof rigolettoObjectSchema>
