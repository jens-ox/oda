import { z } from 'zod'
import { Address } from './base'

/**
 * TODO changes:
 * - Koordinaten in GeoJSON
 * - purpose entfernt (unklarer Zweck, type existiert ja schon)
 * - type: Übernahme der Typbezeichnungen von OSM
 * - Abstelldauer in Minuten statt Sekunden
 * - tags als array statt string (sonst Separation unklar)
 * - address: Aufteilung in Komponenten
 * - has_realtime_data: optional
 *
 * TODO questions:
 * - photo_url: direkter Link zu einem Bild? Oder zu Seite mit Bildern? Verwendung unklar.
 */
export const RadabstellanlageSchema = z.object({
  type: z.literal('Feature'),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z
      .tuple([z.number(), z.number()])
      .describe('Koordinaten der Radabstellanlage in WGS84.')
  }),
  properties: z.object({
    original_uid: z.string().describe('Eindeutige ID/Kennung (vom Datengeber).'),
    name: z.string().describe('Name oder Bezeichnung der Anlage.'),
    type: z
      .enum([
        'stands',
        'wall_loops',
        'rack',
        'shed',
        'bollard',
        'wide_stands',
        'building',
        'lockers',
        'wave',
        'anchors',
        'floor',
        'safe_loops',
        'ground_slots',
        'lean_and_stick',
        'crossbar',
        'other'
      ])
      .describe(
        'Typ des Parkangebots nach OSM-Nomenklatur (siehe https://wiki.openstreetmap.org/wiki/Key:bicycle_parking).'
      ),
    capacity: z.number().describe('Gesamtanzahl generell zugänglicher Stellplätze.'),
    operator_name: z.string().optional().describe('Betreibername.'),
    public_url: z
      .string()
      .url()
      .optional()
      .describe('URL zu weitergehenden Informationen, z.B. Betreiber-Webseite.'),
    address: Address.optional().describe('Adresse der Abstellanlage.'),
    description: z
      .string()
      .optional()
      .describe('Freitext-Feld zur Beschreibung von weiteren Informationen für Nutzende.'),
    max_height: z.number().optional().describe('Maximale Höhe des Fahrrads.'),
    max_width: z.number().optional().describe('Maximale (Lenker-)Breite des Fahrrads.'),
    has_lighting: z.boolean().optional().describe('Ist die Anlage beleuchtet?'),
    supervision_type: z
      .enum(['ja', 'nein', 'video', 'bewacht', 'unbekannt'])
      .optional()
      .describe('Möglichkeiten der Überwachung der Abstellanlage'),
    is_covered: z.boolean().optional().describe('Überdachte Abstellanlage?'),
    related_location: z
      .enum([
        'Schule',
        'Bildungseinrichtung',
        'Bike + Ride',
        'Öffentliche Einrichtung',
        'Straßenraum',
        'unbekannt'
      ])
      .optional()
      .describe(
        'Information zugeordneten Ort der Abstellanalge (kann aus RadVIS oder BFRK-Daten übernommen oder vor Ort eingetragen werden). Neue Werte sind bei Bedarf möglich.'
      ),
    has_realtime_data: z
      .boolean()
      .optional()
      .describe(
        'Liefert eine weitere Datenquelle dynamische Belegungsdaten? Zur Verknüpfung wird in beiden Datenquellen die gleiche lokale ID benötigt.'
      ),
    opening_hours: z
      .string()
      .optional()
      .describe(
        'Öffnungszeiten im OSM-Format (siehe https://wiki.openstreetmap.org/wiki/DE:Key:opening_hours/specification).'
      ),
    max_stay: z.number().int().optional().describe('Maximale Parkdauer in Minuten.'),
    has_fee: z.boolean().optional().describe('Ist die Parkanlage kostenpflichtig?'),
    fee_description: z
      .string()
      .optional()
      .describe('Falls kostenpflichtig, Informationen zum Parktarif.'),
    capacity_charging: z.number().optional().describe('Anzahl Stellplätze mit Ladeeinrichtung.'),
    capacity_cargobike: z
      .number()
      .optional()
      .describe('Anzahl Stellplätze, die für Lastenräder geeignet sind.'),
    tags: z.array(z.string()).optional().describe('Übernahme externer Merkmale.')
  })
})

export const RadabstellanlagenSchema = z
  .object({
    type: z.literal('FeatureCollection'),
    features: z.array(RadabstellanlageSchema)
  })
  .describe('Liste Radabstellanlagen im GeoJSON-Format.')
