"use client"

import {
    flexRender,
    getCoreRowModel,
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
import StatusChip from "@/components/StatusChip"
import { statuses } from "../../../columns"


export default function BasicTable({ data }) {

    const columns = [

        // Device ID
        {
            accessorKey: "device_id",
            header: "Device ID",
        },
        // Serial No
        {
            accessorKey: "serial_no",
            header: "Serial No.",
        },
        // Device Type
        {
            accessorKey: "type",
            header: "Device Type",
        },
        // Brand
        {
            accessorKey: "brand",
            header: "Brand",
        },
        // Model
        {
            accessorKey: "model",
            header: "Model",
        },
        // Has SIM
        {
            accessorKey: "has_sim",
            header: "Has SIM?",
            cell: ({ row }) => {
                const has_sim = row.getValue("has_sim")

                return (
                    <>
                        {/* <Switch
                            disabled={true}
                            checked={has_sim}
                        /> */}

                        {has_sim ? "Yes" : "No"}
                    </>
                )
            },
        },
        // Contact No
        {
            accessorKey: "contact_no",
            header: "Contact No.",
            cell: ({ row }) => {
                const contact_no = row.getValue("contact_no")

                return (
                    <>
                        {contact_no ? contact_no : "N/A"}
                    </>
                )
            },
        },
        // Sponsor
        {
            accessorKey: "sponsor",
            header: "Sponsor?",
            cell: ({ row }) => {
                const sponsor = row.getValue("sponsor")

                return (
                    <>
                        {sponsor ? sponsor : "N/A"}
                    </>
                )
            },
        },
        // Status
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                // const status = row.getValue("status")
                const status = statuses.find(
                    (status) => status.value === row.getValue("status")
                )

                if (!status) {
                    return null
                }

                return (
                    <>
                        <StatusChip
                            variant={status.label === "Unavailable" ? "red" : status.label === "Under Maintenance" ? "yellow" : "green"}
                        >
                            {status.label}
                        </StatusChip>
                    </>
                )
            },
        },
    ]

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), })


    return (

        <div className="rounded-md border overflow-auto">
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

    )
}
