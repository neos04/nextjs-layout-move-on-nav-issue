"use server";

import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function login(formData) {
    const supabase = createSupabaseServerClient();
    // console.log(formData);

    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // redirect('/error')
        // console.error(error.message);  // Log to server console for debugging
        return { success: false, message: error.message };
    } else {
        revalidatePath('/', 'layout');
        return { success: true }
        // redirect('/');
    }
}

export async function signup(formData) {
    const supabase = createSupabaseServerClient();

    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        // console.error(error.message);  // Log to server console for debugging
        return { success: false, message: error.message };
    } else {
        revalidatePath('/', 'layout');
        return { success: true }
        // redirect('/');
    }

}

export async function resetPassword(formData) {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.updateUser({
        password: formData.password
    })

    if (error) {
        // console.error(error.message);  // Log to server console for debugging
        return { success: false, message: error.message };
    } else {
        revalidatePath('/', 'layout');
        return { success: true }
        // redirect('/');
    }
}