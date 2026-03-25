import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex w-full min-h-screen">

            <Sidebar />

            <main className="flex flex-col flex-1">
                
                <Navbar />

                <section className="flex-1 bg-[#F5EFE6]/50 shadow-lg p-4 rounded-2xl">
                    {children}
                </section>
            </main>
        </div>
    )
}