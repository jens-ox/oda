'use client'

import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@iconicicons/react'
import React, { useMemo, useState } from 'react'
import { Row, useGlobalFilter, usePagination, useSortBy, useTable, Column, useFlexLayout } from 'react-table'
import DoubleChevronLeft from '../icons/DoubleChevronLeft'
import DoubleChevronRight from '../icons/DoubleChevronRight'

// search component
function GlobalFilter({ globalFilter, setGlobalFilter }: any) {
  const [value, setValue] = useState(globalFilter)
  const onChange = (value: string) => setGlobalFilter(value)

  return (
    <div className="flex items-center mb-2 pl-4">
      <label htmlFor="searchList">
        <SearchIcon className="text-stone-400 mr-5" />
      </label>
      <input
        type="text"
        id="searchList"
        placeholder="Suchen..."
        className="px-2 py-1 bg-transparent"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </div>
  )
}

const AbstractTable: React.FC<{
  columns: Array<Column<any>>
  data: Array<any>
  withPagination?: boolean
}> = ({ columns, data, withPagination }) => {
  const isFalsy = (val: any): boolean =>
    typeof val === 'undefined' || (Array.isArray(val) && val.length === 0) || val === null
  const sortTypes = useMemo(
    () => ({
      numericFalsyLast(rowA: Row<any>, rowB: Row<any>, columnId: string, desc?: boolean) {
        if (isFalsy(rowA.original[columnId]) && isFalsy(rowB.original[columnId])) {
          return 0
        }

        if (isFalsy(rowA.original[columnId])) {
          return desc ? -1 : 1
        }

        if (isFalsy(rowB.original[columnId])) {
          return desc ? 1 : -1
        }

        return Array.isArray(rowA.original[columnId])
          ? Math.max(...rowA.original[columnId]) - Math.max(...rowB.original[columnId])
          : rowA.original[columnId] - rowB.original[columnId]
      },
      idStringArray(rowA: Row<any>, rowB: Row<any>, columnId: string) {
        return rowA.original[columnId].localeCompare(rowB.original[columnId])
      }
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, sortTypes, initialState: { pageIndex: 0, pageSize: withPagination ? 10 : 10000 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout
  )

  return (
    <div className="text-sm w-full">
      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
      <table {...getTableProps()} className="table w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="inline-flex items-center">
                    {column.isSorted ? (
                      <span className="font-semibold">{column.render('Header')}</span>
                    ) : (
                      column.render('Header')
                    )}
                    <span className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownIcon />
                        ) : (
                          <ArrowUpIcon />
                        )
                      ) : (
                        <ArrowUpIcon className="opacity-0" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {withPagination && (
        <div className="flex justify-between rounded px-2 py-1">
          <div className="buttons">
            <button className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <DoubleChevronLeft />
            </button>
            <button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
              <ChevronLeftIcon />
            </button>
            <button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
              <ChevronRightIcon />
            </button>
            <button className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              <DoubleChevronRight />
            </button>
          </div>
          <div>
            <span>
              Seite{' '}
              <strong>
                {pageIndex + 1} von {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Gehe zu Seite:{' '}
              <input
                type="number"
                className="bg-transparent rounded border border-stone-400 px-2 py-1"
                style={{ width: '4rem' }}
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
              />
            </span>{' '}
            <select
              className="bg-transparent"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} anzeigen
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default AbstractTable
