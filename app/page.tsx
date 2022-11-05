import classNames from 'classnames'
import SourcesTable from '../components/tables/Sources'
import prisma from '../lib/prisma'
import { SourceWithSnapshot } from '../types'
import { ebGaramond } from '../utils/fonts'

interface HomeProps {
  sources: Array<SourceWithSnapshot>
}

const loadData = async (): Promise<HomeProps> => {
  const data = await prisma.source.findMany({
    include: {
      snapshots: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  })

  return {
    sources: data.map((s) => ({
      ...s,
      snapshots: s.snapshots.map((snap) => ({ ...snap, createdAt: snap.createdAt.toString() }))
    }))
  }
}

const Home = async () => {
  const { sources } = await loadData()
  return (
    <div className="flex flex-col gap-16">
      <header>
        <h1 className={classNames(ebGaramond.className, 'text-5xl')}>Bundesdatenkrake</h1>
        <small className="text-stone-500">
          Extraktion, Versionierung und maschinenlesbare Bereitstellung öffentlicher Daten.
        </small>
      </header>

      <main>
        <SourcesTable sources={sources} />
      </main>
    </div>
  )
}

export default Home
