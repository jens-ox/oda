import zlib from 'zlib'

export const compress = async (data: unknown): Promise<string> =>
  new Promise((resolve, reject) => {
    zlib.deflate(JSON.stringify(data), (err, buffer) => {
      if (err) {
        return reject(err)
      }

      const result = buffer.toString('base64')

      resolve(result)
    })
  })

export const decompress = async (data?: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    if (!data) {
      return resolve('')
    }
    const buffer = Buffer.from(data, 'base64')
    zlib.inflate(buffer, (error, unzipped) => {
      if (error) {
        return reject(error)
      }

      resolve(JSON.parse(unzipped.toString()))
    })
  })
