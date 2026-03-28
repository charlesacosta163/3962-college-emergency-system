import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { LuBriefcaseMedical, LuFlame, LuBuilding, LuSun, LuShield, LuMessageCircle, LuCircle, LuPencilLine, LuBookText, LuMapPin, LuBellElectric } from 'react-icons/lu'
import { BsIncognito } from "react-icons/bs";
import { Textarea } from '../ui/textarea'
import { FaCircle } from 'react-icons/fa'
import SubmitReportButton from './buttons/submit-report-button'


import { createReport } from '@/lib/report-actions'


const reportTypes = [
    {id: 1, name: 'Medical', icon: LuBriefcaseMedical, color: 'text-red-400'},
    {id: 2, name: 'Fire', icon: LuFlame, color: 'text-orange-400'   },
    {id: 3, name: 'Crime', icon: BsIncognito, color: 'text-gray-700'   },
    {id: 4, name: 'Building Issue', icon: LuBuilding, color: 'text-yellow-500'   },
    {id: 5, name: 'Weather ', icon: LuSun, color: 'text-blue-400'   },
    {id: 6, name: 'Safety Warning', icon: LuShield, color: 'text-purple-400'   },
    {id: 7, name: 'Other', icon: LuMessageCircle, color: 'text-gray-400'   },
]

const SubmitReportForm = () => {
    return (
        <Card className='max-w-[800px] w-full'>
            <CardHeader>
                <CardTitle className='text-2xl font-bold tracking-tight text-blue-500'>Submit Report</CardTitle>
                <CardDescription className='text-sm text-blue-400 font-medium'>Report will be under review by the administrators upon submission.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={createReport} className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-medium flex items-center gap-2'><LuPencilLine className='text-2xl' /> Title</Label>
                        <Input placeholder='e.g Student Sick in Hallway' name='title' required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className='flex flex-col gap-2'>
                            <Label className='font-medium flex items-center gap-2'><LuBookText className='text-2xl' /> Emergency Type</Label>
                            <Select name='type' required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Report Type" className='w-full'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {reportTypes.map((reportType) => (
                                            <SelectItem key={reportType.id} value={reportType.name.toLowerCase()}>
                                                <div className={`flex items-center gap-2 font-medium ${reportType.color}`}>
                                                    <reportType.icon className='text-2xl' />
                                                    {reportType.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-medium flex items-center gap-2'><LuBellElectric className='text-2xl' /> Priority</Label>
                            <Select name='priority' required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Priority" className='w-full'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="low"><FaCircle className='text-2xl text-green-500' /> Low</SelectItem>
                                        <SelectItem value="medium"><FaCircle className='text-2xl text-yellow-500' /> Medium</SelectItem>
                                        <SelectItem value="high"><FaCircle className='text-2xl text-red-500' /> High</SelectItem>
                                        <SelectItem value="critical"><FaCircle className='text-2xl text-purple-500' /> Critical</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-medium flex items-center gap-2'><LuMessageCircle className='text-2xl' /> Description</Label>
                        <Textarea name='description' className='resize-none' placeholder='e.g Student was seen vomiting on the school hallway, Please call for help' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-medium flex items-center gap-2'><LuMapPin className='text-2xl' /> Location</Label>
                        <Input placeholder='e.g Main Building, Room 101' name='location' required />
                    </div>


                    <SubmitReportButton />
                </form>
            </CardContent>
        </Card>
    )
}

export default SubmitReportForm