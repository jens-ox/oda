import { z } from 'zod'
import { dateString, maybeEmptyString } from '@/utils/zod'

export const bfgObjectSchema = z.object({
  pzn: z.array(z.string()).describe('Pharma-Zentralnummer (z.B. 01300419)'),
  enr: z.array(z.string()).describe('Eingangsnummer, auch Einreichungsnummer (z.B. 0245718)'),
  meldungsart: z.enum(['Änderungsmeldung', 'Erstmeldung']),
  datumBeginn: dateString,
  datumEnde: dateString,
  datumErstmeldung: dateString,
  datumLetzteMeldung: dateString,
  grund: z.string(),
  grundArt: z.enum(['Produktionsproblem', 'Sonstige']),
  grundAnmerkung: maybeEmptyString,
  bezeichnung: z.string(),

  atcCode: z
    .string()
    .describe(
      'Code laut Anatomical Therapeutic Chemical Classification System (ATC) (z.B. H02AB06)'
    ),
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

export const bfgSchema = z
  .array(bfgObjectSchema)
  .describe('Liste von Lieferengpässen bei Human-Arzneimitteln.')

export type BfgObjectType = z.infer<typeof bfgObjectSchema>
