import { z } from 'zod'

export const WahlSchema = z.object({
  date: z.string().date().describe('Datum der Wahl im ISO-Format (z.B. 2024-06-09).'),
  name: z.string().describe('Name der Wahl.'),
  sourceUrl: z.string().url().describe('URL zur Quelle der Daten.'),
  districtId: z.string().describe('Interner Identifikator des Wahlbezirks.'),
  districtName: z.string().describe('Name des Wahlbezirks.'),
  ags: z
    .string()
    .describe(
      'Amtlicher Gemeindeschlüssel in 8 Ziffern. In einigen Fällen ist hier der Amtliche Regionalschlüssel des betroffenen Gemeindeverbands in 9 Ziffern hinterlegt.'
    ),
  eligible: z
    .number()
    .int()
    .describe(
      'Anzahl der Wahlberechtigten. Bei Wahlbezirken, die die Briefwähler repräsentieren, kann dieser Wert null sein.'
    ),
  total_votes: z.number().int().describe('Anzahl der abgegebenen Stimmen.'),
  total_valid: z.number().int().describe('Anzahl der gültigen Stimmen.'),
  total_invalid: z.number().int().describe('Anzahl der ungültigen Stimmen.'),
  total_valid_second: z.number().int().nullable().describe('Anzahl der gültigen Zweitstimmen.'),
  total_invalid_second: z.number().int().nullable().describe('Anzahl der ungültigen Zweitstimmen.'),
  votes: z
    .array(
      z.object({
        name: z.string().describe('Name der Partei, Liste oder Person.'),
        value: z.number().int().describe('Anzahl der Stimmen.')
      })
    )
    .describe('Ergebnisse pro Partei, Liste oder Person.'),
  votes_second: z
    .array(
      z.object({
        name: z.string().describe('Name der Partei, Liste oder Person.'),
        value: z.number().int().describe('Anzahl der Stimmen.')
      })
    )
    .nullable()
    .describe('Ergebnisse der Zweitstimmen.')
})

export type WahlType = z.infer<typeof WahlSchema>

export const WahlenSchema = z
  .array(WahlSchema)
  .describe('Aggregierte Wahlergebnisse für alle Wahlbezirke.')
