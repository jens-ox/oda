import { NextResponse } from 'next/server'
import { schemas } from '@/schemas'
import zodToJsonSchema from 'zod-to-json-schema'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (id === null) return NextResponse.json('no source id specified', { status: 400 })

  const schema = schemas[id]
  if (!schema) return NextResponse.json('schema not found', { status: 404 })

  return NextResponse.json(zodToJsonSchema(schema, { $refStrategy: 'none', target: 'openApi3' }))
}
