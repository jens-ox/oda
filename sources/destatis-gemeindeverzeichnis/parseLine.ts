import { Gemeinde, Gemeindeverband, Kreis, Land, Regierungsbezirk, Region } from './types'

const parseLand = (l: string): Land => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  // const ef3u2 = l.substring(12, 13).trim()
  // const ef3u3 = l.substring(13, 15).trim()
  // const ef3u4 = l.substring(15, 18).trim()
  // const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  const ef6 = l.substring(72, 122).trim()
  // const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  // const ef8 = l.substring(128, 200).trim()
  const ef9 = l.substring(200, 220).trim()

  return {
    type: 'land',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    landSchluessel: parseInt(ef3u1),
    name: ef5,
    sitzLandesregierung: ef6,
    ...(ef9 !== '' ? { interneAngaben: ef9 } : {})
  }
}

const parseRegierungsbezirk = (l: string): Regierungsbezirk => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  const ef3u2 = l.substring(12, 13).trim()
  // const ef3u3 = l.substring(13, 15).trim()
  // const ef3u4 = l.substring(15, 18).trim()
  // const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  const ef6 = l.substring(72, 122).trim()
  // const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  // const ef8 = l.substring(128, 200).trim()
  const ef9 = l.substring(200, 220).trim()

  return {
    type: 'regierungsbezirk',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    landSchluessel: parseInt(ef3u1),
    regierungsbezirkSchluessel: parseInt(ef3u2),
    name: ef5,
    sitzVerwaltung: ef6,
    ...(ef9 !== '' ? { interneAngaben: ef9 } : {})
  }
}

const parseRegion = (l: string): Region => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  const ef3u2 = l.substring(12, 13).trim()
  const ef3u3 = l.substring(13, 15).trim()
  // const ef3u4 = l.substring(15, 18).trim()
  // const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  const ef6 = l.substring(72, 122).trim()
  // const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  // const ef8 = l.substring(128, 200).trim()
  const ef9 = l.substring(200, 220).trim()

  return {
    type: 'region',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    landSchluessel: parseInt(ef3u1),
    regierungsbezirkSchluessel: parseInt(ef3u2),
    regionSchluessel: parseInt(ef3u3),
    name: ef5,
    sitzVerwaltung: ef6,
    ...(ef9 !== '' ? { interneAngaben: ef9 } : {})
  }
}

const parseKreis = (l: string): Kreis => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  const ef3u2 = l.substring(12, 13).trim()
  const ef3u3 = l.substring(13, 15).trim()
  // const ef3u4 = l.substring(15, 18).trim()
  // const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  const ef6 = l.substring(72, 122).trim()
  const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  // const ef8 = l.substring(128, 200).trim()
  const ef9 = l.substring(200, 220).trim()

  const typeMap = new Map([
    ['41', 'kreisfreieStadt'],
    ['42', 'stadtkreis'],
    ['43', 'kreis'],
    ['44', 'landkreis'],
    ['45', 'regionalverband']
  ])

  return {
    type: 'kreis',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    landSchluessel: parseInt(ef3u1),
    regierungsbezirkSchluessel: parseInt(ef3u2),
    kreisSchluessel: parseInt(ef3u3),
    name: ef5,
    sitzVerwaltung: ef6,
    kreisTyp: typeMap.get(ef7u1) ?? ef7u1,
    ...(ef9 !== '' ? { interneAngaben: ef9 } : {})
  }
}

const parseGemeindeverband = (l: string): Gemeindeverband => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  const ef3u2 = l.substring(12, 13).trim()
  const ef3u3 = l.substring(13, 15).trim()
  // const ef3u4 = l.substring(15, 18).trim()
  const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  const ef6 = l.substring(72, 122).trim()
  const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  // const ef8 = l.substring(128, 200).trim()
  const ef9 = l.substring(200, 220).trim()

  const typeMap = new Map([
    ['50', 'verbandsfreieGemeinde'],
    ['51', 'amt'],
    ['52', 'samtgemeinde'],
    ['53', 'verbandsgemeinde'],
    ['54', 'verwaltungsgemeinschaft'],
    ['55', 'kirchspielslandgemeinde'],
    ['56', 'verwaltungsverband'],
    ['57', 'vgTraegermodell'],
    ['58', 'erfuellendeGemeinde']
  ])

  return {
    type: 'gemeindeverband',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    landSchluessel: parseInt(ef3u1),
    regierungsbezirkSchluessel: parseInt(ef3u2),
    kreisSchluessel: parseInt(ef3u3),
    gemeindeverbandSchluessel: parseInt(ef4),
    name: ef5,
    sitzVerwaltung: ef6,
    gemeindeverbandTyp: typeMap.get(ef7u1) ?? ef7u1,
    ...(ef9 !== '' ? { interneAngaben: ef9 } : {})
  }
}

const parseGemeinde = (l: string): Gemeinde => {
  const ef2u1 = l.substring(2, 6).trim()
  const ef2u2 = l.substring(6, 8).trim()
  const ef2u3 = l.substring(8, 10).trim()
  const ef3u1 = l.substring(10, 12).trim()
  const ef3u2 = l.substring(12, 13).trim()
  const ef3u3 = l.substring(13, 15).trim()
  const ef3u4 = l.substring(15, 18).trim()
  const ef4 = l.substring(18, 22).trim()
  const ef5 = l.substring(22, 72).trim()
  // const ef6 = l.substring(72, 122).trim()
  const ef7u1 = l.substring(122, 124).trim()
  // const ef7u2 = l.substring(124, 126).trim()
  // const ef7u3 = l.substring(126, 128).trim()
  const ef8 = l.substring(128, 139).trim()
  const ef9 = l.substring(139, 150).trim()
  const ef10 = l.substring(150, 161).trim()
  // const ef11 = l.substring(161, 165).trim()
  const ef12u1 = l.substring(165, 170).trim()
  const ef12u2 = l.substring(170, 175).trim()
  // const ef13 = l.substring(175, 177).trim()
  const ef14 = l.substring(177, 181).trim()
  const ef15u1 = l.substring(181, 183).trim()
  const ef15u2 = l.substring(183, 184).trim()
  const ef15u3 = l.substring(184, 185).trim()
  const ef16 = l.substring(185, 190).trim()
  const ef17u1 = l.substring(190, 193).trim()
  const ef17u2 = l.substring(193, 196).trim()
  // const ef18 = l.substring(196, 200).trim()
  const ef19 = l.substring(200, 220).trim()

  const typeMap = new Map([
    ['60', 'markt'],
    ['61', 'kreisfreieStadt'],
    ['62', 'stadtkreis'],
    ['63', 'stadt'],
    ['64', 'kreisangehoerigeGemeinde'],
    ['65', 'gemeindefreiesGebietBewohnt'],
    ['66', 'gemeindefreiesGebietUnbewohnt'],
    ['67', 'grosseKreisstadt']
  ])

  const landSchluessel = ef3u1
  const rbzSchluessel = ef3u2
  const kreisSchluessel = ef3u3
  const verbandSchluessel = ef4
  const gemeindeSchluessel = ef3u4
  const ars = parseInt(`${landSchluessel}${rbzSchluessel}${kreisSchluessel}${verbandSchluessel}${gemeindeSchluessel}`)

  return {
    type: 'gemeinde',
    date: `${ef2u1}-${ef2u2}-${ef2u3}`,
    ars,
    landSchluessel: parseInt(landSchluessel),
    regierungsbezirkSchluessel: parseInt(rbzSchluessel),
    kreisSchluessel: parseInt(kreisSchluessel),
    gemeindeverbandSchluessel: parseInt(verbandSchluessel),
    gemeindeSchluessel: parseInt(gemeindeSchluessel),
    name: ef5,
    gemeindeTyp: typeMap.get(ef7u1) ?? ef7u1,
    flaecheHektar: parseInt(ef8),
    bevoelkerungInsgesamt: parseInt(ef9),
    bevoelkerungMaennlich: parseInt(ef10),
    plzVerwaltungssitz: ef12u1,
    plzEindeutig: ef12u2 === '',
    bezirkFinanzamt: parseInt(ef14),
    bezirkOberlandesgericht: parseInt(ef15u1),
    bezirkLandesgericht: parseInt(ef15u2),
    bezirkAmtsgericht: parseInt(ef15u3),
    bezirkArbeitsagentur: parseInt(ef16),
    bundestagswahlkreisVon: parseInt(ef17u1),
    bundestagswahlkreisBis: ef17u2 !== '' ? parseInt(ef17u2) : parseInt(ef17u1),
    ...(ef19 !== '' ? { interneAngaben: ef19 } : {})
  }
}

export const parseLine = (l: string): Land | Regierungsbezirk | Region | Kreis | Gemeindeverband | Gemeinde | null => {
  // get satzart
  const satzart = l.substring(0, 2).trim()

  switch (satzart) {
    case '10':
      return parseLand(l)
    case '20':
      return parseRegierungsbezirk(l)
    case '30':
      return parseRegion(l)
    case '40':
      return parseKreis(l)
    case '50':
      return parseGemeindeverband(l)
    case '60':
      return parseGemeinde(l)
    default:
      return null
  }
}
