import { formatDate } from "../../assets/js/styles"

export const PaymentSumarry = ({ reservation }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-lg font-medium text-gray-900 mb-4">Resumen de pago</div>
        <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">Reserva #{reservation.reservation_ID}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fecha de reserva</span>
            <span className="text-gray-900">{formatDate(reservation.reservation_date)}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">Hora</span>
            <span className="text-gray-900">{reservation.reservation_time}</span>
        </div>
        <div className="flex justify-between text-sm font-medium pt-4 border-t border-gray-200">
            <span className="text-gray-900">Total a pagar</span>
            <span className="text-purple-700">$85.000 COP</span>
        </div>
        </div>
    </div>
  )
}


