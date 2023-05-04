import { SourceList } from '@/components/SourceList'

export const metadata = {
  title: 'Bundesdatenkrake',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦑</text></svg>'
  }
}

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
