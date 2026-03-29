'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { LuSave } from 'react-icons/lu'
import { useFormStatus } from 'react-dom'

const EditSaveReportButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full bg-blue-500 hover:bg-blue-600' disabled={pending}><LuSave /> {pending ? 'Saving...' : 'Save Changes'}</Button>

  )
}

export default EditSaveReportButton