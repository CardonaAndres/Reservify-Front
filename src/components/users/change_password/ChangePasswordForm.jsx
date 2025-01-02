import { Lock, Key } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { errorAlert, successAlert } from '../../common/alerts';
import { useAuth } from '../../../context/AuthContext';
import { SpinnerLoading } from '../../common/SpinnerLoading';

export const ChangePasswordForm = ({ onClose }) => {

    const { updatePassword, loading, user, logout } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmited = handleSubmit(async (values) => {

        if (values.password !== values.confirm_password){
            onClose();
            return errorAlert({ message : 'Error al confirmar la contraseña' });
        }

        const res = await updatePassword(user.email, values.password);
        if(res)
            return await logout()

    });

    if (loading) return <SpinnerLoading />

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <Key className="h-12 w-12 text-purple-600" sx={{ fontSize : '64px'  }} />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-800">Cambiar Contraseña</h2>
                    <p className="mt-2 text-gray-600">
                        Ingresa y confirma tu nueva contraseña
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={onSubmited}>
                    <div className="space-y-4">
                        {/* New Password Input */}
                        <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'La contraseña es obligatoria',
                                    pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,255}$/,
                                    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y entre 8 y 255 caracteres'
                                    }
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && 
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        }
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center    pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                {...register('confirm_password', {
                                    required: 'La contraseña es obligatoria',
                                    pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,255}$/,
                                    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y entre 8 y 255 caracteres'
                                    }
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                                        focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                                        placeholder-gray-400 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.confirm_password && 
                            <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
                        }
                        </div>
                    </div>

                    {/* Warning Message */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-700">
                        Por seguridad, después de cambiar tu contraseña deberás iniciar sesión nuevamente.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-3">
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                            Cambiar Contraseña
                        </button>
                        <button type="button" onClick={onClose} className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
