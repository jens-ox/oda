import { ZodSchema, SafeParseSuccess, SafeParseError, z } from 'zod'

/**
 * Validate a list of objects against an object schema, splitting the list into valid and invalid objects.
 *
 * @param schema schema to validate against
 * @param data list of objects to validate
 * @returns list of valid and list of invalid objects
 */
export const validate = <T = unknown>(schema: ZodSchema, data: Array<T>) => {
  type SuccessEntry = {
    data: T
    zod: SafeParseSuccess<z.infer<typeof schema>>
  }

  type ErrorEntry = {
    data: T
    zod: SafeParseError<T>
  }

  const result = data.map((e) => ({ data: e, zod: schema.safeParse(e) }))

  const validData = result.filter((e): e is SuccessEntry => e.zod.success).map((e) => e.data)
  const errors = result.filter((e): e is ErrorEntry => !e.zod.success)

  return {
    valid: validData,
    invalid: errors
  }
}
