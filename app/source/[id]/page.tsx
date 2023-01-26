import { join, resolve } from 'path'
import { sources } from '../../../sources'
import { glob } from '../../../utils/glob'

interface SourcePageProps {
  params: {
    id: string
  }
}

const getData = async (id: string) => {
  // find matching files
  const path = join(resolve('./data'), id, '**')
  const matchingFiles = await glob(path)
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
      <div>
        <h3 className="font-serif text-xl">Files</h3>
        <ul className="list-disc">
          {data.files.map((file) => (
            <li className="ml-6">
              <a
                href={`https://github.com/jens-ox/bundesdatenkrake/blob/main${file.replace(data.base, '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-600 underline"
              >
                {file.split('/').pop()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SourcePage
