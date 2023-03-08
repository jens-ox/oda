import { formatISO, parse } from 'date-fns'

export const germanDateToString = (dateString: string): string | undefined => {
  if (!dateString || dateString === '') return undefined
  try {
    return formatISO(parse(dateString, 'dd.MM.yyyy', new Date()), { representation: 'date' })
  } catch (error) {
    console.error('error parsing date string: ', dateString)
    console.error('got error: ', error)
  }
}
