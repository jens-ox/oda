import 'dotenv/config'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { exporters } from '@/sources/exporters'

const BASE_DIR = join(import.meta.dirname, '../data')

;(async () => {
  await Promise.all(
    exporters.map(async (s) => {
      try {
        const result = await s.exporter()

        // ensure that the target directory exists
        await mkdir(join(BASE_DIR, s.id), { recursive: true })

        // write files to disk
        for (const file of result) {
          const stringData = JSON.stringify(file.data, null, 2)
          await writeFile(join(BASE_DIR, s.id, file.targetFile), stringData, {
            encoding: 'utf-8'
          })
        }
      } catch (error) {
        console.error('error crawling: ', error)
      }
    })
  )
})()
