'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { LuSave } from 'react-icons/lu'

const UpdateProfileButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' className='col-span-2 flex items-center gap-2' disabled={pending}><LuSave /> {pending ? 'Updating Profile...' : 'Update Profile'}</Button>
  )
}

export default UpdateProfileButton