import { z } from 'zod'
import { dateString, maybeEmptyString } from '../../utils/zod'

export const bfgObjectSchema = z.object({
  pzn: z.array(z.coerce.number()),
  enr: z.array(z.coerce.number()),
  meldungsart: z.enum(['Änderungsmeldung', 'Erstmeldung']),
  datumBeginn: dateString,
  datumEnde: dateString,
  datumErstmeldung: dateString,
  datumLetzteMeldung: dateString,
  grund: z.string(),
  grundArt: z.enum(['Produktionsproblem', 'Sonstige']),
  grundAnmerkung: maybeEmptyString,
  bezeichnung: z.string(),
  atcCode: z.string(),
  wirkstoffe: z.string(),
  krankenhausrelevant: z.boolean(),
  zulassungsinhaber: z.string(),
  telefon: maybeEmptyString,
  mail: z
    .string()
    .email()
    .optional()
    .transform((s) => (['', '-', undefined].includes(s) ? undefined : s)),
  infoFachkreise: z.enum(['Ja', 'Nein', 'Vorgesehen']).optional(),
  alternativPraeparat: maybeEmptyString
})

export const bfgSchema = z.array(bfgObjectSchema)

export type BfgObjectType = z.infer<typeof bfgObjectSchema>
