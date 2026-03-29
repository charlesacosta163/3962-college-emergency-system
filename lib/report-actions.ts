'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
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
        status: 'provisional',
        reporter_id: userProfile.id,
    });

    if (error) {
        throw new Error(error.message);
    }

    redirect('/dashboard');
}

export async function getIncomingUserReports() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('reports').select('*').eq('status', 'provisional');
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getAllReports() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('reports').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
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


export async function changeReportStatus(reportId: string, status: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('reports').update({ status: status }).eq('id', reportId);
    if (error) {
        throw new Error(error.message);
    }
    revalidatePath('/dashboard');
}

export async function approveReport(formData: FormData) {
    const reportId = formData.get('reportId') as string;
    await changeReportStatus(reportId, 'active');
}

export async function rejectReport(formData: FormData) {
    const reportId = formData.get('reportId') as string;
    await changeReportStatus(reportId, 'rejected');
}

export async function updateReportFromForm(formData: FormData) {
    const reportId = formData.get('reportId') as string;
    const title = formData.get('title') as string;
    const reportType = formData.get('type') as string;
    const priority = formData.get('priority') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    const supabase = await createClient();
    const { error } = await supabase.from('reports').update({
        type: reportType,
        title: title,
        description: description,
        location: location,
        priority: priority,
    }).eq('id', reportId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard');
}