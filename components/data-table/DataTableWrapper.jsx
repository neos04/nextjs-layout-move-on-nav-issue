export default function DataTableWrapper({ children }) {
    return (
        <div className="@container/data-table-wrapper p-6 border bg-background rounded-lg">
            {/* Inner Container */}
            <div className="inner_cont">
                {children}
            </div>
        </div>
    )
}
