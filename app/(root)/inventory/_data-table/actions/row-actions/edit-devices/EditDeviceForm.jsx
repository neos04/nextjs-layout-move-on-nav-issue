// Parent has "use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { deviceTypeOptions, sponsorOptions } from "@/lib/constants";


const sponsorOptionsValues = sponsorOptions.map(option => option.value);
const deviceTypeValues = deviceTypeOptions.map(option => option.value)



const editDeviceFormSchema = z.object({
    device_id: z.string().min(6, {
        message: "'device_id' must be at least 6 characters"
    }),
    serial_no: z.string().min(5, {
        message: "'serial_no' must be at least 6 characters"
    }).max(70, {
        message: "'serial_no' can't be greater than 70 characthers"
    }),
    type: z.enum(["Tablet", "Laptop", "Desktop", "Monitor", "Printer", "Projector"]),
    brand: z.string().min(2, {
        message: "'brand' must be at least 2 characters"
    }),
    model: z.string().min(2, {
        message: "'model' must be at least 2 characters"
    }),
    has_sim: z.boolean().default(false),
    contact_no: z.string().max(20, {
        message: "contact_no can't be greater than 20 characthers"
    }).optional(),
    sponsor: z.enum(["N/A", "WBP"]).optional(),
    status: z.enum(["Available", "Unavailable", "Under Maintenance"]),
}).refine((data) => {
    // Check if has_sim is true, then contact_no is required
    if (data.has_sim && data.contact_no < 7) {
        return !!data.contact_no
    }
    // If has_sim is false, contact_no is optional
    return true;
}, {
    // Add a custom error message for the refinement
    message: "If device has a SIM then 'contact_no' must be filled and have a min of 7 characters",
    path: ["contact_no"]
})



export default function EditDeviceForm({ deviceInfo, successfulSubmission }) {

    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(editDeviceFormSchema),
        defaultValues: {
            device_id: deviceInfo.device_id,
            serial_no: deviceInfo.serial_no,
            type: deviceInfo.type,
            brand: deviceInfo.brand,
            model: deviceInfo.model,
            has_sim: deviceInfo.has_sim,
            contact_no: deviceInfo.contact_no,
            sponsor: deviceInfo.sponsor ? deviceInfo.sponsor : undefined,
            status: deviceInfo.status,
        },
    })


    // watch has_sim state
    const hasSIM = form.watch("has_sim")

    // 2. Define a submit handler.
    async function onSubmit(values) {
        setIsLoading(true)

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const { data, error } = await supabase
            .from('Devices')
            .update([
                {
                    // device_id: values.device_id,
                    serial_no: values.serial_no,
                    type: values.type,
                    brand: values.brand,
                    model: values.model,
                    has_sim: values.has_sim,
                    contact_no: values.contact_no,
                    sponsor: values.sponsor,
                    status: values.status,
                }
            ])
            .eq('device_id', values.device_id)
            .select()

        if (error) {
            console.error('Supabase Error:', [error])
            toast.error(`An error occurred while interacting with Supabase. Check the browser's console for more details for now.`)
            setIsLoading(false)
        } else if (data) {
            // console.log(data)
            setIsLoading(false)
            successfulSubmission()
        }

    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1 pr-[10px]">
                {/* Device ID */}
                <FormField
                    control={form.control}
                    name="device_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Device ID</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. TAB100" {...field} disabled={true} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Serial No. */}
                <FormField
                    control={form.control}
                    name="serial_no"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Serial No.</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. ROCR000A0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Device Type */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Device Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="---" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {deviceTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Brand */}
                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Samsung" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Model */}
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Galaxy Tab S6" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Has SIM Switch */}
                <FormField
                    control={form.control}
                    name="has_sim"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Has SIM</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="block"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact No. */}
                <FormField
                    control={form.control}
                    name="contact_no"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact No.</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="+1(473)406-0000 or 406-0000"
                                    disabled={!hasSIM}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sponsor | Select Menu */}
                <FormField
                    control={form.control}
                    name="sponsor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sponsor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="min-w-[200px] w-fit">
                                        <SelectValue placeholder="---" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sponsorOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="---" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                                    <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 size={20} className="animate-spin" />}

                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    )
}
