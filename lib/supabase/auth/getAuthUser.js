"use server";

import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function getAuthUser() {
    const supabase = createSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        // console.log(error)
        return { user: null, userID: null, isLoggedIn: false };

    } else {

        const userID = user.id;
        // console.log(userID)
        return { user, userID, isLoggedIn: true };
    }
}