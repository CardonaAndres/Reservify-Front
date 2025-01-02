import { Link } from "react-router-dom";
import { AdminNavbar } from "../../components/users/admin/AdminNavbar.jsx"
import { router } from "../../configs/config.js";
import { Group, TableRestaurant, AccessTime, Event, Payment, Message } from '@mui/icons-material';
import { AdminServiceCard } from "../../components/users/admin/AdminServiceCard.jsx";

export const AdminDashboard = () => {

  const adminCards = [
    {
      title: 'Usuarios Registrados',
      icon: <Group fontSize="large" className="text-purple-600" />, // Icono de usuarios
      description: 'Total de usuarios en la plataforma',
      route: router.users,
    },
    {
      title: 'Gestión de Mesas',
      icon: <TableRestaurant fontSize="large" className="text-purple-600" />, // Icono de mesas
      description: 'Gestiona las mesas disponibles en el restaurante',
      route: router.tables,
    },
    {
      title: 'Gestión de Horarios',
      icon: <AccessTime fontSize="large" className="text-purple-600" />, // Icono de horarios
      description: 'Define los horarios de atención del restaurante',
      route: router.schedules,
    },
    {
      title: 'Gestión de Reservas',
      icon: <Event fontSize="large" className="text-purple-600" />, // Icono de reservas
      description: 'Gestiona las reservas realizadas por los clientes',
      route: router.reservations,
    },
    {
      title: 'Gestión de Pagos',
      icon: <Payment fontSize="large" className="text-purple-600" />, // Icono de pagos
      description: 'Revisa los pagos realizados por los clientes',
      route: router.payments,
    },
    {
      title: 'Gestión de Solicitudes',
      icon: <Message fontSize="large" className="text-purple-600" />, // Icono de mensajes
      description: 'Gestiona las solicitudes realizadas por los usuarios',
      route: router.requests,
    }
  ];

  return (
    <>
    <AdminNavbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Administración</h2>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <AdminServiceCard 
            key={index} 
            title={card.title} 
            icon={card.icon} 
            description={card.description}
            route={card.route}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to={router.dashboard} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors shadow-md">
          Volver       
        </Link>
      </div>
    </div>
  </>
  )
}
