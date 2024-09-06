export type EntryType =
  | 'land'
  | 'regierungsbezirk'
  | 'region'
  | 'kreis'
  | 'gemeindeverband'
  | 'gemeinde'

type Entry = {
  type: EntryType
  date: string
  name: string
  interneAngaben?: string
  ars: string
}

export type Land = Entry & {
  sitzLandesregierung: string
}

export type Regierungsbezirk = Entry & {
  sitzVerwaltung: string
}

export type Region = Entry & {
  sitzVerwaltung: string
}

export type Kreis = Entry & {
  sitzVerwaltung: string
  kreisTyp: string
}

export type Gemeindeverband = Entry & {
  sitzVerwaltung: string
  gemeindeverbandTyp: string
}

export type Gemeinde = Entry & {
  gemeindeTyp: string
  flaecheHektar: number
  bevoelkerungInsgesamt: number
  bevoelkerungMaennlich: number
  plzVerwaltungssitz: string
  plzEindeutig: boolean
  bezirkFinanzamt: number | null
  bezirkOberlandesgericht: number | null
  bezirkLandesgericht: number | null
  bezirkAmtsgericht: number | null
  bezirkArbeitsagentur: number | null
  bundestagswahlkreisVon: number | null
  bundestagswahlkreisBis: number | null
}

export type Result = {
  land: Array<Land>
  regierungsbezirk: Array<Regierungsbezirk>
  region: Array<Region>
  kreis: Array<Kreis>
  gemeindeverband: Array<Gemeindeverband>
  gemeinde: Array<Gemeinde>
}
