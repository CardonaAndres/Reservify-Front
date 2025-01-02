import { CalendarMonth, AccessTime, Phone } from '@mui/icons-material';

export const Features = () => {
  return (
    <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir Reservify?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-purple-50">
            <CalendarMonth className="mx-auto text-purple-600 mb-4 h-8 w-8" />
            <h4 className="text-xl font-semibold mb-2">Reserva Fácil</h4>
            <p className="text-gray-600">
                Proceso de reserva simple y rápido, disponible 24/7
            </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
            <AccessTime className="mx-auto text-purple-600 mb-4 h-8 w-8" />
            <h4 className="text-xl font-semibold mb-2">Confirmación Instantánea</h4>
            <p className="text-gray-600">
                Recibe confirmación inmediata de tu reserva
            </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
            <Phone className="mx-auto text-purple-600 mb-4 h-8 w-8" />
            <h4 className="text-xl font-semibold mb-2">Atención Personalizada</h4>
            <p className="text-gray-600">
                Soporte dedicado para todas tus consultas
            </p>
            </div>
        </div>
        </div>
    </div>
  )
}

