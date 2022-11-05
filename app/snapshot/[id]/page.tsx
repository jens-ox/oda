import classNames from 'classnames'
import { getData } from '../../../lib/aws'
import prisma from '../../../lib/prisma'
import visualizationSources from '../../../sources/visualizations'
import { SerializedSnapshot } from '../../../types'
import { ebGaramond } from '../../../utils/fonts'

interface SnapshotData {
  snapshot: SerializedSnapshot | null
  data?: unknown
}

const loadData = async (id: number): Promise<SnapshotData> => {
  const snapshot = await prisma.snapshot.findFirst({
    where: {
      id
    }
  })

  if (snapshot === null)
    return {
      snapshot: null
    }

  // check if a visualization exists for the sourceId
  const hasVisualization =
    typeof visualizationSources.find((s) => s.id === snapshot.sourceId)?.Component !== 'undefined'

  const data = hasVisualization ? await getData(snapshot.md5) : null

  return {
    snapshot: {
      ...snapshot,
      createdAt: snapshot?.createdAt.toString()
    },
    data
  }
}

interface SnapshotPageProps {
  params: {
    id: string
  }
}

const SnapshotPage = async ({ params }: SnapshotPageProps) => {
  const id = parseInt(params.id ?? '-1')
  const { snapshot, data } = await loadData(id)
  const Component = visualizationSources.find((s) => s.id === snapshot?.sourceId)?.Component
  const hasVisualization = typeof Component !== 'undefined'

  return (
    <div>
      {snapshot === null ? (
        <p>Snapshot nicht gefunden</p>
      ) : (
        <div className="flex flex-col gap-12">
          <h1 className={classNames(ebGaramond.className, 'font-medium text-5xl')}>Snapshot {snapshot.md5}</h1>
          {hasVisualization ? (
            <div>
              <Component data={data as any} />
            </div>
          ) : (
            <p>Für Snapshots dieser Quelle existiert keine Visualisierung.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SnapshotPage
