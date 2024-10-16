// parent has "use client"

import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner";
import EditDeviceForm from "./EditDeviceForm";
import { revalidatePathClient } from "@/lib/server-actions/revalidatePathClient";




export default function EditDevicesSheet({ deviceInfo, closeSheet }) {

    // If Submission is successful
    const successfulSubmission = () => {
        closeSheet();

        revalidatePathClient('/inventory');
        revalidatePathClient('/');
        toast.success('Device(s) updated succesfully');
    }

    return (
        <>
            <SheetContent onInteractOutside={(e) => { e.preventDefault() }}
                className="flex flex-col"
            >
                <SheetHeader>
                    <SheetTitle>Edit Device(s)</SheetTitle>
                </SheetHeader>
                {/* Tabs */}

                {/* Single */}
                <ScrollArea className="w-full flex-1">
                    <EditDeviceForm deviceInfo={deviceInfo} successfulSubmission={successfulSubmission} />
                </ScrollArea>

            </SheetContent>
        </>
    )
}
