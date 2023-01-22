export type Exporter<ResultType = unknown> = () => Promise<
  Array<{
    targetFile: string
    data: ResultType
  }>
>

export interface Source<ResultType = unknown> {
  id: string
  name: string
  description: string
  sourceName: string
  sourceLink: string
  exporter: Exporter<ResultType>
}
