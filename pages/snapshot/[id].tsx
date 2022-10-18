import { GetServerSideProps, NextPage } from 'next'
import { getData } from '../../lib/aws'
import prisma from '../../lib/prisma'
import visualizationSources from '../../sources/visualizations'
import { SerializedSnapshot } from '../../types'

interface SnapshotPageProps {
  snapshot: SerializedSnapshot | null
  data?: unknown
}

export const getServerSideProps: GetServerSideProps<SnapshotPageProps> = async ({ params }) => {
  const id = params?.id ? parseInt(params.id as string) : -1

  const snapshot = await prisma.snapshot.findFirst({
    where: {
      id
    }
  })

  if (snapshot === null)
    return {
      props: {
        snapshot: null
      }
    }

  // check if a visualization exists for the sourceId
  const hasVisualization =
    typeof visualizationSources.find((s) => s.id === snapshot.sourceId)?.Component !== 'undefined'

  const data = hasVisualization ? await getData(snapshot.md5) : null

  return {
    props: {
      snapshot: {
        ...snapshot,
        createdAt: snapshot?.createdAt.toString()
      },
      data
    }
  }
}

const SnapshotPage: NextPage<SnapshotPageProps> = ({ snapshot, data }) => {
  const Component = visualizationSources.find((s) => s.id === snapshot?.sourceId)?.Component
  const hasVisualization = typeof Component !== 'undefined'

  return (
    <div>
      {snapshot === null ? (
        <p>Snapshot nicht gefunden</p>
      ) : (
        <div className="flex flex-col gap-12">
          <h1 className="font-serif font-medium text-5xl">Snapshot {snapshot.md5}</h1>
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
