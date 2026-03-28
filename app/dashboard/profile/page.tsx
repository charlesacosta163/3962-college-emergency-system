import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/supabase/user-actions"
import Link from "next/link";
import { LuGraduationCap, LuPencil, LuPhoneCall } from "react-icons/lu";
import { cn } from "@/lib/utils";

const ProfilePage = async () => {
  const profile = await getUserProfile()

  return (
    <div className='flex items-center justify-center h-full'>
      
      <section className={cn('max-w-100 w-full flex flex-col gap-4 py-8 px-6 rounded-2xl bg-white relative border-2', profile?.role.toLowerCase() === 'reporter' ? 'border-blue-200' : 'border-green-200')}>
        <Badge className={cn("absolute -top-2 -left-4", profile?.role === 'reporter' ? 'bg-blue-500 border-2 border-blue-200 text-white' : 'bg-green-500 border-2 border-green-200 text-white')}>{profile?.role === 'reporter' ? 'Reporter' : 'Admin'}</Badge>

        <header>
            <h1 className="text-2xl font-bold tracking-tight">{profile?.first_name} {profile?.last_name}</h1>
            <p className="text-sm font-medium">{profile?.email}</p>
        </header>

        <section className="grid grid-cols-2 gap-4">

            <div className="flex flex-col gap-1 bg-gray-50 p-2 rounded-lg">
                <span className="font-medium flex items-center gap-1"><LuGraduationCap /> Student ID</span>
                <p className="text-lg font-bold text-blue-500">{profile?.student_id}</p>
            </div>

            <div className="flex flex-col gap-1 bg-gray-50 p-2 rounded-lg">
                <span className="font-medium flex items-center gap-1"><LuPhoneCall /> Phone</span>
                <p className="text-lg font-bold text-gray-500">+1 {profile?.phone_number}</p>
            </div> 
            
        </section>

        <Link href='/dashboard/profile/edit'><Button variant='outline'><LuPencil /> Edit Profile</Button></Link>

  </section>
</div>
);
};

export default ProfilePage;