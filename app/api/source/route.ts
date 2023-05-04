import { join, resolve } from 'path'
import { NextResponse } from 'next/server'
import { glob } from 'glob'
import { sources } from '@/sources'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const source = sources.find((s) => s.id === id)

  if (!source) return NextResponse.json('source not found', { status: 404 })

  const basePath = join(resolve('./data'), id as string)
  const path = join(basePath, '**')

  const files = await glob(path, { nodir: true })

  const { targets: _, ...sourceFields } = source

  return NextResponse.json({
    ...sourceFields,
    files: files
      .map((f) => f.replace(basePath, '').replace(/^\//, ''))
      .map((f) => ({ path: f, schema: source?.targets?.[f] ? generateSchema(source.targets[f]) : undefined }))
  })
}
