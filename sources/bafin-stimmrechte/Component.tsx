import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import AbstractTable from '../../components/tables/Abstract'
import { formatDate, formatPercent, stringToDate } from '../../utils/format'
import { BafinResult } from './types'

const PercentageCell = ({ value }: CellProps<BafinResult, number>) => (
  <div className="text-right tabular-nums">{value ? formatPercent(value / 100) : '-'}</div>
)

interface BafinStimmrechteProps {
  data: Array<BafinResult>
}

const BafinStimmrechte: React.FC<BafinStimmrechteProps> = ({ data }) => {
  const tableData = useMemo(() => data, [data])

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Veröffentlichung',
          id: 'veroeffentlichung',
          width: 10,
          sortType: (rowA, rowB, columnId, desc) => {
            const v1 = rowA.values[columnId]
            const v2 = rowB.values[columnId]
            if (typeof v1 === 'undefined') return desc ? -1 : 1
            if (typeof v2 === 'undefined') return desc ? 1 : -1
            return v1 - v2
          },
          accessor: (e) => (e.veroeffentlichung ? stringToDate(e.veroeffentlichung) : undefined),
          Cell: ({ value }: CellProps<BafinResult, Date | undefined>) => <span>{value ? formatDate(value) : '-'}</span>
        },
        {
          Header: 'Emittent',
          id: 'emittent',
          columns: [
            {
              Header: 'Name',
              id: 'emi-name',
              width: 10,
              accessor: (e) => e.emittent.name
            },
            {
              Header: 'Sitz',
              id: 'emi-sitz',
              width: 10,
              accessor: (e) => e.emittent.sitz
            },
            {
              Header: 'Land',
              id: 'emi-land',
              width: 10,
              accessor: (e) => e.emittent.land
            }
          ]
        },
        {
          Header: 'Meldepflichtiger',
          id: 'meldepflichtiger',
          columns: [
            {
              Header: 'Name',
              id: 'melde-name',
              width: 10,
              accessor: (e) => e.meldepflichtiger.name
            },
            {
              Header: 'Sitz',
              id: 'melde-sitz',
              width: 10,
              accessor: (e) => e.meldepflichtiger.sitz
            },
            {
              Header: 'Land',
              id: 'melde-land',
              width: 10,
              accessor: (e) => e.meldepflichtiger.land
            }
          ]
        },
        {
          Header: 'Stimmrechtsanteile',
          id: 'stimmrechtsanteile',
          columns: [
            {
              Header: 'Gesamt',
              id: 'stimmen-gesamt',
              width: 5,
              accessor: (e) => e.stimmrechtsanteile.gesamt,
              Cell: PercentageCell
            },
            {
              Header: 'Instrumente',
              id: 'stimmen-instrumente',
              width: 5,
              accessor: (e) => e.stimmrechtsanteile.instrumente,
              Cell: PercentageCell
            },
            {
              Header: 'Summe',
              id: 'stimmen-summe',
              width: 5,
              accessor: (e) => e.stimmrechtsanteile.summe,
              Cell: PercentageCell
            }
          ]
        }
      ] as Array<Column<BafinResult>>,
    []
  )

  // {
  //   "veroeffentlichung": "20131001T000000Z",
  //   "stimmrechtsanteile": {
  //     "gesamt": 3.59
  //   }
  // }

  return <AbstractTable columns={columns} data={tableData} withPagination />
}

export default BafinStimmrechte
