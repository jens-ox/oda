import { Source } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import SourcesTable from '../components/tables/Sources'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await prisma.source.findMany()

  return {
    props: {
      sources: data
    }
  }
}

interface HomeProps {
  sources: Array<Source>
}

const Home: NextPage<HomeProps> = ({ sources }) => {
  return (
    <div className="flex flex-col gap-16">
      <header>
        <h1 className="font-serif text-5xl">Bundesdatenkrake</h1>
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
