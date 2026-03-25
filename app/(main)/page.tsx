import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuAlarmSmoke } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 bg-black text-white p-12 rounded-xl">

        <header className="flex flex-col items-center">
          <h1 className="font-bold tracking-tight text-4xl flex items-center gap-2"><LuAlarmSmoke /> Primus</h1>
          <p className="text-sm font-medium">Your Trusted Emergency Client | Built with Care.</p>
        </header>

        <section className="flex items-center gap-4">
           <Link href='/auth/login'><Button className="bg-purple-500 font-bold">Login</Button></Link>
          <Link href='/auth/sign-up'><Button className="bg-pink-500 font-bold">Sign Up</Button></Link>
        </section>

        


    </div>
  );
}
