import internal from 'stream'

const streamToString = (stream: internal.Readable, encoding: BufferEncoding = 'utf8'): Promise<string> => {
  const chunks: Array<Buffer> = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString(encoding)))
  })
}

export default streamToString
