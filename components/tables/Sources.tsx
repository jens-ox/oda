import { LinkIcon } from '@iconicicons/react'
import { Source } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import AbstractTable from './Abstract'

const SourcesTable: React.FC<{
  sources: Array<Source>
}> = ({ sources }) => {
  const tableData = useMemo(() => sources, [sources])

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Name',
          id: 'name',
          accessor: (e) => e.name,
          Cell: ({ value, row }: CellProps<Source, Source['name']>) => (
            <Link href={`/source/${row.original.id}`}>
              <div className="cursor-pointer text-indigo-600 underline">{value}</div>
            </Link>
          )
        },
        {
          Header: 'Beschreibung',
          id: 'description',
          accessor: (e) => e.description
        },
        {
          Header: 'Stelle',
          id: 'office',
          accessor: (e) => e.office
        },
        {
          Header: 'Quelle',
          id: 'source',
          accessor: (e) => e.url,
          Cell: ({ value }: CellProps<Source, Source['url']>) => (
            <a target="_blank" href={value}>
              <LinkIcon />
            </a>
          )
        }
      ] as Array<Column<Source>>,
    []
  )

  return <AbstractTable columns={columns} data={tableData} />
}

export default SourcesTable
