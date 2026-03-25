'use server'

import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { getUser } from "./supabase/user-actions";

export async function createProfile(formData: FormData) {

    const user = await getUser();

    if (!user) {
        redirect('/auth/login')
    }

    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const studentId = formData.get('student-id') as string;
    const phoneNumber = formData.get('phone-number') as string;

    const supabase = await createClient();
    const { error } = await supabase.from('user_profiles').insert({
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        student_id: studentId,
        phone_number: phoneNumber,
    })

    if (error) {
        throw new Error(error.message)
    }

    redirect('/dashboard')
}

export async function updateProfile(formData: FormData) {
    const user = await getUser();

    if (!user) {
        redirect('/auth/login')
    }
    
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const studentId = formData.get('student-id') as string;
    const phoneNumber = formData.get('phone-number') as string;

    const supabase = await createClient();
    const { error } = await supabase.from('user_profiles').update({
        first_name: firstName,
        last_name: lastName,
        student_id: studentId,
        phone_number: phoneNumber,
    }).eq('email', user.email);

    if (error) {
        throw new Error(error.message)
    }

    redirect('/dashboard/profile')
}