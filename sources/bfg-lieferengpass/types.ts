export interface ArzneiEngpassResult {
  pzn: Array<string>
  enr: string
  meldungsart: string
  datumBeginn?: string
  datumEnde?: string
  datumErstmeldung?: string
  datumLetzteMeldung?: string
  bezeichnung: string
  atcCode: string
  wirkstoffe: string
  krankenhausrelevant: boolean
  zulassungsinhaber: string
  telefon: string
  mail: string
  grund: string
  grundArt: string
  grundAnmerkung?: string
  alternativPraeparat?: string
  infoFachkreise: string
}
