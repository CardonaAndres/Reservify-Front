import { CalendarToday, AccessTime, Person, TableRestaurant, Group, Create } from '@mui/icons-material';
import { ReservationCarOptions } from './ReservationCarOptions';
import { formatDate } from '../../assets/js/styles';

export const ReservationCard = ({ reservation, adminMode = false }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmada':
                return 'bg-green-100 text-green-800';
            case 'pendiente':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelada':
                return 'bg-red-100 text-red-800';
            case 'finalizada':
                    return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-shadow">
            {/* Card Header */}
            <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">
                        ID : {reservation.reservation_ID}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                <div className="flex items-center text-gray-600">
                    <CalendarToday className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{formatDate(reservation.reservation_date)}</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <AccessTime className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{reservation.reservation_time}</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <Person className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{reservation.user_ID}</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <TableRestaurant className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Mesa {reservation.table_number} ({reservation.table_ID})</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <Group className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{reservation.capacity} personas</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <Create className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-sm">Creada: {formatDate(reservation.created_at)}</span>
                </div>
            </div>

            <ReservationCarOptions adminMode={adminMode} reservation={reservation} />
        </div>
    );
};

