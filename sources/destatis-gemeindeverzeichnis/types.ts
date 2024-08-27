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
}

export type Land = Entry & {
  landSchluessel: number
  sitzLandesregierung: string
}

export type Regierungsbezirk = Entry & {
  landSchluessel: number
  regierungsbezirkSchluessel: number
  sitzVerwaltung: string
}

export type Region = Entry & {
  landSchluessel: number
  regierungsbezirkSchluessel: number
  regionSchluessel: number
  sitzVerwaltung: string
}

export type Kreis = Entry & {
  landSchluessel: number
  regierungsbezirkSchluessel: number
  kreisSchluessel: number
  sitzVerwaltung: string
  kreisTyp: string
}

export type Gemeindeverband = Entry & {
  landSchluessel: number
  regierungsbezirkSchluessel: number
  kreisSchluessel: number
  gemeindeverbandSchluessel: number
  sitzVerwaltung: string
  gemeindeverbandTyp: string
}

export type Gemeinde = Entry & {
  ars: number
  landSchluessel: number
  regierungsbezirkSchluessel: number
  kreisSchluessel: number
  gemeindeverbandSchluessel: number
  gemeindeSchluessel: number
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
