import { Source } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'
import SnapshotsTable from '../../components/tables/Snapshots'
import prisma from '../../lib/prisma'
import { SerializedSnapshot } from '../../types'

interface SourcePageProps {
  source: Source | null
  snapshots: Array<SerializedSnapshot> | null
}

export const getServerSideProps: GetServerSideProps<SourcePageProps> = async ({ params }) => {
  const id = params?.id ?? 'unknown'

  const data = await prisma.source.findFirst({
    where: {
      id: `${id}`
    },
    include: {
      snapshots: true
    }
  })

  if (data === null)
    return {
      props: {
        source: null,
        snapshots: null
      }
    }

  const { snapshots, ...source } = data

  return {
    props: {
      source,
      snapshots: snapshots.map((s) => ({ ...s, createdAt: s.createdAt.toString() }))
    }
  }
}

const SourcePage: NextPage<SourcePageProps> = ({ source, snapshots }) => {
  return (
    <div>
      {source === null ? (
        <p>Quelle nicht gefunden</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-serif font-medium text-5xl">{source.name}</h1>
            <small className="text-stone-600">{source.description}</small>
            <small className="text-stone-600">
              —{' '}
              <a href={source.url} className="underline">
                {source.office}
              </a>
            </small>
          </div>
          {snapshots === null ? <p>Keine Snapshots gefunden</p> : <SnapshotsTable snapshots={snapshots} />}
        </div>
      )}
    </div>
  )
}

export default SourcePage
