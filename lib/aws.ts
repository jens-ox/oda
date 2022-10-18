import { Readable } from 'stream'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import streamToString from '../utils/streamToString'

const s3 = new S3Client({
  region: 'eu-central-1',
  credentials: { accessKeyId: process.env.ACCESS_KEY!, secretAccessKey: process.env.ACCESS_KEY_SECRET! }
})

export const upload = async (md5: string, content: string): Promise<void> => {
  if (process.env.DRY_RUN) {
    console.log(`[dry]: would upload ${md5} (${Math.floor(content.length / 1000)} kB)`)
  } else {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Key: md5,
      Body: content
    })

    await s3.send(command)
  }
}

export const getLink = async (md5: string): Promise<string> => {
  const command = new GetObjectCommand({ Bucket: process.env.BUCKET, Key: md5 })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

  return url
}

export const getData = async (md5: string): Promise<unknown> => {
  const command = new GetObjectCommand({ Bucket: process.env.BUCKET, Key: md5 })

  const rawData = await s3.send(command)

  if (!rawData.Body) {
    return null
  } else {
    const content = await streamToString(rawData.Body as Readable)
    return JSON.parse(content)
  }
}
