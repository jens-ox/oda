import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { dateString, maybeEmptyString } from '@/utils/zod'

export const bfgObjectSchema = z.object({
  pzn: extendApi(z.array(z.coerce.number()), { description: 'Pharma-Zentralnummer', example: '01300419' }),
  enr: extendApi(z.array(z.coerce.number()), {
    description: 'Eingangsnummer, auch Einreichungsnummer',
    example: '0245718'
  }),
  meldungsart: z.enum(['Änderungsmeldung', 'Erstmeldung']),
  datumBeginn: dateString,
  datumEnde: dateString,
  datumErstmeldung: dateString,
  datumLetzteMeldung: dateString,
  grund: z.string(),
  grundArt: z.enum(['Produktionsproblem', 'Sonstige']),
  grundAnmerkung: maybeEmptyString,
  bezeichnung: z.string(),

  atcCode: extendApi(z.string(), {
    description: 'Code laut Anatomical Therapeutic Chemical Classification System (ATC)',
    example: 'H02AB06'
  }),
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
