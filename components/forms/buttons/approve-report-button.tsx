'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { LuCheck } from 'react-icons/lu'
import { useFormStatus } from 'react-dom'

const ApproveReportButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button className='bg-green-500 hover:bg-green-600 w-full' type='submit' disabled={pending}>
      <LuCheck /> {pending ? 'Approving...' : 'Approve'}
    </Button>
  )
}

export default ApproveReportButton