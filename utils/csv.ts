import { parse } from 'csv-parse'

interface ParseCsvOptions {
  delimiter?: string
  hasHeader?: boolean
}

export const parseCsv = async <T = unknown>(
  content: string,
  options?: ParseCsvOptions
): Promise<T[]> =>
  new Promise((resolve, reject) => {
    const delimiter = options?.delimiter ?? ';'
    const hasHeader = options?.hasHeader ?? false
    const parser = parse({ delimiter, columns: hasHeader, relax_quotes: true })

    const records: T[] = []

    parser.on('error', (error) => reject(error))

    parser.on('readable', () => {
      let record
      while ((record = parser.read()) !== null) {
        records.push(record)
      }
    })

    parser.on('end', () => {
      resolve(records)
    })

    parser.write(content)
    parser.end()
  })
