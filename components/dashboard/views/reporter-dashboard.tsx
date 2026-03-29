import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LuCircleAlert, LuHistory, LuPlus, LuInbox, LuUser } from "react-icons/lu";

import SubmitReportForm from '@/components/forms/submit-report-form';
import UserSubmittedCard from '../cards/user-submitted-card';
import ReportCard from '../cards/report-card';
import { getAllReports } from '@/lib/report-actions';
import { getAllUsers, getUserProfile } from '@/lib/supabase/user-actions';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


const ReporterDashboard = async () => {
    const allReports = await getAllReports() || [];
    const users = await getAllUsers() || [];
    const userProfile = await getUserProfile();

    // const activeReports = allReports.filter((report: any) => report.status === 'active');
    const userReports = allReports.filter((report: any) => report.reporter_id === userProfile?.id);

    return (
        <div className='flex flex-col gap-4'>

            <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <h2 className='text-3xl font-bold tracking-tight text-white bg-blue-500 px-4 py-2 rounded-lg'>Hello {userProfile?.first_name} {userProfile?.last_name}! <div className='text-xs font-medium'><LuUser className='inline' /> {userProfile?.role === 'reporter' ? 'Reporter' : 'Admin'}</div></h2>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className=' bg-purple-500 hover:bg-purple-600'>
                        <LuPlus /> Submit a Report
                    </Button>
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


            <Tabs defaultValue='current-reports' className='w-full'>
                <TabsList className='grid w-full grid-cols-2 h-auto p-2'>
                    <TabsTrigger
                        value='current-reports'
                        className='flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white py-3'
                    >
                        <LuCircleAlert className='text-xl' /> 
                        <span>Current Reports</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value='user-history'
                        className='flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3'
                    >
                        <LuHistory className='text-xl' /> 
                        <span>Your History</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='current-reports' className='mt-6'>
                    <section className="flex flex-col gap-4">
                        {allReports.length > 0 ? allReports.map((report: any) => (
                            <ReportCard key={report.id} report={report} users={users} />
                        )) : (
                            <div className='py-16 tracking-tight font-bold text-center flex flex-col items-center justify-center text-2xl text-gray-500'>
                                <LuInbox className='text-6xl text-gray-400 mb-4' />
                                <p>No Active Reports</p>
                                <p className='text-sm text-gray-400 font-normal mt-2'>There are currently no active emergencies</p>
                            </div>
                        )}
                    </section>
                </TabsContent>

                <TabsContent value='user-history' className='mt-6'>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {userReports.length > 0 ? userReports.map((report: any) => (
                            <UserSubmittedCard key={report.id} report={report} />
                        )) : (
                            <div className='col-span-full py-16 tracking-tight font-bold text-center flex flex-col items-center justify-center text-2xl text-gray-500'>
                                <LuInbox className='text-6xl text-gray-400 mb-4' />
                                <p>No Reports Yet</p>
                                <p className='text-sm text-gray-400 font-normal mt-2'>You haven't submitted any reports</p>
                            </div>
                        )}
                    </section>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ReporterDashboard