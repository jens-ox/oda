import 'dotenv/config'
import { createHash } from 'crypto'
import prisma from '../lib/prisma'
import { upload } from '../lib/aws'
import { compress } from '../lib/compress'
import exporterSources from '../sources/exporters'

const main = async () =>
  Promise.all(
    exporterSources.map(async (s) => {
      const data = await s.exporter()
      const { data: dataString, size } = await compress(data)

      // stringify and md5
      const dataMd5 = createHash('md5').update(dataString).digest('hex')

      // check if md5 matches current version -- if not, insert
      const currentEntry = await prisma.snapshot.findFirst({
        where: { sourceId: s.id },
        orderBy: [{ createdAt: 'desc' }]
      })

      if (process.env.DRY_RUN) {
        console.log(`dry-run: ${s.id}, hash ${dataMd5}, size ${size} kB`)
        return
      }

      if (currentEntry === null || currentEntry.md5 !== dataMd5) {
        // upload to AWS
        await upload(dataMd5, dataString)

        // insert into db
        await prisma.snapshot.create({
          data: {
            md5: dataMd5,
            createdAt: new Date(),
            sourceId: s.id,
            size
          }
        })
      }
    })
  )

main()
