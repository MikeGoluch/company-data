import React, { useState } from "react";
import { useTable, useFilters } from "react-table";

export default function Table({ columns, data }) {
    const [inputNameFilter, setInputNameFilter] = useState('');
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable({
        columns,
        data
    }, useFilters);

    const filterChangeHandler = e => {
        const inputValue = e.target.value || undefined;
        setFilter('name', inputValue);
        setInputNameFilter(inputValue);
    }

    return (
        <div>
            <input
                value={inputNameFilter}
                onChange={filterChangeHandler}
                placeholder={'Filter company name'} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}