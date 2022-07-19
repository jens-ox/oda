import { createHash } from 'crypto'
import zlib from 'zlib'
import AWS from 'aws-sdk'
import BafinExporter from './exporters/bafin'
import prisma from './prisma'

AWS.config.update({ region: 'eu-central-1' })

const s3 = new AWS.S3()

const s3Upload = async (md5: string, content: string): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: 'bundesdatenkrake',
        Key: md5,
        Body: content
      },
      (error, data) => {
        if (error) {
          return reject(error)
        }

        resolve(data.Location)
      }
    )
  })

const compress = async (data: unknown): Promise<string> =>
  new Promise((resolve, reject) => {
    zlib.gzip(JSON.stringify(data), (err, buffer) => {
      if (err) {
        return reject(err)
      }

      resolve(buffer.toString('base64'))
    })
  })

const main = async () => {
  const data = await BafinExporter()
  const dataString = await compress(data)

  // stringify and md5
  const dataMd5 = createHash('md5').update(dataString).digest('hex')

  // check if md5 matches current version -- if not, insert
  const currentEntry = await prisma.snapshot.findFirst({ orderBy: [{ createdAt: 'desc' }] })
  if (currentEntry === null || currentEntry.md5 !== dataMd5) {
    const awsLocation = await s3Upload(dataMd5, dataString)

    const result = await prisma.snapshot.create({
      data: {
        md5: dataMd5,
        createdAt: new Date(),
        sourceId: 'bafin-stimmrechte'
      }
    })

    console.log('created new entry: ', result, awsLocation)
  } else {
    console.log('entry already up to date')
  }
}

main()
