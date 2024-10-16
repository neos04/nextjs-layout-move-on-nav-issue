// Parent has "use client"
import supabase from "@/lib/supabaseClient";
import { useState } from "react";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { revalidatePathClient } from "@/lib/server-actions/revalidatePathClient";


export default function DeleteDeviceAlertDialog({ deviceInfo }) {
    const [isLoading, setIsLoading] = useState(false);

    // If Submission is successful
    const successfulSubmission = () => {
        revalidatePathClient('/inventory');
        revalidatePathClient('/');
        toast.success('Device deleted succesfully');
    }

    async function deleteDevice() {
        setIsLoading(true);

        const { error } = await supabase
            .from('Devices')
            .delete()
            .eq('device_id', deviceInfo.device_id)

        if (error) {
            console.error('Supabase Error:', [error]);
            toast.error(`An error occurred while interacting with Supabase. Check the browser's console for more details for now.`);
            setIsLoading(false);
        } else {
            // console.log(data)
            setIsLoading(false);
            successfulSubmission();
        }
    }


    return (
        <>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the device
                        from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        buttonVariant="destructive"
                        onClick={deleteDevice}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 size={20} className="animate-spin" />}

                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}
