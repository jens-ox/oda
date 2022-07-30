import { Source } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import SourcesTable from '../components/tables/Sources'
import PrismaClient from '../lib/prisma'

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await PrismaClient.source.findMany()

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
    <div>
      <Head>
        <title>Bundesdatenkrake</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦑</text></svg>"
        />
      </Head>

      <header className="container mx-auto mt-12 mb-6">
        <h1 className="font-serif text-5xl">Bundesdatenkrake</h1>
        <small className="text-stone-500">
          Extraktion, Versionierung und maschinenlesbare Bereitstellung öffentlicher Daten.
        </small>
      </header>

      <main className="container mx-auto">
        <SourcesTable sources={sources} />
      </main>
    </div>
  )
}

export default Home
