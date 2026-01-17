import { z } from 'zod'

export const GbfsLightSchema = z
  .object({
    language: z.string().describe('Sprache des Feeds'),
    email: z.string().email().describe('Kontakt-Email des Feeds'),
    license_id: z.string().describe('Lizenz-ID des Feeds'),
    license_url: z.string().describe('Lizenz-URL des Feeds'),
    timezone: z.string().describe('Zeitzone des Feeds'),
    system: z.array(
      z.object({
        system_id: z.string().describe('ID des Systems'),
        name: z.string().describe('Name des Angebots'),
        operator: z.string().describe('Name des Betreibers'),
        opening_hours: z.string().describe('Öffnungszeiten im OSM-Format'),
        url: z.string().describe('URL zur Website des Angebots'),
        email: z.string().email().describe('Mail für Kundenanfragen'),
        terms: z.string().optional().describe('URL zu den Nutzungsbedingungen'),
        terms_last_updated: z
          .string()
          .date()
          .optional()
          .describe(
            'Zeitpunkt der letzten Aktualisierung der Nutzungsbedingungen im ISO-Format (z.B. 2022-12-31)'
          ),
        privacy: z.string().optional().describe('URL zur Datenschutzerklärung'),
        privacy_last_updated: z
          .string()
          .date()
          .optional()
          .describe(
            'Zeitpunkt der letzten Aktualisierung der Datenschutzerklärung im ISO-Format (z.B. 2022-12-31)'
          ),
        vehicle_types: z
          .array(
            z.object({
              name: z.string().describe('Bezeichnung der Fahrzeugart'),
              form_factor: z
                .enum([
                  'bicycle',
                  'cargo_bicycle',
                  'car',
                  'moped',
                  'scooter_standing',
                  'scooter_seated',
                  'other'
                ])
                .describe('Typ des Fahrzeugs nach GBFS-Standard'),
              propulsion_type: z
                .enum([
                  'human',
                  'electric_assist',
                  'electric',
                  'combustion',
                  'combustion_diesel',
                  'hybrid',
                  'plug_in_hybrid',
                  'hydrogen_fuel_cell'
                ])
                .describe('Antriebsart des Fahrzeugs nach GBFS-Standard'),
              max_range_meters: z
                .number()
                .positive()
                .optional()
                .describe(
                  'Maximale Reichweite in Metern, die im vollgetankten/geladenen Zustand zurückgelegt werden kann (falls Antriebsart nicht "human")'
                ),
              min_range_meters: z
                .number()
                .positive()
                .optional()
                .describe(
                  'Minimale Reichweite in Metern, die im vom Anbieter bei Ausleihe zugesichert wird (wird in der Anzeige in Anwendungen als aktueller Ladestand angegeben) (falls Antriebsart nicht "human")'
                )
            })
          )
          .describe('Liste der Fahrzeugtypen'),
        stations: z
          .array(
            z.object({
              id: z
                .string()
                .describe(
                  'ID der Ausleih-Station (kann ein einfacher Zähler sein, oder Name ohne Umlaute, Leerschritte, Sonderzeichen)'
                ),
              name: z.string().describe('Name der Ausleih-Station'),
              lat: z.number().describe('Breitengrad der Station (in WGS84)'),
              lon: z.number().describe('Längengrad der Station (in WGS84)'),
              address: z.string().describe('Anschrift der Station (Straße und ggf. Hausnummer)'),
              post_code: z.string().describe('Postleitzahl der Station'),
              city: z.string().describe('Ort der Station'),
              url: z
                .string()
                .url()
                .optional()
                .describe('Link zur Station (falls von URL zum Angebot abweichend)'),
              opening_hours: z
                .string()
                .optional()
                .describe(
                  'Öffnungszeiten der Ausleihstation im OSM-Format (falls vom Angebot abweichen)'
                ),
              vehicle_types: z.array(
                z.object({
                  name: z.string().describe('Bezeichnung der Fahrzeugart'),
                  available_count: z
                    .number()
                    .positive()
                    .describe(
                      'Anzahl Fahrzeuge dieses Typs an der aktuellen Zeile mittels station_id referenzierten Station'
                    )
                })
              )
            })
          )
          .describe('Liste der Ausleih-Stationen')
      })
    )
  })
  .describe(
    'GBFS-Light-Schema. Dieses Schema ist ist für veröffentlichende Stellen gedacht, die nicht selbst einen GBFS-Feed anbieten wollen, sondern Daten für ein System bereitstellen, welches diese zu einem GBFS-Feed aggregiert.'
  )
