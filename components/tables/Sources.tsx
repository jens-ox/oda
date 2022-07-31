import { LinkIcon } from '@iconicicons/react'
import { Source } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { SourceWithSnapshot } from '../../types'
import { formatDate } from '../../utils/format'
import AbstractTable from './Abstract'

const SourcesTable: React.FC<{
  sources: Array<SourceWithSnapshot>
}> = ({ sources }) => {
  const tableData = useMemo(() => sources, [sources])

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Name',
          id: 'name',
          width: 20,
          accessor: (e) => e.name,
          Cell: ({ value, row }: CellProps<Source, Source['name']>) => (
            <Link href={`/source/${row.original.id}`}>
              <div className="cursor-pointer text-indigo-600 dark:text-indigo-400 underline">{value}</div>
            </Link>
          )
        },
        {
          Header: 'Letzte Änderung',
          id: 'changedAt',
          width: 15,
          accessor: (e) => new Date(e.snapshots[0].createdAt),
          Cell: ({ value }: CellProps<SourceWithSnapshot, Date>) => <span>{formatDate(value)}</span>
        },
        {
          Header: 'Beschreibung',
          id: 'description',
          width: 35,
          accessor: (e) => e.description
        },
        {
          Header: 'Stelle',
          id: 'office',
          width: 25,
          accessor: (e) => e.office
        },
        {
          Header: '',
          id: 'source',
          width: 5,
          accessor: (e) => e.url,
          Cell: ({ value }: CellProps<Source, Source['url']>) => (
            <a target="_blank" href={value} className="flex justify-end">
              <LinkIcon />
            </a>
          )
        }
      ] as Array<Column<SourceWithSnapshot>>,
    []
  )

  return <AbstractTable columns={columns} data={tableData} />
}

export default SourcesTable
