import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { createProfile } from "@/lib/actions"
import SubmitProfileButton from "./buttons/submit-profile-button"

const SetUpProfileForm = () => {
  
  return (
    <form action={createProfile} className='grid grid-cols-2 gap-4'>
      <div className="flex flex-col gap-1">
        <Label className='text-xs font-semibold'>First Name</Label>
        <Input type='text' placeholder='e.g. John' name='first-name' className='bg-white' required/>
      </div>

      <div className="flex flex-col gap-1">
        <Label className='text-xs font-semibold'>Last Name</Label>
        <Input type='text' placeholder='e.g. Doe' name='last-name' className='bg-white' required/>
      </div>

      <div className="flex flex-col gap-1">
        <Label className='text-xs font-semibold'>Student ID</Label>
        <Input type='text' placeholder='e.g. 00001111' name='student-id' className='bg-white' required/>
      </div>

      <div className="flex flex-col gap-1">
        <Label className='text-xs font-semibold'>Phone Number</Label>
        <Input type='tel' placeholder='e.g. 1112223333' name='phone-number' className='bg-white' required/>
      </div>

      <SubmitProfileButton />

    </form>
  )
}

export default SetUpProfileForm