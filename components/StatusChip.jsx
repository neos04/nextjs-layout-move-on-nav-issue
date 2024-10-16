import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const statusChipVariants = cva(
    "inline-flex items-center gap-2.5 font-medium rounded-full px-2.5 py-1",
    {
        variants: {
            variant: {
                green:
                    "bg-green-100",
                red:
                    "bg-red-100",
                blue: "bg-blue-100",
                yellow: "bg-yellow-100",
                purple: "bg-purple-100",
                gray: "bg-gray-100",
            },
        },
        defaultVariants: {
            variant: "green",
        },
    }
)

const circleVariants = cva(
    "circle | w-3 h-3 rounded-full",
    {
        variants: {
            variant: {
                green:
                    "bg-green-500",
                red:
                    "bg-red-500",
                blue: "bg-blue-500",
                yellow: "bg-yellow-500",
                purple: "bg-purple-500",
                gray: "bg-gray-500",
            },
        },
        defaultVariants: {
            variant: "green",
        },
    }
)



export default function StatusChip({
    className,
    variant,
    status,
    children,
    ...props
}) {
    return (
        <div className={cn(statusChipVariants({ variant }), className)} {...props}>
            {/* Circle */}
            <div className={cn(circleVariants({ variant }))}></div>
            {/* Status */}
            {children}
        </div>);
}
