import { z } from 'zod'

const Date = z.string().describe('Datum der letzten Aktualisierung (z.B. 2024-08-31).')

const LandSchluessel = z
  .number()
  .int()
  .describe('Genormter Landesschlüssel (z.B. 1 für Schleswig-Holstein).')

const RegierungsbezirkSchluessel = z
  .number()
  .int()
  .describe('Genormter Regierungsbezirksschlüssel (z.B. 1 für Statistische Region Braunschweig).')

const RegionSchluessel = z
  .number()
  .int()
  .describe('Genormter Regionsschlüssel (z.B. 1 für Region Stuttgart).')

const KreisSchluessel = z.number().int().describe('Genormter Kreisschlüssel (z.B. 57 für Plön).')

const GemeindeverbandSchluessel = z
  .number()
  .int()
  .describe('Genormter Gemeindeverbandsschlüssel (z.B. 5166 für Marne-Nordsee).')

const NameVerwaltungssitz = z.string().describe('Name des Ortes des Verwaltungssitzes.')

export const DestatisSchema = z
  .object({
    land: z
      .array(
        z.object({
          date: Date,
          landSchluessel: LandSchluessel,
          name: z.string().describe('Name des Bundeslandes.'),
          sitzLandesregierung: NameVerwaltungssitz
        })
      )
      .describe('Liste der Bundesländer.'),
    regierungsbezirk: z
      .array(
        z.object({
          date: Date,
          landSchluessel: LandSchluessel,
          regierungsbezirkSchluessel: RegierungsbezirkSchluessel,
          name: z.string().describe('Name des Regierungsbezirks.'),
          sitzVerwaltung: NameVerwaltungssitz
        })
      )
      .describe('Liste der Regierungsbezirke.'),
    region: z
      .array(
        z.object({
          date: Date,
          landSchluessel: LandSchluessel,
          regierungsbezirkSchluessel: RegierungsbezirkSchluessel,
          regionSchluessel: RegionSchluessel,
          name: z.string().describe('Name der Region.'),
          sitzVerwaltung: NameVerwaltungssitz
        })
      )
      .describe('Liste der Regionen.'),
    kreis: z
      .array(
        z.object({
          date: Date,
          landSchluessel: LandSchluessel,
          regierungsbezirkSchluessel: RegierungsbezirkSchluessel,
          kreisSchluessel: KreisSchluessel,
          name: z.string().describe('Name des Kreises.'),
          sitzVerwaltung: NameVerwaltungssitz,
          kreisTyp: z
            .enum(['kreisfreieStadt', 'stadtkreis', 'kreis', 'landkreis', 'regionalverband'])
            .describe('Typ des Kreises.')
        })
      )
      .describe('Liste der Kreise.'),
    gemeindeverband: z
      .array(
        z.object({
          date: Date,
          landSchluessel: LandSchluessel,
          regierungsbezirkSchluessel: RegierungsbezirkSchluessel,
          kreisSchluessel: KreisSchluessel,
          gemeindeverbandSchluessel: GemeindeverbandSchluessel,
          name: z.string().describe('Name des Gemeindeverbands.'),
          sitzVerwaltung: NameVerwaltungssitz,
          gemeindeverbandTyp: z
            .enum([
              'verbandsfreieGemeinde',
              'amt',
              'samtgemeinde',
              'verbandsgemeinde',
              'verwaltungsgemeinschaft',
              'kirchspielslandgemeinde',
              'verwaltungsverband',
              'vgTraegermodell',
              'erfuellendeGemeinde'
            ])
            .describe('Typ des Gemeindeverbands.')
        })
      )
      .describe('Liste der Gemeindeverbände.'),
    gemeinde: z
      .array(
        z.object({
          date: Date,
          ars: z.number().int().describe('Amtlicher Regionalschlüssel der Gemeinde.'),
          landSchluessel: LandSchluessel,
          regierungsbezirkSchluessel: RegierungsbezirkSchluessel,
          kreisSchluessel: KreisSchluessel,
          gemeindeverbandSchluessel: GemeindeverbandSchluessel,
          gemeindeSchluessel: z.number().int().describe('Genormter Schlüssel der Gemeinde.'),
          name: z.string().describe('Name der Gemeinde.'),
          gemeindeTyp: z
            .enum([
              'markt',
              'kreisfreieStadt',
              'stadtkreis',
              'stadt',
              'kreisangehoerigeGemeinde',
              'gemeindefreiesGebietBewohnt',
              'gemeindefreiesGebietUnbewohnt',
              'grosseKreisstadt'
            ])
            .describe('Typ der Gemeinde.'),
          flaecheHektar: z.number().int().describe('Fläche der Gemeinde in Hektar.'),
          bevoelkerungInsgesamt: z.number().int().describe('Gesamtanzahl Einwohner.'),
          bevoelkerungMaennlich: z.number().int().describe('Anzahl männlicher Einwohner.'),
          plzVerwaltungssitz: z.string().describe('Postleitzahl des Verwaltungssitzes.'),
          plzEindeutig: z
            .boolean()
            .describe('Ist die PLZ eindeutig? Oder gibt es mehrere PLZ in der Gemeinde?'),
          bezirkFinanzamt: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des Finanzamtbezirks. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bezirkOberlandesgericht: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des Oberlandesgerichtsbezirks. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bezirkLandesgericht: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des Landesgerichtsbezirks. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bezirkAmtsgericht: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des Amtsgerichtsbezirks. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bezirkArbeitsagentur: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des Arbeitsagenturbezirks. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bundestagswahlkreisVon: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des ersten Bundestagsbezirks der Gemeinde. Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            ),
          bundestagswahlkreisBis: z
            .number()
            .int()
            .nullable()
            .describe(
              'Schlüssel des letzten Bundestagsbezirks der Gemeinde (identisch mit bundestagswahlkreisVon, falls eindeutig). Kann in Ausnahmefällen leer sein (z.B. deutsch-luxemburgisches Hoheitsgebiet).'
            )
        })
      )
      .describe('Liste der Gemeinden.')
  })
  .describe(
    'Liste der Länder, Regierungsbezirke, Regionen, Kreise, Gemeindeverbände und Gemeinden.'
  )
