import { z } from 'zod'

export const maybeEmptyString = z
  .string()
  .optional()
  .transform((s) => (s === '' ? undefined : s))

export const dateString = z.string().regex(/[0-9]{4}-1[0-2]|[1-9]-3[01]|[12][0-9]|[1-9]/)
