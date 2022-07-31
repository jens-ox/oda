import { parseISO } from 'date-fns'

const dateFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' })

const dateTimeFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

const percentFormatter = new Intl.NumberFormat('de-DE', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
})

export const stringToDate = (dateString: string): Date => parseISO(dateString)

export const formatDate = dateFormatter.format
export const formatDateTime = dateTimeFormatter.format
export const formatPercent = percentFormatter.format
