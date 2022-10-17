import 'dotenv/config'
import { createHash } from 'crypto'
import prisma from '../lib/prisma'
import { download, upload } from '../lib/aws'
import exporterSources from '../sources/exporters'

const main = async () =>
  Promise.all(
    exporterSources.map(async (s) => {
      const result = await s.exporter.result()
      const dataString = JSON.stringify(result)
      const size = Math.floor(dataString.length / 1000)

      // stringify and md5
      const dataMd5 = createHash('md5').update(dataString).digest('hex')

      // check if md5 matches most recent version -- if not, insert
      const recentVersion = await prisma.snapshot.findFirst({
        where: { sourceId: s.id },
        orderBy: [{ createdAt: 'desc' }]
      })

      if (process.env.DRY_RUN) {
        console.log(`dry-run: ${s.id}, hash ${dataMd5}, size ${size} kB`)
        return
      }

      if (recentVersion === null || recentVersion.md5 !== dataMd5) {
        // upload to AWS
        await upload(dataMd5, dataString)

        // if there is no recent version, no diff can be computed
        let diff: unknown | null = null
        let digest: unknown | null = null

        // compute diff and digest
        if (recentVersion !== null) {
          const previousContent = await download(recentVersion?.md5)
          diff = s.exporter.diff(JSON.parse(previousContent), result as any)
          digest = s.exporter.digest(diff as any)

          // upload diff to db
          await upload(`${dataMd5}-diff`, JSON.stringify(diff))
        }

        // insert into db
        await prisma.snapshot.create({
          data: {
            md5: dataMd5,
            createdAt: new Date(),
            sourceId: s.id,
            size,
            digest: digest !== null ? JSON.stringify(digest) : ''
          }
        })
      }
    })
  )

main()
