import { SchemaList } from '@/components/SchemaList'

export default async () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="prose">
        <h1>Schemas</h1>
        <p>
          Alle hier verfügbaren Datensätze haben ein{' '}
          <a href="https://json-schema.org/" target="_blank">
            JSON-Schema
          </a>
          . Damit lässt sich die Einheitlichkeit der Daten gewährleisten und sie können einfacher
          integriert werden.
        </p>
      </div>

      <SchemaList />
    </div>
  )
}
