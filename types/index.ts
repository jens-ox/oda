import { schemas } from '@/schemas'

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
  targets: Record<string, keyof typeof schemas>
}
