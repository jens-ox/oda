import { z } from 'zod'

export const krankenkassenObjectSchema = z.object({
  name: z.string(),
  zusatzbeitrag: z.number(),
  openedIn: z.array(z.string())
})

export const krankenhausSchema = z.array(krankenkassenObjectSchema)

export type KrankenhausType = z.infer<typeof krankenhausSchema>
