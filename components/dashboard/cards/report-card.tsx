import React from 'react'
import { cn } from '@/lib/utils';

import { LuBriefcaseMedical, LuClock, LuCalendar, LuTriangleAlert, LuClipboardList, LuSun, LuMessageCircle, LuShield, LuBuilding, LuFlame } from "react-icons/lu";
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
  
const ReportCard = ({ report, users }: any) => {
    const user = users.find((user: any) => user.id === report.reporter_id)
    const typeConfig = emergencyTypeColors[report.type as keyof typeof emergencyTypeColors] || emergencyTypeColors['other']
    const TypeIcon = typeConfig.icon
    const priorityColor = priorityColors[report.priority as keyof typeof priorityColors] || priorityColors['medium']
    const priorityBorder = priorityBorderColors[report.priority as keyof typeof priorityBorderColors] || priorityBorderColors['medium']

  return (
    <div className={cn('p-4 rounded-[25px] rounded-l-none border-l-8 border-t-2 border-b-2 border-r-2 flex flex-col md:flex-row gap-4', priorityBorder)}>

                            {/* Left Side: ICON ASSOCIATED FOR REPORT */}

                            <section className='flex-1 self-start flex flex-col gap-2'>

                                <header className="flex gap-4">
                                    <div className={`${typeConfig.bgLight} ${typeConfig.textColor} text-4xl rounded-md p-4 self-start`}>
                                        <TypeIcon />
                                    </div>

                                    <div className="flex flex-col gap-1">

                                        <Badge className={typeConfig.badgeBg}>{report.type}</Badge>
                                        <h2 className='text-2xl font-bold tracking-tight'>{report.title}</h2>
                                        <span className='text-sm font-medium'>Posted by {user?.first_name} {user?.last_name}</span>
                                    </div>
                                </header>

                                <main className={`grid grid-cols-1 md:grid-cols-2 w-full gap-2 ${typeConfig.bgLight} p-4 rounded-md`}>

                                    <div><LuCalendar className='inline'/> Date Posted: <span className='font-medium'>{getDateAndTime(report.created_at || '').date}</span></div>
                                    <div><LuClock className='inline'/> Time: <span className='font-medium'>{getDateAndTime(report.created_at || '').time}</span></div>
                                    <div><LuTriangleAlert className='inline'/> Priority: <Badge className={priorityColor}>{report.priority}</Badge></div>
                                    <div><LuClipboardList className='inline'/> Status: <span className='font-medium'>{report.status}</span></div>

                                </main>

                            </section>

                            {/* Right Side: DESCRIPTION FOR REPORT */}

                            <div className='flex-1'>

                                <Accordion type="single" collapsible defaultValue="item-1">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className='text-xl font-bold tracking-tight'><div className='flex items-center gap-2'><LuMessageCircle /> Description</div></AccordionTrigger>
                                        <AccordionContent className='bg-gray-50 rounded-lg p-4 font-medium'>
                                            {report.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                            </div>



                        </div>

  )
}

export default ReportCard