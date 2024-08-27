'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { sources } from '@/sources'
import { Card, TextField } from '@radix-ui/themes'

export const SourceList: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredSources = useMemo(
    () => sources.filter((s) => s.name.toLowerCase().includes(search.toLowerCase().trim())),
    [sources, search]
  )

  return (
    <div className="flex flex-col gap-4">
      <TextField.Root
        size="3"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Datenquellen durchsuchen"
      />
      {filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <Card asChild>
              <Link href={`/source/${source.id}`} key={source.id}>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="font-medium">{source.name}</h3>
                    <div className="text-2 text-slate-11">{source.sourceName}</div>
                  </div>
                  <p>{source.description}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-slate-600 italic">Keine passenden Datenquellen gefunden :(</p>
      )}
    </div>
  )
}
