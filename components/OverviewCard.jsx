import { Tablet } from "lucide-react"

const OverviewCard = ({ title, num, denom }) => {
    return (
        // Card
        <div className='card | rounded-lg border bg-card text-card-foreground shadow-sm | p-4 h-[153px]'>
            {/* container */}
            <div className="cont | flex flex-col gap-4 justify-between h-full">
                {/* Title */}
                <div className="flex items-center gap-3">
                    {/* Icon wrapper & Icon */}
                    <div className="p-1 bg-green-100 dark:bg-green-100/40 rounded">
                        <Tablet size={20} />
                    </div>
                    {/* Title */}
                    <h5 className="font-medium">{title ?? "Title"}</h5>
                </div>

                {/* Content */}
                <p className="text-6xl">
                    {num ?? "Num"}
                    <span className="denom | text-[24px]">
                        /
                        {denom ?? "denom"}
                    </span>
                </p>

            </div>

        </div>
    )
}

export default OverviewCard