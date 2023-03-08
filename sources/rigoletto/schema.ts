import { z } from 'zod'

const maybeEmptyString = z
  .string()
  .optional()
  .transform((s) => (s === '' ? undefined : s))

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
  Veröffentlichungsdatum: z.string().regex(/[0-9]{4}-1[0-2]|[1-9]-3[01]|[12][0-9]|[1-9]/),
  WGK: z.string(),
  Fussnoten: maybeEmptyString
})

export const rigolettoSchema = z.array(rigolettoObjectSchema)

export type RigolettoType = z.infer<typeof rigolettoObjectSchema>
