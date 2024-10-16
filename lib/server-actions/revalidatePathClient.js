"use server";

import { revalidatePath } from "@/node_modules/next/cache";

// import { revalidatePath } from "next/cache"

export async function revalidatePathClient(path) {
    revalidatePath(path);
}
