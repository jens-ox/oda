const dateFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short', timeStyle: 'short' })
export const formatDate = dateFormatter.format
