import { Button } from "@/components/ui/button"
import SearchBar from "@/components/SearchBar"

import { X } from "lucide-react"
import AddDevices from "./actions/add-devices/add-devices"
import { device_types, statuses } from "./columns"
import { DataTableFacetedFilter } from "@/components/data-table/DataTableFacetedFilter"
import DataTableViewOptions from "@/components/data-table/DataTableViewOptions"

export default function DataTableToolbar({ table, globalFilter, setGlobalFilter }) {
    // For Faceted filter
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between flex-wrap-reverse gap-5">
            {/* Left */}
            <div className="flex flex-grow max-lg:flex-wrap items-center gap-4">

                {/* Global Filter */}
                <SearchBar
                    placeholder={"Filter..."}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />

                {/* Faceted Filter 1: Status */}
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}

                {/* Faceted Filter 2: Device Type */}
                {table.getColumn("type") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("type")}
                        title="Device Type"
                        options={device_types}
                    />
                )}

                {/* Faceted Reset */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-10 px-2 lg:px-3"
                    >
                        Reset
                        <X size={16} />
                    </Button>
                )}


                {/* Columns Visibility */}
                <DataTableViewOptions table={table} />
            </div>

            {/* Aciton Button(s) */}
            <AddDevices />
        </div>
    )
}
