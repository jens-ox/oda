import { ZodSchema, SafeParseSuccess, SafeParseError, z } from 'zod'

export const validate = (schema: ZodSchema, data: Array<unknown>) => {
  type SuccessEntry = {
    data: unknown
    zod: SafeParseSuccess<z.infer<typeof schema>>
  }

  type ErrorEntry = {
    data: unknown
    zod: SafeParseError<unknown>
  }

  const result = data.map((e) => ({ data: e, zod: schema.safeParse(e) }))

  const validData = result.filter((e): e is SuccessEntry => e.zod.success).map((e) => e.data)
  const errors = result.filter((e): e is ErrorEntry => !e.zod.success)

  if (errors.length > 0) {
    errors.map((e) => console.error(`error ${JSON.stringify(e, null, 2)}`))
  }
  return validData
}
