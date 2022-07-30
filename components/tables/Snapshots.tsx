import { DownloadIcon } from '@iconicicons/react'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { SerializedSnapshot } from '../../types'
import { formatDate } from '../../utils/format'
import AbstractTable from './Abstract'

const sizeFormatter = new Intl.NumberFormat('de-DE', { unit: 'kilobyte' })

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
          accessor: (e) => new Date(e.createdAt),
          Cell: ({ value }: CellProps<SerializedSnapshot, Date>) => <span>{formatDate(value)}</span>
        },
        {
          Header: 'MD5',
          id: 'md5',
          accessor: (e) => e.md5,
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['md5']>) => (
            <span className="font-mono text-sm">{value}</span>
          )
        },
        {
          Header: 'Größe',
          id: 'size',
          accessor: (e) => e.size,
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['size']>) => (
            <span>{value ? sizeFormatter.format(value) : '-'}</span>
          )
        },
        {
          Header: '',
          id: 'download',
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
