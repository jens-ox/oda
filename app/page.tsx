import { SourceList } from '@/components/SourceList'

const Home = async () => (
  <div className="flex flex-col gap-8">
    <header className="prose">
      <h1>Open Data Aggregator</h1>
      <p>Extraktion, Versionierung und maschinenlesbare Bereitstellung öffentlicher Daten.</p>
    </header>

    <SourceList />
  </div>
)

export default Home
