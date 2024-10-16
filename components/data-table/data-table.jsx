"use client"

import {
    // ColumnFiltersState,
    // SortingState,
    // VisibilityState,
    flexRender,
    getCoreRowModel,
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

import { Button } from "@/components/ui/button"


import { useMemo, useState } from "react"
import SearchBar from "@/components/SearchBar"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { DataTablePagination } from "@/components/data-table/DataTablePagination"
import AddDevices from "./actions/add-devices/add-devices"
import { useDebounce } from "use-debounce"

export function DataTable({ columns, data, searchPlaceholder, searchableColumn }) {

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
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        onGlobalFilterChange: setGlobalFilter,
        state: {
            columnVisibility,
            rowSelection,
            globalFilter: debouncedFilter,
        },
    })

    return (
        <div className="space-y-5">
            {/* Toolbar / Options */}
            <div className="flex items-center justify-between flex-wrap-reverse gap-5">
                {/* Left */}
                <div className="flex flex-grow items-center gap-5">
                    {/* Column Filter */}
                    {/* <SearchBar
                        placeholder={searchPlaceholder}
                        value={(table.getColumn(searchableColumn)?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchableColumn)?.setFilterValue(event.target.value)
                        }
                    /> */}

                    {/* Global Filter */}
                    <SearchBar
                        placeholder={searchPlaceholder ?? "Filter..."}
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />


                    {/* Columns Visibility */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" /* className="ml-auto" */>
                                Columns <ChevronDown size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            // className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Aciton Button(s) */}
                <AddDevices />
            </div>

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
