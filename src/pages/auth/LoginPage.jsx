import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutline, LockOutlined, PersonOutline } from '@mui/icons-material';
import { SpinnerLoading } from '../../components/common/SpinnerLoading.jsx'
import { router } from '../../configs/config.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const LoginPage = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isAuth, login, loading } = useAuth()
  const onSubmited = handleSubmit(async (values) => await login(values.email, values.password));

  useEffect(() => {
      if(isAuth)
        navigate(router.dashboard)    
  }, [isAuth])

  if (loading) return <SpinnerLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center">
            <div className="flex items-center justify-center">
              <PersonOutline className="text-purple-600" sx={{ fontSize : '120px' }} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-800">Bienvenido de nuevo</h2>
            <p className="mt-2 text-gray-600">
              Inicia sesión para gestionar tus reservas
            </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={onSubmited} >
          <div className="space-y-4">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailOutline className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" autoComplete="email"
                  {...register('email', {
                      required: 'El correo electrónico es obligatorio',
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: 'Formato de correo electrónico inválido',
                      },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                  placeholder="tu@ejemplo.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockOutlined className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" autoComplete="current-password"
                  {...register('password', { 
                    required: 'La contraseña es obligatoria' 
                  })}                 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">

            <div className="text-sm">
              <Link to={router.updatePassword} 
                className="font-medium text-purple-600 hover:text-purple-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full
                       shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">¿No tienes una cuenta? </span>
          <Link to={router.register} className="font-medium text-purple-600 hover:text-purple-500">
            Regístrate aquí  
          </Link>
        </div>
      </div>
    </div>
  );
};
