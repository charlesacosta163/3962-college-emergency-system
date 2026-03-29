import React from 'react'
import { cn } from '@/lib/utils';

import { LuBriefcaseMedical, LuClock, LuCalendar, LuTriangleAlert, LuClipboardList, LuSun, LuMessageCircle, LuShield, LuBuilding, LuFlame, LuMapPin } from "react-icons/lu";
import { BsIncognito } from "react-icons/bs";
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { getDateAndTime } from '@/lib/utils';


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

const priorityBorderColors = {
  'low': 'border-green-500',
  'medium': 'border-yellow-500',
  'high': 'border-red-500',
  'critical': 'border-purple-500'
}

const statusColors = {
  'provisional': 'bg-yellow-500',
  'active': 'bg-green-500',
  'resolved': 'bg-pink-600',
  'rejected': 'bg-gray-500'
}
  
const ReportCard = ({ report, users }: any) => {
    const user = users.find((user: any) => user.id === report.reporter_id)
    const typeConfig = emergencyTypeColors[report.type as keyof typeof emergencyTypeColors] || emergencyTypeColors['other']
    const TypeIcon = typeConfig.icon
    const priorityColor = priorityColors[report.priority as keyof typeof priorityColors] || priorityColors['medium']
    const priorityBorder = priorityBorderColors[report.priority as keyof typeof priorityBorderColors] || priorityBorderColors['medium']
    const statusColor = statusColors[report.status as keyof typeof statusColors] || statusColors['provisional']

  return (
    <div className={cn('bg-[#FDDAC5]/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-8', priorityBorder)}>
      
      {/* Header Section */}
      <div className='p-4 md:p-6 flex flex-col md:flex-row items-start gap-4'>
        <div className={`${typeConfig.bgLight} ${typeConfig.textColor} text-4xl md:text-5xl rounded-xl p-3 md:p-4 shadow-sm`}>
          <TypeIcon />
        </div>

        <div className='flex-1 w-full'>
          <Badge className={`${typeConfig.badgeBg} mb-2 text-xs font-semibold`}>{report.type}</Badge>
          <h2 className='text-xl md:text-2xl font-bold tracking-tight mb-2'>{report.title}</h2>
          <p className='text-xs md:text-sm text-gray-600 font-medium mb-3'>
            Posted by {user?.first_name} {user?.last_name}
          </p>
          
          <div className='flex flex-wrap gap-2'>
            <Badge className={`${priorityColor} text-xs font-semibold px-2 md:px-3 py-1`}>
              Priority: {report.priority}
            </Badge>
            <Badge className={`${statusColor} text-xs font-semibold px-2 md:px-3 py-1`}>
              Status: {report.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className='px-4 md:px-6 pb-4'>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className='border-none'>
            <AccordionTrigger className='text-sm md:text-base font-semibold hover:no-underline py-3 px-3 md:px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
              <div className='flex items-center gap-2'>
                <LuMessageCircle className='text-lg md:text-xl' /> 
                Description
              </div>
            </AccordionTrigger>
            <AccordionContent className='pt-4'>
              <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-5 text-sm md:text-base font-medium text-gray-700 leading-relaxed'>
                {report.description}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Info Grid */}
      <div className='px-4 md:px-6 pb-4 md:pb-6'>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ${typeConfig.bgLight} rounded-xl p-3 md:p-4`}>
          <div className='flex items-center gap-2'>
            <LuCalendar className='text-base md:text-lg text-gray-600 flex-shrink-0' />
            <div className='min-w-0'>
              <p className='text-xs text-gray-500 font-medium'>Date</p>
              <p className='font-semibold text-gray-800 text-xs md:text-sm truncate'>{getDateAndTime(report.created_at || '').date}</p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <LuClock className='text-base md:text-lg text-gray-600 flex-shrink-0' />
            <div className='min-w-0'>
              <p className='text-xs text-gray-500 font-medium'>Time</p>
              <p className='font-semibold text-gray-800 text-xs md:text-sm'>{getDateAndTime(report.created_at || '').time}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 sm:col-span-2 md:col-span-1'>
            <LuMapPin className='text-base md:text-lg text-gray-600 flex-shrink-0' />
            <div className='min-w-0 flex-1'>
              <p className='text-xs text-gray-500 font-medium'>Location</p>
              <p className='font-semibold text-gray-800 text-xs md:text-sm break-words'>{report.location}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ReportCard