'use server' 

import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function getUser() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data?.user) {
      redirect('/auth/login')
    }
  
    return data.user
}

export async function isLoggedIn() {
    const user = await getUser()
    return user !== null
}

export async function getUserProfile() {
    const user = await getUser()

    if (!user) {
        redirect('/auth/login')
       }
    
    const supabase = await createClient()
    const { data, error } = await supabase.from('user_profiles').select('*').eq('email', user.email).single()

    if (error) 
        redirect('/set-up-profile')

    return { success: true, data: data }
}