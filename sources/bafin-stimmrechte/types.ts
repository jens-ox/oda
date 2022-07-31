export interface Entity {
  name: string
  sitz: string
  land: string
}

export interface BafinResult {
  veroeffentlichung?: string
  emittent: Entity
  meldepflichtiger: Entity
  stimmrechtsanteile: {
    gesamt?: number
    instrumente?: number
    summe?: number
  }
}
