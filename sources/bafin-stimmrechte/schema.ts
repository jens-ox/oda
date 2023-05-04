import { z } from 'zod'
import { maybeEmptyString } from '@/utils/zod'

export const entitySchema = z.object({
  name: z.string(),
  sitz: maybeEmptyString,
  land: maybeEmptyString
})

export const bafinObjectSchema = z.object({
  veroeffentlichung: maybeEmptyString,
  emittent: entitySchema,
  meldepflichtiger: entitySchema,
  stimmrechtsanteile: z.object({
    gesamt: z.number().optional(),
    instrumente: z.number().optional(),
    summe: z.number().optional()
  })
})

export const bafinSchema = z.array(bafinObjectSchema)

export type BafinObjectType = z.infer<typeof bafinObjectSchema>
