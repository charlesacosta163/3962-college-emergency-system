import React from 'react'

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LuPencil, LuBriefcaseMedical, LuFlame, LuBuilding, LuSun, LuShield, LuMessageCircle, LuPencilLine, LuBookText, LuBellElectric, LuMapPin } from 'react-icons/lu';
import { BsIncognito } from 'react-icons/bs';
import { Textarea } from '@/components/ui/textarea';
import { updateReportFromForm } from '@/lib/report-actions';
import { Label } from '@/components/ui/label';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FaCircle } from 'react-icons/fa';
import EditSaveReportButton from '@/components/forms/buttons/edit-save-report-button';



type EditReportFormProps = {
  report: any;
}

const reportTypes = [
    {id: 1, name: 'Medical', value: 'medical', icon: LuBriefcaseMedical, color: 'text-red-400'},
    {id: 2, name: 'Fire', value: 'fire', icon: LuFlame, color: 'text-orange-400'},
    {id: 3, name: 'Crime', value: 'crime', icon: BsIncognito, color: 'text-gray-700'},
    {id: 4, name: 'Building Issue', value: 'building issue', icon: LuBuilding, color: 'text-yellow-500'},
    {id: 5, name: 'Weather', value: 'weather ', icon: LuSun, color: 'text-blue-400'},
    {id: 6, name: 'Safety Warning', value: 'safety warning', icon: LuShield, color: 'text-purple-400'},
    {id: 7, name: 'Other', value: 'other', icon: LuMessageCircle, color: 'text-gray-400'},
  ]

const EditReportForm = ({ report }: EditReportFormProps) => {
  return (
    <Dialog>
              <DialogTrigger asChild className='flex-1 min-w-fit'>
                <Button variant='secondary' className='w-full'><LuPencil /> Edit</Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-2xl font-bold tracking-tight text-blue-500'>Edit Report</DialogTitle>
                  <DialogDescription className='text-sm text-blue-400 font-medium'>
                    Make changes to the report details below.
                  </DialogDescription>
                </DialogHeader>
                
                <form action={updateReportFromForm} className='flex flex-col gap-4 mt-4'>
                  <input type="hidden" name="reportId" value={report.id} />

                  <div className='flex flex-col gap-2'>
                    <Label className='font-medium flex items-center gap-2'><LuPencilLine className='text-2xl' /> Title</Label>
                    <Input placeholder='e.g Student Sick in Hallway' name='title' defaultValue={report.title} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-2'>
                      <Label className='font-medium flex items-center gap-2'><LuBookText className='text-2xl' /> Emergency Type</Label>
                      <Select name='type' defaultValue={report.type} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Report Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {reportTypes.map((reportType) => (
                              <SelectItem key={reportType.id} value={reportType.value}>
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
                      <Select name='priority' defaultValue={report.priority} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Priority" />
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
                    <Textarea name='description' className='resize-none min-h-[120px]' placeholder='e.g Student was seen vomiting on the school hallway, Please call for help' defaultValue={report.description} required />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Label className='font-medium flex items-center gap-2'><LuMapPin className='text-2xl' /> Location</Label>
                    <Input placeholder='e.g Main Building, Room 101' name='location' defaultValue={report.location} required />
                  </div>

                  <EditSaveReportButton />
                </form>
              </DialogContent>
            </Dialog>
  )
}

export default EditReportForm