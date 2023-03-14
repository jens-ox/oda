import { z } from 'zod'
import { deadStrings } from './format'

export const maybeEmptyString = z
  .string()
  .optional()
  .transform((s) => (deadStrings.includes(s) ? undefined : s))

export const dateString = z.string().regex(/[0-9]{4}-1[0-2]|[1-9]-3[01]|[12][0-9]|[1-9]/)
