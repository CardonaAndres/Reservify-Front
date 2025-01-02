import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Person, Security, CheckCircle } from '@mui/icons-material';
import { SpinnerLoading } from '../../common/SpinnerLoading';
import { errorAlert } from '../../common/Alerts.jsx'
import { changeRole } from '../../../API/user.js';

export const RoleManagementCard = ({ email, currentRoleID, onClose }) => {

  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const currentRole = watch('role_ID'); // Observar cambios en el rol
  
  const onSubmited = handleSubmit(async (values) => {
    try {
        setLoading(true); 
        const res = await changeRole(email, values.role_ID);
        if(!res.status)
            throw new Error(res.message)

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); 

    } catch(err) {
        onClose();
        await errorAlert({ message : err.message });
    } finally {
        setLoading(false);
    }
  });

  if (loading) return <SpinnerLoading />

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmited} 
        className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm w-full">
        {/* Header Section */}
        <div className="bg-purple-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Security className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Gestión de Rol
              </h3>
            </div>
            {showSuccess && (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                Rol actualizado
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-4">
          {/* User Info */}
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Person className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{ email }</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rol del Usuario
              </label>
              <select {...register('role_ID')} defaultValue={currentRoleID} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500nrounded-lg transition-colors cursor-pointer" >  
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
                
              </select>
            </div>

            {/* Role Description */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {currentRole == '1' ? 'Permisos de Administrador' : 'Permisos de Usuario'}
              </h5>
              <p className="text-sm text-gray-600">
                {currentRole == '2'
                  ? 'Acceso completo al sistema, gestión de usuarios y configuraciones avanzadas.'
                  : 'Acceso básico al sistema, gestión de reservas personales y perfil.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg
                     hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-purple-500 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
