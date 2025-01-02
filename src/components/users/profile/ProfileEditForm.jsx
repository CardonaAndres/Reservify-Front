import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Person, Email, PhoneAndroid } from '@mui/icons-material';
import { SpinnerLoading } from '../../common/SpinnerLoading';
import { errorAlert, successAlert } from '../../common/Alerts.jsx';
import { updateUserRequest } from '../../../API/user.js';

export const ProfileEditForm = ({ onClose, userData }) => {

  const [ loading, setLoading ] = useState(false) ;
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues : {
      name : userData.name || '',
      email : userData.email || '',
      cellphone : userData.cellphone || ''
    }
  });

  const onSubmited = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const res = await updateUserRequest(values);

      if (!res.status)
        throw new Error(res.message)

      onClose()
      await successAlert({ message : res.data.message })

    } catch(err) {
        onClose()
        await errorAlert({ message : err.message });
    } finally {
      setLoading(false);
    } 

  });

  if (loading) return <SpinnerLoading />
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
          <p className="text-gray-600 mt-1">Actualiza tu información personal</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-2xl shadow-sm p-6">
          <form className="space-y-6" onSubmit={onSubmited}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Person className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('name', { required: 'El nombre es obligatorio' })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'El email no es válido'
                    } ,           
                     minLength: {
                      value: 15,  
                      message: 'El email debe tener al menos 15 caracteres'
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
              {errors.email ? <p className="text-red-500 text-sm mt-1">{errors.email.message}</p> : 
                'Este correo se usará para notificaciones importantes'
              }               
              </p>

            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono celular
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneAndroid className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  {...register('cellphone', {
                    required: 'El número de celular es obligatorio',
                    pattern: {
                      value: /^\+?\d{7,20}$/,
                      message: 'El número de celular no es válido'
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {errors.cellphone ? 
                  <p className="text-red-500 text-sm mt-1">{errors.cellphone.message}</p> :
                  'Se usará para confirmaciones de reserva'               
                }    
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
