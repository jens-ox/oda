import { z } from 'zod'

export const krankenkassenObjectSchema = z.object({
  name: z.string().describe('Name der Krankenkasse.'),
  zusatzbeitrag: z
    .number()
    .nullable()
    .describe(
      'Tagesaktueller Zusatzbeitragssatz. Kann in Ausnahmefällen nicht definiert sein (z.B. erhebt die branchenbezogene SVLFG keinen Zusatzbeitrag).'
    ),
  openedIn: z
    .array(z.string())
    .describe(
      'Liste der Bundesländer, in denen die Krankenkasse verfügbar ist. Bei bundesweiten Krankenkassen "bundesweit".'
    )
})

export const krankenkassenSchema = z
  .array(krankenkassenObjectSchema)
  .describe('Liste gesetzlicher Krankenkassen.')

export type KrankenhausType = z.infer<typeof krankenkassenSchema>
