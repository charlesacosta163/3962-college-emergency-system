'use server'
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server'
import { getUserProfile } from './supabase/user-actions';

export async function createReport(formData: FormData) {
    const title = formData.get('title') as string;
    const reportType = formData.get('type') as string;
    const priority = formData.get('priority') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    const userProfile = await getUserProfile();

    if (!userProfile) {
        redirect('/set-up-profile');
    }

    const supabase = await createClient();
    const { error } = await supabase.from('reports').insert({
        type: reportType,
        title: title,
        description: description,
        location: location,
        priority: priority,
        status: 'pending',
        reporter_id: userProfile.id,
    });

    if (error) {
        throw new Error(error.message);
    }

    redirect('/dashboard');
}

export async function getUserReports() {
    const userProfile = await getUserProfile();

    if (!userProfile) {
        redirect('/set-up-profile');
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('reports').select('*').eq('reporter_id', userProfile.id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}