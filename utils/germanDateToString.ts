import { formatISO, parse } from 'date-fns'

const germanDateToString = (dateString: string): string =>
  formatISO(parse(dateString, 'dd.MM.yyyy', new Date()), { representation: 'date' })

export default germanDateToString
