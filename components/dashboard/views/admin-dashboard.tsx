import React from 'react'

import { LuBookUser, LuHeadset, LuInbox, LuPlus } from 'react-icons/lu'

import { getIncomingUserReports, getAllReports, createReport } from '@/lib/report-actions'

import IncomingSubmittedCard from '../cards/incoming-submitted-card';
import { getAllUsers, getUserProfile } from '@/lib/supabase/user-actions';
import ReportCard from '../cards/report-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import SubmitReportForm from '@/components/forms/submit-report-form';
import { GrUserAdmin } from 'react-icons/gr';

const AdminDashboard = async() => {
  const allReports = await getAllReports();
  const users = await getAllUsers();
  const userProfile = await getUserProfile();

  const incomingUserReports = allReports.filter((report: any) => report.status === 'provisional');
  const currentReports = allReports.filter((report: any) => report.status === 'active');

  return (
    <main className='flex flex-col gap-4'>
      
      <div className="flex md:flex-row flex-col justify-between items-center gap-4">

        <h2 className='text-3xl font-bold tracking-tight text-white bg-blue-500 px-4 py-2 rounded-lg'>Hello {userProfile?.first_name} {userProfile?.last_name}! <div className='text-xs font-medium'><GrUserAdmin className='inline' /> Admin</div></h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='self-end bg-amber-600 hover:bg-amber-500'><LuPlus /> Submit New Report</Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold tracking-tight text-blue-500'>Submit Report</DialogTitle>
              <DialogDescription className='text-sm text-blue-400 font-medium'>
                Report will be under review by the administrators upon submission.
              </DialogDescription>
            </DialogHeader>
            <SubmitReportForm showCard={false} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value="incoming" className='flex items-center gap-2'>
            <LuBookUser /> Incoming Reports
          </TabsTrigger>
          <TabsTrigger value="current" className='flex items-center gap-2'>
            <LuHeadset /> Current Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className='mt-4'>
          <div className="flex flex-col gap-4">
            {incomingUserReports.length > 0 ? incomingUserReports.map((report: any) => (
              <IncomingSubmittedCard key={report.id} report={report} users={users} />
            )) : (
              <div className='py-16 tracking-tight font-bold text-center flex flex-col items-center justify-center text-2xl text-gray-500'>
                <LuInbox className='text-6xl text-gray-400 mb-4' />
                <p>No incoming reports</p>
                <p className='text-sm text-gray-400 font-normal mt-2'>All reports have been reviewed</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="current" className='mt-4'>
          <div className="flex flex-col gap-4">
            {currentReports.length > 0 ? currentReports.map((report: any) => (
              <ReportCard key={report.id} report={report} users={users} />
            )) : (
              <div className='py-16 tracking-tight font-bold text-center flex flex-col items-center justify-center text-2xl text-gray-500'>
                <LuInbox className='text-6xl text-gray-400 mb-4' />
                <p>No active reports</p>
                <p className='text-sm text-gray-400 font-normal mt-2'>No reports are currently active</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

    </main>
  )
}

export default AdminDashboard