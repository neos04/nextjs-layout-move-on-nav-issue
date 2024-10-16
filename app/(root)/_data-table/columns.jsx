"use client"

// import DataTableRowActions from "./actions/row-actions/data-table-row-actions"
import StatusChip from "@/components/StatusChip"

export const columns = [
    {
        accessorKey: "log_id",
        header: "Log ID",
    },
    {
        accessorKey: "device_id",
        header: "Device ID",
    },
    {
        accessorKey: "assignee",
        header: "Assignee",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")

            return (
                <>
                    <StatusChip
                        variant={status === "TBA" ? "gray" : status === "Returned" ? "purple" : status === "Assigned" && "blue"}
                    >
                        {status}
                    </StatusChip>
                </>
            )
        },
    },
    {
        accessorKey: "area_coordinator",
        header: "Area Coordinator",
        cell: ({ row }) => {
            const area_coordinator = row.getValue("area_coordinator")

            return (
                <>
                    {area_coordinator ? area_coordinator : "N/A"}
                </>
            )
        },
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => {
            const timestamp = row.getValue("timestamp");
            const utcTimestamp = new Date(timestamp);
            const localTimestamp = utcTimestamp.toLocaleString('en-US', { timeZone: 'America/Grenada' });

            return (
                <>
                    {localTimestamp}
                </>
            )
        },
    },
]

