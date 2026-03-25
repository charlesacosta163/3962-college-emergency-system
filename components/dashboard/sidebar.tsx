import Link from 'next/link'
import React from 'react'
import { LuAlarmSmoke, LuHouse, LuUser } from 'react-icons/lu'

const Sidebar = () => {
  return (
    <aside className="w-[225px] p-4 flex flex-col gap-4 items-center">
                
                <h2 className="flex items-center gap-1 text-3xl tracking-tighter font-bold"><LuAlarmSmoke /> Primus</h2>

                <section className="flex flex-col gap-2 text-sm font-medium w-full">
                    <Link href="/dashboard" className='flex gap-2 items-center py-2 px-4 bg-white rounded-xl shadow'><LuHouse /> Dashboard</Link>
                    <Link href='/dashboard/profile' className='flex gap-2 items-center py-2 px-4 bg-white rounded-xl shadow'><LuUser /> Profile</Link>
                </section>
            </aside>
  )
}

export default Sidebar