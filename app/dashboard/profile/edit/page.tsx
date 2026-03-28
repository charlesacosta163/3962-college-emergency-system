import UpdateProfileButton from '@/components/forms/buttons/update-profile-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { getUserProfile } from '@/lib/supabase/user-actions'
import { updateProfile } from '@/lib/profile-actions'

import { LuPencil } from 'react-icons/lu'

const EditProfilePage = async () => {
    const profile = await getUserProfile()

    return (
        <main className='flex items-center justify-center h-full'>
            <div className='bg-white/50 p-6 rounded-2xl max-w-150 w-full'>
                <header className='text-2xl font-bold tracking-tight pb-4 flex items-center gap-2'><LuPencil /> Edit Profile</header>

                <form action={updateProfile} className='grid grid-cols-2 gap-4'>

                    <div className="flex flex-col gap-1">   <Label className='text-xs font-semibold'>First Name</Label>
                        <Input type='text' placeholder='e.g. John' defaultValue={profile?.first_name} name='first-name' className='bg-white' required />
                    </div>

                    <div className="flex flex-col gap-1">   <Label className='text-xs font-semibold'>Last Name</Label>
                        <Input type='text' placeholder='e.g. Doe' defaultValue={profile?.last_name} name='last-name' className='bg-white' required />
                    </div>

                    <div className="flex flex-col gap-1">   <Label className='text-xs font-semibold'>Student ID</Label>
                        <Input type='text' placeholder='e.g. 00001111' defaultValue={profile?.student_id} name='student-id' className='bg-white' required />
                    </div>

                    <div className="flex flex-col gap-1">   <Label className='text-xs font-semibold'>Phone Number</Label>
                        <Input type='tel' placeholder='e.g. 1112223333' defaultValue={profile?.phone_number} name='phone-number' className='bg-white' required />
                    </div>

                    <UpdateProfileButton />

                </form>
            </div>
        </main>
    )
}

export default EditProfilePage