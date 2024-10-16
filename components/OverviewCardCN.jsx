import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tablet } from "lucide-react"

const OverviewCardCN = () => {
    return (
        <Card className="h-[153px]">
            <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                    
                    {/* Icon wrapper & Icon */}
                    <div className="p-1 bg-green-100 rounded">
                        <Tablet size={20} />
                    </div>

                    {/* Title */}
                    <h4>Title</h4>

                </div>
            </CardHeader>
            <CardContent className="p-4">
                <p>Card Content</p>
            </CardContent>
        </Card>

    )
}

export default OverviewCardCN