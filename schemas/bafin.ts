import { maybeEmptyString } from '@/utils/zod'
import { z } from 'zod'

const entitySchema = z.object({
  name: z.string(),
  sitz: maybeEmptyString,
  land: maybeEmptyString
})

const bafinObjectSchema = z.object({
  veroeffentlichung: maybeEmptyString.describe(
    'Veröffentlichungsdatum der Stimmrechte im ISO-Format, z.B. 2024-06-13'
  ),
  emittent: entitySchema,
  meldepflichtiger: entitySchema,
  stimmrechtsanteile: z.object({
    gesamt: z.number().optional(),
    instrumente: z.number().optional(),
    summe: z.number().optional()
  })
})

export const bafinSchema = z
  .array(bafinObjectSchema)
  .describe('Liste an bedeutenden Stimmrechten nach WpHG.')
