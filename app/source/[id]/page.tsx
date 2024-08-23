import { join, resolve } from 'path'
import { glob } from 'glob'
import { sources } from '@/sources'
import { FileComponent } from '@/components/File'
import { Callout, Link } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

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

  if (!source)
    return (
      <div>
        <Callout.Root color="red" role="alert" variant="surface">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Quelle nicht gefunden :(</Callout.Text>
        </Callout.Root>
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-7 font-medium">{source.name}</h1>
        <p>
          {source.description} -{' '}
          <Link href={source.sourceLink} target="_blank" rel="noreferrer noopener">
            {source.sourceName}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-4 font-medium">Dateien</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.files.map((f) => (
            <FileComponent base={data.base} file={f} id={params.id} key={f} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SourcePage
