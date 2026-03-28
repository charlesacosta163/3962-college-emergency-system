'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { LuSend } from 'react-icons/lu'

const SubmitReportButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='col-span-2 flex items-center gap-2 bg-blue-400' disabled={pending}><LuSend /> {pending ? 'Submitting...' : 'Submit Report'}</Button>
  )
}

export default SubmitReportButton