import { z } from 'zod'
import { Address } from './base'

export const LadesaeuleSchema = z.object({
  type: z.literal('Feature'),
  properties: z.object({
    betreiber: z.string().describe('Name des Betreibers.'),
    adresse: Address,
    beschreibungAdresse: z
      .string()
      .optional()
      .describe('Optionale Beschreibung des Ortes (z.B. Besucherparkplatz Naturkundemuseum).'),
    datumInbetriebnahme: z.string().describe('Datum der Inbetriebnahme (z.B. 2020-01-11).'),
    anschlussLeistung: z.number().int().describe('Leistung des Anschlusses in kW.'),
    anzahlLadepunkte: z.number().int().describe('Anzahl Ladepunkte.'),
    stecker: z.array(
      z.object({
        steckertypen: z.string().describe('Steckertyp (z.B. DC CHAdeMO).'),
        kW: z.number().describe('Leistung des Steckers.')
      })
    )
  }),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]).describe('Koordinaten der Ladesäule in WGS84.')
  })
})

export const LadesaeulenSchema = z
  .object({
    type: z.literal('FeatureCollection'),
    features: z.array(LadesaeuleSchema)
  })
  .describe('Liste Elektroladesäulen im GeoJSON-Schema.')
