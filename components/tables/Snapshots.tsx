'use client'

import { DownloadIcon } from '@iconicicons/react'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { SerializedSnapshot } from '../../types'
import { formatDate } from '../../utils/format'
import AbstractTable from './Abstract'

const sizeFormatter = new Intl.NumberFormat('de-DE', { style: 'unit', unit: 'kilobyte' })

const SnapshotsTable: React.FC<{
  snapshots: Array<SerializedSnapshot>
}> = ({ snapshots }) => {
  const tableData = useMemo(() => snapshots, [snapshots])

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Datum',
          id: 'date',
          width: 10,
          accessor: (e) => new Date(e.createdAt),
          Cell: ({ value }: CellProps<SerializedSnapshot, Date>) => <span>{formatDate(value)}</span>
        },
        {
          Header: 'MD5',
          id: 'md5',
          width: 40,
          accessor: (e) => e.md5,
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['md5']>) => (
            <div className="text-xs font-mono">{value}</div>
          )
        },
        {
          Header: 'Größe',
          id: 'size',
          width: 5,
          accessor: (e) => e.size,
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['size']>) => (
            <span>{value ? sizeFormatter.format(value) : '-'}</span>
          )
        },
        {
          Header: '',
          id: 'download',
          width: 5,
          accessor: (e) => e.md5,
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['md5']>) => (
            <div className="flex w-full justify-end">
              <a href={`/api/snapshot/${value}`}>
                <DownloadIcon />
              </a>
            </div>
          )
        }
      ] as Array<Column<SerializedSnapshot>>,
    []
  )

  return <AbstractTable columns={columns} data={tableData} withPagination />
}

export default SnapshotsTable
