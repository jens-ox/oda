import { NextResponse } from 'next/server'
import { generateSchema } from '@anatine/zod-openapi'
import { sources } from '@/sources'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const file = searchParams.get('file')

  if (id === null) return NextResponse.json('no source id specified', { status: 400 })
  if (file === null) return NextResponse.json('no file specified', { status: 400 })

  const source = sources.find((s) => s.id === id)
  if (!source) return NextResponse.json('source not found', { status: 404 })

  const schema = source.targets?.[file]
  if (!schema) return NextResponse.json('schema not found', { status: 404 })

  return NextResponse.json(generateSchema(schema))
}
