import { formatISO, parse } from 'date-fns'

export const germanDateToString = (dateString: string): string | undefined =>
  dateString ? formatISO(parse(dateString, 'dd.MM.yyyy', new Date()), { representation: 'date' }) : undefined
