import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react'

import { LuBriefcaseMedical, LuFlame, LuBuilding, LuSun, LuShield, LuMessageCircle, LuTriangleAlert, LuPencil, LuClipboardList } from "react-icons/lu";
import { BsIncognito } from "react-icons/bs";

type UserSubmittedCardProps = {
  report: any;
}

const emergencyTypeColors = {
  'medical': {
    bgLight: 'bg-red-50',
    textColor: 'text-red-400',
    badgeBg: 'bg-red-500',
    icon: LuBriefcaseMedical
  },
  'fire': {
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-500',
    icon: LuFlame
  },
  'crime': {
    bgLight: 'bg-gray-50',
    textColor: 'text-gray-700',
    badgeBg: 'bg-gray-700',
    icon: BsIncognito
  },
  'building issue': {
    bgLight: 'bg-yellow-50',
    textColor: 'text-yellow-500',
    badgeBg: 'bg-yellow-500',
    icon: LuBuilding
  },
  'weather ': {
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-400',
    badgeBg: 'bg-blue-500',
    icon: LuSun
  },
  'safety warning': {
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-400',
    badgeBg: 'bg-purple-500',
    icon: LuShield
  },
  'other': {
    bgLight: 'bg-gray-50',
    textColor: 'text-gray-400',
    badgeBg: 'bg-gray-500',
    icon: LuMessageCircle
  }
}

const priorityColors = {
  'low': 'bg-green-500',
  'medium': 'bg-yellow-500',
  'high': 'bg-red-500',
  'critical': 'bg-purple-500'
}

const statusColors = {
  'pending': 'bg-yellow-500',
  'under review': 'bg-blue-500',
  'active': 'bg-green-500',
  'resolved': 'bg-pink-600',
  'rejected': 'bg-gray-500'
}

const UserSubmittedCard = ({ report }: UserSubmittedCardProps) => {
  const typeConfig = emergencyTypeColors[report.type as keyof typeof emergencyTypeColors] || emergencyTypeColors['other']
  const TypeIcon = typeConfig.icon
  const priorityColor = priorityColors[report.priority as keyof typeof priorityColors] || priorityColors['medium']
  const statusColor = statusColors[report.status as keyof typeof statusColors] || statusColors['pending']
  
  const formattedDate = new Date(report.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
    
  return (
    <div className='bg-white/80 p-4 rounded-[25px] flex flex-col gap-4'>
       
       <header className='flex gap-4'>
        <div className={`${typeConfig.bgLight} ${typeConfig.textColor} text-4xl rounded-md p-4 self-start`}>
            <TypeIcon />
        </div>

        <div className="flex flex-col gap-1">
            <Badge className={typeConfig.badgeBg}>{report.type}</Badge>
            <h2 className='text-2xl font-bold tracking-tight'>{report.title}</h2>
            <p className='text-xs font-medium'>Submitted on {formattedDate}</p>
        </div>
       </header>

       <main className='bg-gray-50 p-4 rounded-md text-sm font-medium'>
          {report.description}
       </main>

       <div className='grid grid-cols-2 gap-2'>

        <span className='px-4 py-2 rounded-md bg-gray-100 flex items-center gap-2 text-sm font-medium'>
          <LuClipboardList />Status: <Badge className={`${statusColor} animate-pulse`}>{report.status}</Badge>
        </span>
        <span className='px-4 py-2 rounded-md bg-gray-100 flex items-center gap-2 text-sm font-medium'>
          <LuTriangleAlert /> Priority: <Badge className={priorityColor}>{report.priority}</Badge>
        </span>
        
       </div>
      
       <Button variant='outline'><LuPencil />Edit Report Feature Soon</Button>

    </div>
  )
}

export default UserSubmittedCard

