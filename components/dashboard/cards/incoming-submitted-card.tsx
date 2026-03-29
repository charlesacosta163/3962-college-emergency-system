import { Badge } from '@/components/ui/badge';
import { LuBriefcaseMedical, LuFlame, LuBuilding, LuSun, LuShield, LuMessageCircle, LuMapPin } from "react-icons/lu";
import { BsIncognito } from "react-icons/bs";
import { approveReport, rejectReport } from '@/lib/report-actions';

import RejectReportButton from '@/components/forms/buttons/reject-report-button';
import ApproveReportButton from '@/components/forms/buttons/approve-report-button';

import EditReportForm from '@/components/forms/edit-report-form';

type IncomingSubmittedCardProps = {
  report: any;
  users: any;
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

const emergencyTypeColors = {
  'medical': {
    bgLight: 'bg-red-50',
    textColor: 'text-red-400',
    badgeBg: 'bg-red-500',
    icon: LuBriefcaseMedical
  },
  'fire': {
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-500',
    icon: LuFlame
  },
  'crime': {
    bgLight: 'bg-gray-50',
    textColor: 'text-gray-700',
    badgeBg: 'bg-gray-700',
    icon: BsIncognito
  },
  'building issue': {
    bgLight: 'bg-yellow-50',
    textColor: 'text-yellow-500',
    badgeBg: 'bg-yellow-500',
    icon: LuBuilding
  },
  'weather ': {
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-400',
    badgeBg: 'bg-blue-500',
    icon: LuSun
  },
  'safety warning': {
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-400',
    badgeBg: 'bg-purple-500',
    icon: LuShield
  },
  'other': {
    bgLight: 'bg-gray-50',
    textColor: 'text-gray-400',
    badgeBg: 'bg-gray-500',
    icon: LuMessageCircle
  }
}

const priorityColors = {
  'low': 'bg-green-500',
  'medium': 'bg-yellow-500',
  'high': 'bg-red-500',
  'critical': 'bg-purple-500'
}

const statusColors = {
  'pending': 'bg-yellow-500',
  'under review': 'bg-blue-500',
  'active': 'bg-green-500',
  'resolved': 'bg-pink-600',
  'rejected': 'bg-gray-500'
}

const IncomingSubmittedCard = ({ report, users }: IncomingSubmittedCardProps) => {
  const typeConfig = emergencyTypeColors[report.type as keyof typeof emergencyTypeColors] || emergencyTypeColors['other']
  const TypeIcon = typeConfig.icon
  const priorityColor = priorityColors[report.priority as keyof typeof priorityColors] || priorityColors['medium']
  const statusColor = statusColors[report.status as keyof typeof statusColors] || statusColors['pending']
  
  const formattedDate = new Date(report.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })

  const user = users.find((user: any) => user.id === report.reporter_id)
    
  return (
    <div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'>
      
      {/* Header Section */}
      <div className='p-6 flex items-start gap-4'>
        <div className={`${typeConfig.bgLight} ${typeConfig.textColor} text-5xl rounded-xl p-4 shadow-sm`}>
          <TypeIcon />
        </div>

        <div className='flex-1'>
          <div className='flex items-start justify-between gap-4 mb-2'>
            <div className='flex-1'>
              <Badge className={`${typeConfig.badgeBg} mb-2 text-xs font-semibold`}>{report.type}</Badge>
              <h2 className='text-2xl font-bold tracking-tight mb-1'>{report.title}</h2>
              <p className='text-sm text-gray-600 font-medium'>
                Submitted by <span className='font-bold text-gray-800'>{user?.first_name} {user?.last_name}</span>
              </p>
              <p className='text-xs text-gray-500 mt-1'>{formattedDate}</p>
            </div>
            
            <div className='flex gap-2'>
              <Badge className={`${priorityColor} text-xs font-semibold px-3 py-1`}>
                {report.priority}
              </Badge>
              <Badge className={`${statusColor} animate-pulse text-xs font-semibold px-3 py-1`}>
                {report.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='px-6 pb-4'>
        <div className='bg-white rounded-xl p-5 shadow-inner'>
          <div className='flex items-center gap-2 mb-3 text-gray-700 font-semibold'>
            <LuMessageCircle className='text-xl' />
            <span>Description</span>
          </div>
          <p className='text-gray-700 leading-relaxed'>
            {report.description}
          </p>
        </div>
      </div>

      {/* Location Info */}
      <div className='px-6 pb-4'>
        <div className='bg-white rounded-xl p-4 shadow-sm flex items-center gap-3'>
          <LuMapPin className='text-2xl text-gray-600' />
          <div>
            <p className='text-xs text-gray-500 font-medium'>Location</p>
            <p className='font-semibold text-gray-800'>{report.location}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='px-6 pb-6'>
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <p className='text-sm font-semibold text-gray-700 mb-3'>Admin Actions</p>
          <div className='flex flex-wrap gap-2'>
            <form action={approveReport} className='flex-1 min-w-fit'>
              <input type="hidden" name="reportId" value={report.id} />
              <ApproveReportButton />
            </form>
            <form action={rejectReport} className='flex-1 min-w-fit'>
              <input type="hidden" name="reportId" value={report.id} />
              <RejectReportButton />
            </form>
            <EditReportForm report={report} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default IncomingSubmittedCard

