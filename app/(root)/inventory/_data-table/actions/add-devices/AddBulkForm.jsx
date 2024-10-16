// Parent has "use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";


export default function AddBulkForm({ successfulSubmission }) {
    const [jsonData, setJsonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const convertCSVToJson = (csvData) => {
        try {
            const lines = csvData.split(/\r?\n/);

            // Extract the column headers from the first line
            const headers = lines[0].split(",").map(header => header.trim());

            const result = [];

            // Loop through each line of CSV data (excluding the headers)
            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].split(",");
                // const currentLine = lines[i].split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/); // Improved delimiter for handling quotes


                // Ensure the current line has the same number of columns as headers
                if (currentLine.length === headers.length) {
                    // Loop through each column and map it to its corresponding headers
                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentLine[j].trim();
                    }
                    result.push(obj);
                }
            }

            return result;
        } catch (error) {
            console.error("An error occurred:", error.message);
            return ["An Error Occurred in the parsing process. Please check your CSV file."];
        }
    };

    // Function to handle the file input change
    const handleCSVInputChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            // No file selected, clear the jsonData state
            setJsonData(null);
            return;
        }

        // Check if the file type is CSV
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'csv') {

            // Invalid file type, handle accordingly (display an error message, for example)
            if (jsonData) { setJsonData(null) }
            toast.error('Invalid file type. Please select a CSV file.', { duration: 5000, });
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const csvData = e.target.result;

            // Call the function to convert CSV to JSON
            const jsonData = convertCSVToJson(csvData);
            setJsonData(jsonData);
            // console.log(jsonData);
        }

        try {
            reader.readAsText(file);
        } catch (error) {
            console.error(error)
        }

        // reader.readAsText(file);
    }

    // onSubmit
    async function onSubmit() {
        setIsLoading(true);

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const { data, error } = await supabase
            .from('Devices')
            .insert(jsonData)
            .select()

        if (error) {
            console.error('Supabase Error:', [error]);
            toast.error(`An error occurred while interacting with Supabase. Check the browser's console for more details for now.`);
            setIsLoading(false);
        } else if (data) {
            // console.log(data);
            setIsLoading(false);
            successfulSubmission();
        }

    }



    return (
        <div className="space-y-4">
            <AlertDialog>
                <div>
                    <p className="inline">
                        Please ensure your CSV file matches the following
                    </p>
                    <span className="ml-1">
                        <AlertDialogTrigger>
                            <u>Template</u>
                        </AlertDialogTrigger>
                    </span>
                </div>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Would you like to download the template?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will download the XLSX (Excel) file to your device, which you will then save as a CSV file after editing to upload.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            asChild
                        >
                            <a href="/assets/csv-templates/cso_dims_add_devices.xlsx" download>
                                Download
                            </a>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <Input id="csv" type="file" accept=".csv"
                onChange={handleCSVInputChange}
                className=""
            />
            <p>JSON Preview:</p>

            {/* Conditional rendering based on wether there is JSON data */}
            {jsonData ? (
                // Json Container
                <ScrollArea className="w-full h-[50vh] bg-muted rounded-md border p-3">
                    <div>
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    </div>
                </ScrollArea>
            ) : (
                // Display a meesage when no file is available
                <p className="bg-muted rounded-md border p-3">Please select a CSV file.</p>
            )}

            <Button onClick={onSubmit} disabled={!jsonData || isLoading}>
                {isLoading && <Loader2 size={20} className="animate-spin" />}

                {isLoading ? "Submitting..." : "Submit"}
            </Button>
        </div>
    )
}
