import { ZodSchema, SafeParseSuccess, SafeParseError, z } from 'zod'

export const validate = (schema: ZodSchema, data: Array<unknown>) => {
  const result = data.map((e) => schema.safeParse(e))

  const validData = result.filter((e): e is SafeParseSuccess<z.infer<typeof schema>> => e.success).map((e) => e.data)
  const errors = result.filter((e): e is SafeParseError<unknown> => !e.success)

  if (errors.length > 0) {
    console.error(`got ${errors.length} errors:`)
    errors.map((e) => console.error('error: ', e.error))
  }
  return validData
}
