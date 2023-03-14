import { generateSchema } from '@anatine/zod-openapi'
import { NextResponse } from 'next/server'
import { sources } from '../../../sources'

export const GET = async () => {
  return NextResponse.json(
    sources.map((s) => ({
      ...s,
      targets: Object.entries(s.targets ?? {}).reduce((acc, [key, value]) => {
        acc[key] = generateSchema(value)
        return acc
      }, {} as Record<string, unknown>)
    }))
  )
}
