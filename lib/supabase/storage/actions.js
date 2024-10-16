import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";


// Upload file using standard upload
export async function uploadFile(file, fileName) {

    const { error: uploadError } = await supabase
        .storage
        .from('assignment-contracts')
        .upload(fileName, file, {
            upsert: true
        })
    if (uploadError) {
        // Handle error

        throw new Error(uploadError.message);
    }
}

/*

export async function getFileUrl(filePath) {
    const { data, error } = await supabase.storage
        .from('assignment-contracts')
        .getPublicUrl(filePath);

    if (error) {
        console.error('Error fetching file:', error);
        return;
    }

    // Append a cache-busting query parameter
    const timeStamp = new Date().getTime(); // Current time as a timestamp
    const cacheBustedUrl = `${data?.publicUrl}?v=${timeStamp}`;

    return cacheBustedUrl;
}

*/

