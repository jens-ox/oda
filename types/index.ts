import { ZodSchema } from 'zod'

export type Exporter<ResultType = unknown> = () => Promise<
  Array<{
    targetFile: string
    data: ResultType
  }>
>

export type ExporterMap<ResultType = unknown> = {
  id: string
  exporter: Exporter<ResultType>
}

export interface Source {
  id: string
  name: string
  description: string
  sourceName: string
  sourceLink: string
  schema?: ZodSchema
}
