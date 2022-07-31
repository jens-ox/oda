import { DownloadIcon } from '@iconicicons/react'
import Link from 'next/link'
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
          Cell: ({ value, row }: CellProps<SerializedSnapshot, SerializedSnapshot['md5']>) => (
            <Link href={`/snapshot/${row.original.id}`}>
              <div className="cursor-pointer text-indigo-600 dark:text-indigo-400 underline font-mono">{value}</div>
            </Link>
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
            <a href={`/api/snapshot/${value}`} target="_blank" className="flex justify-end">
              <DownloadIcon />
            </a>
          )
        }
      ] as Array<Column<SerializedSnapshot>>,
    []
  )

  return <AbstractTable columns={columns} data={tableData} withPagination />
}

export default SnapshotsTable
