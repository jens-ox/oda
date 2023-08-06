import { join } from 'path'
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const file = searchParams.get('file')
  let content
  try {
    content = await readFile(join(process.cwd(), 'data', id as string, file as string), { encoding: 'utf-8' })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json(JSON.parse(content))
}
