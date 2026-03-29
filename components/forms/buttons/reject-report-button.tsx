'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { LuX } from 'react-icons/lu'
import { useFormStatus } from 'react-dom'

const RejectReportButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button variant='destructive' type='submit' disabled={pending} className='w-full'>
      <LuX /> {pending ? 'Rejecting...' : 'Reject'}
    </Button>
  )
}

export default RejectReportButton