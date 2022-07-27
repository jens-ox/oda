import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { decompress } from './compress'

const s3 = new S3Client({
  region: 'eu-central-1',
  credentials: { accessKeyId: process.env.AWS_ACCESS_KEY!, secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET! }
})

const streamToString = (stream: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Array<Uint8Array> = []
    stream.on('data', (chunk: any) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })

export const upload = async (md5: string, content: string): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: md5,
    Body: content
  })

  await s3.send(command)
}

export const download = async (md5: string): Promise<unknown> => {
  const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET, Key: md5 })

  const rawData = await s3.send(command)

  if (!rawData.Body) return null
  const data = await streamToString(rawData.Body)

  // extract
  return decompress(data)
}
