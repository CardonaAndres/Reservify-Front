import { useForm } from 'react-hook-form';
import { Person, Lock, Email, Phone, PersonAdd } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { router } from '../../configs/config.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SpinnerLoading } from '../../components/common/SpinnerLoading.jsx';
import { useEffect } from 'react';

export const RegisterPage = () => {
  const { isAuth, loading, register } = useAuth();
  const { register : formRegister, handleSubmit, formState: { errors } } = useForm();
  const onSubmited = handleSubmit(async(values) => await register(values))
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuth)
      navigate(router.dashboard)

  }, [isAuth, navigate])

  if (loading) return <SpinnerLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <PersonAdd className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">Crear cuenta</h2>
          <p className="mt-2 text-gray-600">
            Únete a Reservify y comienza a disfrutar
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={onSubmited}>
          <div className="space-y-4">
            {/* Nombre Input */}
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
                  {...formRegister('name', { required: 'El nombre es obligatorio' })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                  placeholder="Juan Pérez"
                />
                
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  {...formRegister('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'El email no es válido'
                    },                     
                     minLength: {
                      value: 15,  
                      message: 'El email debe tener al menos 15 caracteres'
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

            {/* Teléfono Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Número de celular
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  {...formRegister('cellphone', {
                    required: 'El número de celular es obligatorio',
                    pattern: {
                      value: /^\+?\d{7,20}$/,
                      message: 'El número de celular no es válido'
                    }
                  })}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           placeholder-gray-400 transition-colors"
                  placeholder="+34 123 456 789"
                />

              </div>
              {errors.cellphone && 
                  <p className="text-red-500 text-sm mt-1">{errors.cellphone.message}</p>
                }
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...formRegister('password', {
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
              {errors.password && 
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              }
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" required
              className="h-4 w-4 text-purple-600 border-gray-300 rounded 
                       focus:ring-purple-500 cursor-pointer"/>

            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Acepto los 
              <Link className="text-purple-600 hover:text-purple-500">
                Términos y Condiciones
              </Link> y la{' '}
              <Link  className="text-purple-600 hover:text-purple-500">
                Política de Privacidad
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full
                       shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       transition-colors">
              Crear cuenta
            </button>
          </div>
        </form>

        {/* Sign in link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">¿Ya tienes una cuenta? </span>
          <Link to={router.login} className="font-medium text-purple-600 hover:text-purple-500">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};
