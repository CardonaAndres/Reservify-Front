import { useState } from 'react';
import { AccountCircle, Email, Phone, Event, VpnKey } from '@mui/icons-material';
import { ProfileModal } from './ProfileModal';
import { ChangePasswordModal } from '../change_password/ChangePasswordModal.jsx'
import { formatDate } from '../../../assets/js/styles.js';

export const ProfileCard = ({ userData }) => {

  const [ modalOpen, setModalOpen ] = useState(false); 
  const [ modalChangePassword, setModalChangePassword ] = useState(false);
  const handleCloseModalChangePassword = () =>  setModalChangePassword(false);
  const handleOpenModalChangePassword = () => setModalChangePassword(true);
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Perfil de Usuario</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-purple-600 px-6 py-8">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                <AccountCircle className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">{userData.name}</h2>
              <p className="mt-1 text-purple-200">ID: {userData.user_ID}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-6 py-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* User ID */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <VpnKey className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID de Usuario</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.user_ID}</p>
                  </div>
                </div>
              </div>

              {/* Created At */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Event className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Miembro desde</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatDate(userData.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Email className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.cellphone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">

              <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" onClick={handleOpen}>
                Editar Perfil
              </button>

              <ProfileModal onClose={handleClose} open={modalOpen} userData={userData} />

              <button onClick={handleOpenModalChangePassword} className="flex-1 bg-gray-100   text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Cambiar Contraseña
              </button>

              <ChangePasswordModal onClose={handleCloseModalChangePassword} open={modalChangePassword}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
