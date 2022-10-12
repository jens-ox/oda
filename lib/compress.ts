import zlib from 'zlib'

interface CompressResult {
  data: string
  size: number
}
export const compress = async (data: unknown): Promise<CompressResult> =>
  new Promise((resolve, reject) => {
    const stringified = JSON.stringify(data)
    zlib.deflate(stringified, (err, buffer) => {
      if (err) {
        return reject(err)
      }

      const result = buffer.toString('base64')

      resolve({
        data: result,
        size: Math.round(stringified.length / 1000)
      })
    })
  })

export const decompress = async (data?: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!data) {
      return resolve('')
    }
    const buffer = Buffer.from(data, 'base64')
    zlib.inflate(buffer, (error, unzipped) => {
      if (error) {
        return reject(error)
      }

      resolve(unzipped.toString())
    })
  })
