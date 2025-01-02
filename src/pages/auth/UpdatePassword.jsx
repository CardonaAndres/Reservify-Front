import { MailOutline, LockOutlined, VpnKey } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext.jsx';
import { SpinnerLoading } from '../../components/common/SpinnerLoading.jsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { router } from '../../configs/config.js';

export const UpdatePassword = () => {

  const { updatePassword, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmited = handleSubmit(async (values) => {
    const res = await updatePassword(values.email, values.new_password)
    if(res) navigate(router.login)
  })

  if(loading) return <SpinnerLoading    />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center">
        <VpnKey className="h-16 w-16 text-purple-600" sx={{ fontSize : '64px' }}/>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Cambiar contraseña</h2>
        <p className="mt-2 text-gray-600">
          Ingresa tu email y nueva contraseña
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={onSubmited}>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailOutline className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                autoComplete="email"
                {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'El email no es válido'
                    }
                  })}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                         placeholder-gray-400 transition-colors"
                placeholder="tu@ejemplo.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* New Password Input */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlined className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                {...register('new_password', {
                    required: 'La contraseña es obligatoria',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,255}$/,
                      message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y entre 8 y 255 caracteres'
                    }
                  })}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                         placeholder-gray-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
                {errors.new_password && 
                    <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>
                }
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full
                     shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                     transition-colors">
            Actualizar contraseña
          </button>
        </div>
      </form>

      {/* Cancel link */}
      <div className="text-center text-sm">
        <Link to={router.login} className="font-medium text-purple-600 hover:text-purple-500">
            Volver al inicio
        </Link>
      </div>
    </div>
  </div>
  )
}


