'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Card, TextField } from '@radix-ui/themes'
import { schemas } from '@/schemas'
import zodToJsonSchema from 'zod-to-json-schema'

export const SchemaList: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredSchemas = useMemo(
    () =>
      Object.entries(schemas)
        .filter(([id]) => id.toLowerCase().includes(search.toLowerCase().trim()))
        .map(([id, schema]) => ({ id, schema })),
    [schemas, search]
  )

  return (
    <div className="flex flex-col gap-4">
      <TextField.Root
        type="text"
        size="3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Schemas durchsuchen"
      />
      {filteredSchemas.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredSchemas.map((s) => (
            <Card asChild>
              <Link href={`/schema/${s.id}`} key={s.id}>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="font-bold font-mono tracking-9">{s.id}</h3>
                  </div>
                  <p>{zodToJsonSchema(s.schema).description}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-slate-600 italic">Keine passenden Schemas gefunden :(</p>
      )}
    </div>
  )
}
