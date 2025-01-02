import { useState } from 'react';
import { CreditCard, Phone, Person, Email, AttachMoney } from '@mui/icons-material';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { PaymentSumarry } from './PaymentSumarry';
import { useForm } from 'react-hook-form';
import { errorAlert, successAlert } from '../common/Alerts.jsx';
import { doPayment } from '../../API/payments';

export const PaymentForm = ({ onClose, reservation }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const paymentMethod = watch('payment_method', ''); 
  const isPhoneRequired = paymentMethod === 'nequi' || paymentMethod === 'daviplata';

  const paymentMethods = [
    { id: 'nequi', name: 'Nequi' },
    { id: 'daviplata', name: 'Daviplata'},
    { id: 'bancolombia a la mano', name: 'Bancolombia a la Mano'},
    { id: 'bancolombia personas', name: 'Bancolombia Personas' },
  ];

  const onSubmited = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const { payment_method } = data; const { reservation_ID } = reservation;
      const res = await doPayment({ payment_method, reservation_ID });

      if(!res.status) throw new Error(res.message);

      onClose();
      await successAlert({ message : 'Pago realizado con éxito' });
      
    } catch (err) {
      onClose();
      await errorAlert({ message : err.message });
    } finally{
      setLoading(false);
    }  

  })

  if (loading) return <SpinnerLoading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <AttachMoney className="mx-auto h-12 w-12 text-purple-700" />
            <div className="mt-4 text-3xl font-bold text-gray-800">Información de Pago</div>
            <p className="mt-2 text-gray-600">Complete los detalles para procesar su pago</p>
          </div>

          <form className="space-y-6" onSubmit={onSubmited}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Person className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" {...register('name', { required: 'El nombre es obligatorio' })}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 
                  ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'}`}
                  placeholder="Juan Pérez"/>
              </div>
              {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email"
                  {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Correo electrónico no válido',
                    },
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 
                  ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'}`}
                  placeholder="juan@ejemplo.com"
                />
              </div>
              {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  {...register('payment_method', { required: 'Debe seleccionar un método de pago' })}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 
                  ${errors.paymentMethod ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'}`}>
                  <option value="">Seleccione un método de pago</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>
                )}
            </div>

            {paymentMethod && (
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                  {isPhoneRequired ? 'Número de celular' : 'Número de cuenta'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" {...register('number', { required: 'Este campo es obligatorio' })}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 
                    ${errors.number ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-600'}`}
                    placeholder={isPhoneRequired ? '300 123 4567' : '1234 5678 9012'}
                  />
                </div>
                {errors.number && (
                    <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>
                  )}
              </div>
            )}
            <button type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full
                       shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600
                       transition-colors">
              Pagar ahora
            </button>
          </form>

          {/* Resumen de pago */}
          <PaymentSumarry reservation={reservation} />
        </div>
      </div>
    </div>
  );
};
