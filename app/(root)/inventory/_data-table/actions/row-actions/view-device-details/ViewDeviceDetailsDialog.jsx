import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem, DropdownMenuItemDT } from "@/components/ui/dropdown-menu";
import { Eye } from "lucide-react";
import BasicTable from "./basic-table";

export default function ViewDeviceDetailsDialog({ deviceInfo }) {
    // console.log(deviceInfo)
    return (
        <>
            <DialogContent className="max-w-[80vw]" onInteractOutside={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>
                        All Device Info
                    </DialogTitle>
                </DialogHeader>

                <BasicTable data={[deviceInfo]} />

            </DialogContent>
        </>
    )
}
