import { ZodSchema } from 'zod'

export type Exporter = () => Promise<
  Array<{
    targetFile: string
    data: unknown
  }>
>

export type ExporterMap = {
  id: string
  exporter: Exporter
}

export interface Source {
  id: string
  name: string
  description: string
  sourceName: string
  sourceLink: string
  targets?: Record<string, ZodSchema>
}
