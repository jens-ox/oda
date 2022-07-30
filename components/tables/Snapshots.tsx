import { DownloadIcon } from '@iconicicons/react'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { SerializedSnapshot } from '../../types'
import AbstractTable from './Abstract'

const formatDate = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short', timeStyle: 'short' })

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
          Cell: ({ value }: CellProps<SerializedSnapshot, SerializedSnapshot['createdAt']>) => (
            <span>{formatDate.format(new Date(value))}</span>
          )
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

  return <AbstractTable columns={columns} data={tableData} />
}

export default SnapshotsTable
