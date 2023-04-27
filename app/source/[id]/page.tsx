import { join, resolve } from 'path'
import { glob } from 'glob'
import { sources } from '../../../sources'
import { FileComponent } from '../../../components/File'

interface SourcePageProps {
  params: {
    id: string
  }
}

const getData = async (id: string) => {
  // find matching files
  const path = join(resolve('./data'), id, '**')
  const matchingFiles = await glob(path, { nodir: true })
  return { files: matchingFiles, base: resolve('./') }
}

const SourcePage = async ({ params }: SourcePageProps) => {
  const source = sources.find((s) => s.id === params.id)

  const data = await getData(params.id)

  if (!source) return <p className="text-red-700 italic">Quelle nicht gefunden :(</p>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">{source.name}</h1>
        <small>
          <span className="text-slate-600">{source.description}</span> -{' '}
          <a href={source.sourceLink} className="text-indigo-700 underline" target="_blank" rel="noreferrer noopener">
            {source.sourceName}
          </a>
        </small>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.files.map((f) => (
            <FileComponent base={data.base} file={f} id={params.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SourcePage
