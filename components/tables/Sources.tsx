import { LinkIcon } from '@iconicicons/react'
import { Source } from '@prisma/client'
import React, { useMemo } from 'react'
import { Column } from 'react-table'
import AbstractTable from './Abstract'

type Value<T> = {
  value: T
}

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
          accessor: (e) => e.name
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
          Cell: ({ value }: Value<Source['url']>) => (
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
