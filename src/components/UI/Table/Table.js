import React, { useState } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import classes from './Table.module.css';

export default function Table({ columns, data }) {
    const [inputNameFilter, setInputNameFilter] = useState('');
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        pageOptions,
        page,
        state: { pageIndex, pageSize },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters,
        useSortBy,
        usePagination);

    const filterChangeHandler = e => {
        const inputValue = e.target.value || undefined;
        setFilter('name', inputValue);
        setInputNameFilter(inputValue);
    }

    return (
        <div>
            <input
                className={classes.FilterInput}
                value={inputNameFilter}
                onChange={filterChangeHandler}
                placeholder={'Filter company name'} />
            <table className={classes.Table} {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='sort-desc'>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={classes.Pagination}>
                <button onClick={() => previousPage()}
                    disabled={!canPreviousPage}>Previous page</button>
                <button onClick={() => nextPage()}
                    disabled={!canNextPage}>Next page</button>
                <div className={classes.Page}>
                    Page{' '}
                    <em>
                        {pageIndex + 1} of {pageOptions.length}
                    </em>
                </div>
                <div className={classes.GoToPage}>
                    <p>Go to page:</p>
                    <input
                        type='number'
                        defaultValue={pageIndex + 1 || 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                    />
                </div>
                <select
                    className={classes.SelectPage}
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Display {pageSize} results
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}