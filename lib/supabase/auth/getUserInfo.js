"use server";
import { redirect } from 'next/navigation';
import getAuthUser from "./getAuthUser";
import { createSupabaseServerClient } from '@/lib/supabase/server';


export default async function getUserInfo() {
    const supabase = createSupabaseServerClient();

    const { userID, isLoggedIn } = await getAuthUser();

    if (!isLoggedIn) {
        redirect('/login')
    }

    if (userID) {
        const { data, error } = await supabase
            .from('Users')
            .select()
            .eq('user_id', userID)
            .single()

        if (error) {
            console.log(error);
        } else if (data) {
            // console.log(data);
            return data;
        }
    }

}
