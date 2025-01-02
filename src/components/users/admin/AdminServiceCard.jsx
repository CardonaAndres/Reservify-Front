import { Icon } from '@mui/material'; 
import { Link } from 'react-router-dom';

export const AdminServiceCard = ({ title, icon, description, route }) => {
  return (
    <Link to={route} className="bg-white rounded-xl shadow-md hover:shadow-lg 
        transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            {/* Aseguramos que el icono tenga un fondo redondeado y un tamaño adecuado */}
            {icon}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
