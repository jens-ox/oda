import 'dotenv/config'
import { createHash } from 'crypto'
import prisma from '../lib/prisma'
import { upload } from '../lib/aws'
import { compress } from '../lib/compress'
import BafinExporter from './exporters/bafin'

const main = async () => {
  const data = await BafinExporter()
  const dataString = await compress(data)

  // stringify and md5
  const dataMd5 = createHash('md5').update(dataString).digest('hex')

  // check if md5 matches current version -- if not, insert
  const currentEntry = await prisma.snapshot.findFirst({ orderBy: [{ createdAt: 'desc' }] })
  if (currentEntry === null || currentEntry.md5 !== dataMd5) {
    // upload to AWS
    await upload(dataMd5, dataString)

    // insert into db
    await prisma.snapshot.create({
      data: {
        md5: dataMd5,
        createdAt: new Date(),
        sourceId: 'bafin-stimmrechte'
      }
    })
  }
}

main()
