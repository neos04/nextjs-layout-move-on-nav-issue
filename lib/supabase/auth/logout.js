"use server";

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';


export default async function logOut() {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if (error) {
        // console.log("Logout error");
        // console.log(error);
        throw error;
    } else {
        // console.log("Logout succesful");
        redirect('/login');
    }
}

