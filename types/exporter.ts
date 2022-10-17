export type Exporter<ResultType = unknown, DiffType = unknown, DigestType = unknown> = {
  result: () => Promise<ResultType>
  diff: (previousResult: ResultType, newResult: ResultType) => DiffType | null
  digest: (diff: DiffType | null) => DigestType | null
}
