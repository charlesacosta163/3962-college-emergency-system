'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

const SubmitProfileButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='col-span-2' disabled={pending}>{pending ? 'Setting Up Profile...' : 'Set Up Profile'}</Button>
  )
}

export default SubmitProfileButton