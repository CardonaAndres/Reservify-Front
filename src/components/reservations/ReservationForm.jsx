import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarToday, AccessTime, Restaurant  } from '@mui/icons-material'
import { useValidateReservation } from '../../hooks/useValidateReservation';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { errorAlert, successAlert } from '../common/Alerts.jsx';
import { createReservation, updateReservation } from '../../API/reservations.js';

export const ReservationForm = ({ onClose, reservationData, table_ID, user_ID }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    const editMode = reservationData.reservation_ID ? true : false;
    const [ loadingRequest, setLoadingRequest ] = useState(false);
    const [ isValidReservation, setIsValidReservation ] = useState(null); 
    const { loading, validateReservation } = useValidateReservation();

    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateString = maxDate.toISOString().split('T')[0]; 

    useEffect(() => {
        if(!table_ID) onClose();          
    }, []);

    const onSubmited = handleSubmit(async (values) => {
      const { reservation_date, reservation_time } = values;
      const isValid = validateReservation(reservation_date, reservation_time);

      if (!isValid) {
          onClose();
          setIsValidReservation(false);
          await errorAlert({message:"La hora de la reserva no es válida para la fecha seleccionada."});
          return;
      }

      try {
        setLoadingRequest(true)
        const res = editMode ? await updateReservation({
          reservation_date, reservation_time, status : 'pendiente', table_ID, user_ID
        }, reservationData.reservation_ID) : await createReservation({
          reservation_date, reservation_time, table_ID
        });

        if(!res.status) throw new Error(res.message)

        onClose();
        await successAlert({ message : res.data.message });
        
      } catch (err) {
        onClose();
        await errorAlert({ message : err.message })
      } finally {
        setLoadingRequest(false)
      }

    });

    if(loadingRequest || loading) return <SpinnerLoading message='Cargando horarios disponibles...'/>

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Restaurant className="h-12 w-12 text-purple-600" />
            </div>
            <div className="mt-4 text-3xl font-bold text-gray-800">
                {editMode ? 'Edita La Reserva' : 'Reserva tu mesa'}
            </div>
            <p className="mt-2 text-gray-600">Completa los detalles de la reserva</p>
          </div>
  
          <form className="mt-8 space-y-6" onSubmit={onSubmited}>
            <div className="space-y-4">
              <div>
                <label htmlFor="reservation_date" className="block text-sm font-medium 
                  text-gray-700 mb-1">
                  Fecha de Reserva
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarToday className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="date" max={maxDateString} min={today} defaultValue={today}
                    {...register("reservation_date", { required: "Este campo es obligatorio" })}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg 
                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                                placeholder-gray-400 transition-colors ${errors.reservation_date ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                    {errors.reservation_date && 
                        <p className="text-red-500 text-sm mt-1">{errors.reservation_date.message}</p>
                    }
              </div>
  
              <div>
                <label htmlFor="reservation_time" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de Reserva
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AccessTime className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="time" defaultValue={reservationData.reservation_time}
                    {...register("reservation_time", { required: "Este campo es obligatorio" })}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg 
                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                                placeholder-gray-400 transition-colors ${errors.reservation_time ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.reservation_time && <p className="text-red-500 text-sm mt-1">{errors.reservation_time.message}</p>}
                </div>
              </div>
  
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Especiales (Opcional)
                </label>
                <textarea rows={3} {...register("notes")} className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500placeholder-gray-400 transition-colors"
                  placeholder="Agregar notas especiales, alergias o preferencias..."
                />
              </div>
            </div>
  
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("terms", { required: "Debe aceptar los términos" })}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded 
                         focus:ring-purple-500 cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Acepto la{" "}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  política de cancelación
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
  
            <div>
              <button type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full
                         shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                         transition-colors">
                { editMode ? 'Editar Reserva'  : 'Confirmar Reserva' }
              </button>
            </div>
          </form>
  
          <div className="text-center text-sm text-gray-500">
            <p>Las reservas están sujetas a disponibilidad.</p>
          </div>
        </div>
      </div>
    );
}
