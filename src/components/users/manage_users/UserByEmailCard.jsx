import { Person, Phone, Mail, CalendarToday, Lock, Shield } from '@mui/icons-material';
import { formatDate } from '../../../assets/js/styles.js'
import { useState } from 'react';
import { RoleManagementModal } from '../change_role/RoleManagementModal.jsx';

export const UserByEmailCard = ({ user, onClose }) => {

  const [ modalOpen, setModalOpen ] = useState(false);
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () =>  setModalOpen(true); 

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-2xl border border-gray-200">
    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-3">
          <Person className="h-6 w-6 text-white" />
        </div>
        <h2 className="ml-3 text-2xl font-semibold text-white">Detalles del Usuario</h2>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-6">
      {/* ID Section */}
      <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl shadow-sm">
        <Lock className="h-5 w-5 text-purple-600 mt-1" />
        <div>
          <p className="text-sm font-medium text-purple-600">ID de Usuario</p>
          <p className="text-gray-800 font-mono">{user.user_ID}</p>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Person className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre</p>
            <p className="text-gray-900">{user.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Phone className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Teléfono</p>
            <p className="text-gray-900">{user.cellphone}</p>
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rol ID</p>
            <p className="text-gray-900">{user.role_ID}</p>
          </div>
        </div>
      </div>

      {/* Created At*/}
      <div className="flex items-center space-x-3 border-t border-gray-200 pt-6">
        <div className="flex-shrink-0">
          <CalendarToday className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
          <p className="text-gray-900">{formatDate(user.created_at)}</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <button onClick={handleOpen} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Cambiar Rol
        </button>
      </div>

      <RoleManagementModal 
        open={modalOpen} onClose={onClose} email={user.email} currentRoleID={user.role_ID}  
      />

    </div>
  </div>
  )
}
