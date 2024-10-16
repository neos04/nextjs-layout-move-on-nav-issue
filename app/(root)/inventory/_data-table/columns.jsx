"use client"

import DataTableRowActions from "./actions/row-actions/data-table-row-actions"
import StatusChip from "@/components/StatusChip"

// Options/Enums for Faceted Filters
export const statuses = [
    {
        value: "Available",
        label: "Available",
    },
    {
        value: "Unavailable",
        label: "Unavailable",
    },
    {
        value: "Under Maintenance",
        label: "Under Maintenance",
    },
]
export const device_types = [
    {
        value: "Tablet",
        label: "Tablet",
    },
    {
        value: "Laptop",
        label: "Laptop",
    },
    {
        value: "Desktop",
        label: "Desktop",
    },
    {
        value: "Monitor",
        label: "Monitor",
    },
    {
        value: "Printer",
        label: "Printer",
    },
    {
        value: "Projector",
        label: "Projector",
    },
]

// Columns for Data Table
export const columns = [
    // Select
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },

    {
        accessorKey: "device_id",
        header: "Device ID",
    },
    {
        accessorKey: "serial_no",
        header: "Serial No.",
    },
    {
        accessorKey: "type",
        header: "Device Type",
        cell: ({ row }) => {
            const deviceType = device_types.find(
                (deviceType) => deviceType.value === row.getValue("type")
            )

            if (!deviceType) {
                return null
            }

            return (
                <>
                    {deviceType.label}
                </>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "contact_no",
        header: "Contact No.",
        cell: ({ row }) => {
            const contact = row.getValue("contact_no")

            return (
                <>
                    {contact ? contact : "N/A"}
                </>
            )
        },
    },
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
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const deviceInfo = row.original;

            return (
                <>
                    <DataTableRowActions deviceInfo={deviceInfo} />
                </>
            )
        },
    },
]

