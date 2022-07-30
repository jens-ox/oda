import { formatISO, parse } from 'date-fns'

const germanDateToString = (dateString?: string): string | undefined =>
  dateString ? formatISO(parse(dateString, 'dd.MM.yyyy', new Date()), { format: 'basic' }) : undefined

export default germanDateToString
