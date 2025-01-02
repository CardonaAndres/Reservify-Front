import { Person, CalendarToday, Tag, Email, Phone, AccessTime } from '@mui/icons-material'; 
import { formatDate } from '../../assets/js/styles';

export const ServiceRequestCard = ({ request, adminMode = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 
      border border-purple-100">
      <div className="border-b border-purple-100 pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-purple-700">{request.title}</h3>
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm">
            { adminMode && request.role_name }
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{request.description}</p>
      </div>

      <div className="space-y-3">
        {adminMode &&
          <>
            <div className="flex items-center text-sm">
              <Person className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">{request.name}</span>
            </div>
            <div className="flex items-center text-sm">
              <Email className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">{request.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">{request.cellphone}</span>
            </div>    
          </>
        }

        <div className="pt-3 border-t border-purple-50">
          <div className="flex items-center text-sm mb-1">
            <Tag className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-gray-500 mr-2">Request ID:</span>
            <span className="text-gray-700">{request.service_request_ID}</span>
          </div>
          {adminMode &&
              <div className="flex items-center text-sm mb-1">
                    <Tag className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-gray-500 mr-2">User ID:</span>
                    <span className="text-gray-700">{request.user_ID}</span>
              </div>
          }
          <div className="flex items-center text-sm">
            <CalendarToday className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-gray-500 mr-2">Creado:</span>
            <span className="text-gray-700">{formatDate(request.created_at)}</span>
          </div>
          {adminMode &&
              <div className="flex items-center text-sm">
                <AccessTime className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-500 mr-2">Usuario desde:</span>    
                <span className="text-gray-700">{formatDate(request.user_created_at)}</span>
             </div>
          }
        </div>
      </div>

    </div>
  );
};
