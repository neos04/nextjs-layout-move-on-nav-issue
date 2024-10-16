"use client"

import {
    // ColumnFiltersState,
    // SortingState,
    // VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { useMemo, useState } from "react"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import { useDebounce } from "use-debounce"
import DataTableToolbar from "./data-table-toolbar"

export function DataTable({ columns, data, searchPlaceholder }) {

    // const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [debouncedFilter] = useDebounce(globalFilter, 500);


    // Memoize columns
    const finalColumnDef = useMemo(() => columns, [columns]);

    const table = useReactTable({
        data,
        columns: finalColumnDef,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),

        onRowSelectionChange: setRowSelection,

        onGlobalFilterChange: setGlobalFilter,
        state: {
            // sorting,
            // columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter: debouncedFilter,
        },
    })

    return (
        <div className="space-y-5">
            {/* Toolbar / Options */}
            <DataTableToolbar
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination, Etc. */}
            <DataTablePagination table={table} />
        </div>
    )
}
