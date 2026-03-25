import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/supabase/user-actions'
import ReporterDashboard from '@/components/dashboard/views/reporter-dashboard'
import AdminDashboard from '@/components/dashboard/views/admin-dashboard'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const profile = await getUserProfile()

  return (
    <div>
       {profile.data?.role.toLowerCase() === 'admin' ? <AdminDashboard /> : <ReporterDashboard />}
    </div>
  )
}
