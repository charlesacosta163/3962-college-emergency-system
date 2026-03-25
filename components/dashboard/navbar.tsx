'use client'

import React from 'react'
import { LogoutButton } from '../logout-button'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    const isDashboard = pathname === '/dashboard'
    const isProfile = pathname === '/profile'

    const title = isDashboard ? 'Dashboard' : isProfile ? 'Profile' : 'Placeholder'

  return (
    <header className="px-4 py-2">
                    <nav className='flex justify-between items-center gap-4'>
                        <h2 className='text-2xl font-bold tracking-tighter'>{title}</h2>

                        <LogoutButton/>
                    </nav>
                </header>
  )
}

export default Navbar