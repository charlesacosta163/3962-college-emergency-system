'use client'

import React from 'react'
import { LogoutButton } from '../logout-button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LuMenu, LuHouse, LuUser, LuAlarmSmoke } from 'react-icons/lu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'

const Navbar = () => {
    const pathname = usePathname()

    const isDashboard = pathname === '/dashboard'
    const isProfile = pathname === '/dashboard/profile' || pathname === '/dashboard/profile/edit'

    const title = isDashboard ? 'Dashboard' : isProfile ? 'Profile' : 'Placeholder'

  return (
    <header className="px-4 py-2">
                    <nav className='flex justify-between items-center gap-4'>
                        <div className='flex items-center gap-4'>
                            <Popover>
                                <PopoverTrigger asChild className='md:hidden'>
                                    <Button variant="outline" size="icon">
                                        <LuMenu className='text-xl' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-56' align='start'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-1 text-xl font-bold pb-2 border-b'>
                                            <LuAlarmSmoke /> Primus
                                        </div>
                                        <Link 
                                            href="/dashboard" 
                                            className='flex gap-2 items-center py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors'
                                        >
                                            <LuHouse /> Dashboard
                                        </Link>
                                        <Link 
                                            href='/dashboard/profile' 
                                            className='flex gap-2 items-center py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors'
                                        >
                                            <LuUser /> Profile
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <h2 className='text-2xl font-bold tracking-tighter'>{title}</h2>
                        </div>

                        <LogoutButton/>
                    </nav>
                </header>
  )
}

export default Navbar