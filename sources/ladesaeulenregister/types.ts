export type Stecker = {
  steckertypen: string
  kW?: number
}

export type Ladesaeule = {
  betreiber: string
  strasse: string
  hausnummer: string
  adresszusatz: string
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
