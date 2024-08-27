import { z } from 'zod'

export const Address = z
  .object({
    street: z.string().describe('Straßenname.'),
    houseNo: z.string().describe('Hausnummer.'),
    plz: z.string().describe('Postleitzahl.'),
    city: z.string().describe('Name der Stadt.')
  })
  .describe('Eine Adresse, ähnlich zu http://microformats.org/wiki/h-card.')
