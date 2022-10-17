import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextApiResponse } from 'next'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: 'eu-central-1',
  credentials: { accessKeyId: process.env.ACCESS_KEY!, secretAccessKey: process.env.ACCESS_KEY_SECRET! }
})

export const upload = async (md5: string, content: string): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: md5,
    Body: content
  })

  await s3.send(command)
}

export const download = async (md5: string): Promise<string> => {
  const command = new GetObjectCommand({ Bucket: process.env.BUCKET, Key: md5 })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

  return url
}

export const getStream = async (res: NextApiResponse<any>, md5: string): Promise<void> => {
  const command = new GetObjectCommand({ Bucket: process.env.BUCKET, Key: md5 })

  const rawData = await s3.send(command)

  if (!rawData.Body) {
    res.status(404).json({ msg: 'not found' })
  } else {
    res.json(rawData.Body)
  }
}
