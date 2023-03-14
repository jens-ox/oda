'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { sources } from '../sources'

export const SourceList: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredSources = useMemo(
    () => sources.filter((s) => s.name.toLowerCase().includes(search.toLowerCase().trim())),
    [sources, search]
  )

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Datenquellen durchsuchen"
        className="rounded bg-white px-4 py-2 border border-slate-200 focus:border-slate-400 outline-none transition duration-200"
      />
      {filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <Link href={`/source/${source.id}`} key={source.id}>
              <div className="rounded-lg border border-slate-400/25 hover:border-slate-400/50 bg-white p-2">
                <div className="flex flex-col gap-4 justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{source.name}</h3>
                    <p className="text-sm text-slate-600">{source.description}</p>
                  </div>
                  <div className="text-sm text-slate-600">{source.sourceName}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-slate-600 italic">Keine passenden Datenquellen gefunden :(</p>
      )}
    </>
  )
}
