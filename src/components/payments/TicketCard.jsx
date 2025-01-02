import { CalendarToday, AccessTime, Person, Phone, Email, CreditCard, CheckCircle, Tag } from '@mui/icons-material';
import { formatDate } from '../../assets/js/styles';

export const TicketCard = ({ reservation }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
        {/* Header */}
        <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-600">{reservation.reservation_ID}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">{reservation.status}</span>
            </div>
          </div>
        </div>
  
        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Cliente Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Person className="h-4 w-4 text-gray-400" />
              <span className="text-gray-800">{reservation.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Email className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">{reservation.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">{reservation.cellphone}</span>
            </div>
          </div>
  
          {/* Reservation Details */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <CalendarToday className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">
                Fecha: {formatDate(reservation.reservation_date)}
            </span>
            </div>
            <div className="flex items-center space-x-2">
              <AccessTime className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">Hora: {reservation.reservation_time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 text-sm">Mesa: {reservation.table_ID}</span>
            </div>
          </div>
  
          {/* Payment Info */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 text-sm">{reservation.payment_method}</span>
              </div>
              <span className="font-medium text-gray-800">${reservation.amount}00</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">ID Pago: {reservation.payment_ID}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estado:</span>
              <span className="text-green-500 font-medium">{reservation.status}</span>
            </div>
          </div>
  
          {/* Timestamps */}
          <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-100">
            <div>Creado: {formatDate(reservation.created_at)}</div>
            <div>Pagado: {formatDate(reservation.paid_at)}</div>
            <div>Usuario ID: {reservation.user_ID}</div>
          </div>
        </div>
      </div>
    );
  };
