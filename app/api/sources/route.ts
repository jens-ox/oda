import { NextResponse } from 'next/server'
import { sources } from '@/sources'

export const GET = async () => {
  return NextResponse.json(sources)
}
