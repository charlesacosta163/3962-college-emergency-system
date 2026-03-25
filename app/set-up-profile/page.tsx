import SetUpProfileForm from "@/components/forms/set-up-profile-form"

const SetUpProfilePage = async () => {

  return (
    <div className='min-h-screen flex items-center justify-center'>

        <section className="max-w-150 w-full px-8 py-12 bg-blue-50 rounded-xl">
            
            <header className='text-3xl font-black tracking-tight pb-4'>Lets Set Up Your User Profile</header>

            <SetUpProfileForm />

        </section>

    </div>
  )
}

export default SetUpProfilePage