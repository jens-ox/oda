import { join, resolve } from 'path'
import { NextResponse } from 'next/server'
import { glob } from 'glob'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  console.log('id', id)

  const basePath = join(resolve('./data'), id as string)
  const path = join(basePath, '**')

  console.log('path', path)
  const files = await glob(path, { nodir: true })

  console.log('files', files)
  return NextResponse.json(files.map((f) => f.replace(basePath, '').replace(/^\//, '')))
}
