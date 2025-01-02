import { Phone, Mail, Event, Person } from '@mui/icons-material';
import { formatDate } from '../../../assets/js/styles.js';

export const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className={`px-4 py-2 ${user.role_name === 'Admin' ? 'bg-purple-600' : 'bg-purple-100'}`}>
            <span className={`text-sm font-semibold 
                ${user.role_name === 'Admin' ? 'text-white' : 'text-purple-600'}`}>
                    {user.role_name}
            </span>
        </div>

            {/* Card Content */}
        <div className="p-4 space-y-3">               
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>ID: {user.user_ID}</span>
                    <div className="flex items-center">
                        <Event className="h-4 w-4 mr-1" />
                        {formatDate(user.created_at)}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Person className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                </div>

                <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <p className="text-gray-600 text-sm truncate">{user.email}</p>
                </div>

                <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <p className="text-gray-600 text-sm">{user.cellphone}</p>
                </div>
        </div>
     </div>
  )
}


