import { join, resolve } from 'path'
import { NextResponse } from 'next/server'
import { glob } from 'glob'
import { generateSchema } from '@anatine/zod-openapi'
import { sources } from '@/sources'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const source = sources.find((s) => s.id === id)

  const basePath = join(resolve('./data'), id as string)
  const path = join(basePath, '**')

  const files = await glob(path, { nodir: true })

  return NextResponse.json({
    files: files.map((f) => f.replace(basePath, '').replace(/^\//, '')),
    schema: source?.schema ? generateSchema(source.schema) : undefined
  })
}
