import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LuCircleAlert, LuHistory, LuPlus } from "react-icons/lu";


const ReporterDashboard = () => {
    return (
        <div className='p-4'>

            <Tabs defaultValue='current-reports'>
                <TabsList className='bg-gray-200/75'>
                    <TabsTrigger
                        value='current-reports'
                        className='text-red-400 data-[state=active]:bg-red-400 data-[state=active]:text-white'
                    >
                        <LuCircleAlert /> Current Reports
                    </TabsTrigger>

                    <TabsTrigger
                        value='user-history'
                        className='data-[state=active]:bg-blue-400 data-[state=active]:text-white'
                    >
                        <LuHistory /> Your History
                    </TabsTrigger>

                    <TabsTrigger
                        value='submit-report'
                        className='data-[state=active]:bg-purple-400 data-[state=active]:text-white'
                    >
                        <LuPlus /> Submit a Report
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='current-reports' className=''>
                    
                    <h2 className='text-2xl font-bold tracking-tight mb-4'>Current Reports</h2>

                    <section className="grid grid-cols-2 gap-4">

                        <div className="rounded-xl shadow p-4 bg-yellow-100">
                            <h3 className="text-xl font-bold tracking-tight text-yellow-600">Level 1 Report</h3>

                            <p className="text-sm text-gray-700">
                                This is a report about a problem that happened at the school.
                            </p>

                            <span className='text-xs font-medium text-gray-500'>Posted 2 hours ago</span>
                        </div>

                        <div className="rounded-xl shadow p-4 bg-red-100">
                            <h3 className="text-xl font-bold tracking-tight text-red-600">Level 2 Report</h3>

                            <p className="text-sm text-gray-700">
                                This is a report about a problem that happened at the school.
                            </p>

                            <span className='text-xs font-medium text-gray-500'>Posted 2 hours ago</span>
                        </div>

                        <div className="rounded-xl shadow p-4 bg-purple-100">
                            <h3 className="text-xl font-bold tracking-tight text-purple-600">Level 3 Report</h3>

                            <p className="text-sm text-gray-700">
                                This is a report about a problem that happened at the school.
                            </p>

                            <span className='text-xs font-medium text-gray-500'>Posted 2 hours ago</span>
                        </div>



                    </section>



                </TabsContent>
                <TabsContent value='user-history'>
                    User History Content
                </TabsContent>
                <TabsContent value='submit-report'>
                    Submit Report Content
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ReporterDashboard