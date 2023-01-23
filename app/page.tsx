import { SourceList } from '../components/SourceList'

const Home = async () => (
  <div className="flex flex-col gap-16">
    <header>
      <h1 className="font-serif text-5xl">Bundesdatenkrake</h1>
      <small className="text-stone-500">
        Extraktion, Versionierung und maschinenlesbare Bereitstellung öffentlicher Daten.
      </small>
    </header>

    <main className="flex flex-col gap-6">
      <SourceList />
    </main>
  </div>
)

export default Home
