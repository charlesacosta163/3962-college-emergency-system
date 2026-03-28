import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LuCircleAlert, LuClipboardList, LuHistory, LuPlus, LuTriangleAlert } from "react-icons/lu";

import SubmitReportForm from '@/components/forms/submit-report-form';
import UserSubmittedCard from '../cards/user-submitted-card';
import { FaCircle } from 'react-icons/fa';
import ReportCard from '../cards/report-card';
import { getUserReports } from '@/lib/report-actions';
import { getAllUsers } from '@/lib/supabase/user-actions';


const ReporterDashboard = async () => {
    const reports = await getUserReports() || [];
    const users = await getAllUsers() || [];

    return (
        <div className='p-4'>

            <Tabs defaultValue='current-reports'>
                <TabsList className='bg-gray-200/75 w-full'>
                    <TabsTrigger
                        value='current-reports'
                        className='text-red-400 data-[state=active]:bg-red-400 data-[state=active]:text-white'
                    >
                        <LuCircleAlert /> <span className='hidden md:block'>Current Reports</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value='user-history'
                        className='data-[state=active]:bg-blue-400 data-[state=active]:text-white'
                    >
                        <LuHistory /> <span className='hidden md:block'>Your History</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value='submit-report'
                        className='data-[state=active]:bg-purple-400 data-[state=active]:text-white'
                    >
                        <LuPlus /> <span className='hidden md:block'>Submit a Report</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='current-reports' className=''>

                    <h2 className='text-2xl font-bold tracking-tight mb-4 text-red-500'>Current Reports</h2>

                    <div className="flex flex-wrap gap-4 text-sm font-medium mb-4">

                        <span className='flex gap-2 items-center'><FaCircle className='text-xl text-green-500' /> Low</span>
                        <span className='flex gap-2 items-center'><FaCircle className='text-xl text-yellow-500' /> Medium</span>
                        <span className='flex gap-2 items-center'><FaCircle className='text-xl text-red-500' /> High</span>
                        <span className='flex gap-2 items-center'><FaCircle className='text-xl text-purple-500' /> Critical</span>
                    </div>

                    <section className="grid grid-cols-1 gap-4">

                       {reports.map((report: any , index: number) => (
                        <ReportCard key={index} report={report} users={users} />
                       ))}

                    </section>


                </TabsContent>



                <TabsContent value='user-history'>
                    
                    <h2 className='text-2xl font-bold tracking-tight mb-4 text-blue-500'>Your Submitted Reports</h2>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {reports.map((report: any , index: number) => (
                            <UserSubmittedCard key={index} report={report} />
                        ))}

                    </section>

                </TabsContent>
                <TabsContent value='submit-report'>
                    <h2 className='text-2xl font-bold tracking-tight mb-4 text-purple-500'>Submit a Report</h2>
                    <SubmitReportForm />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ReporterDashboard