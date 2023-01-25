export type Stecker = {
  steckertypen: string
  kW?: number
  publicKey: string
}

export type Ladesaeule = {
  betreiber: string
  strasse: string
  hausnummer: string
  addresszusatz: string
  plz: string
  ort: string
  bundesland: string
  kreis: string
  lat: string
  lon: string
  datumInbetriebnahme: string
  anschlussleistung: number
  artLadeeinrichtung: string
  anzahlLadepunkte: number
  stecker: Array<Stecker>
}
