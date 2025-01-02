import { useState } from 'react';
import { AccessTime } from '@mui/icons-material'; 
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { registerDay, updateDay } from '../../API/schedule';
import { errorAlert, successAlert } from '../common/Alerts.jsx'

export const ScheduleForm = ({ dayData = {}, onClose }) => {
  const weekdays = [ 
    'Lunes', 'Lunes Festivo', 'Martes', 'Martes Festivo', 'Miércoles', 
    'Miércoles Festivo', 'Jueves', 'Jueves Festivo', 'Viernes', 
    'Viernes Festivo', 'Sábado', 'Domingo' 
  ];

  const editMode = dayData.schedule_ID ? true : false;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      weekday: dayData.weekday,
      open_time: dayData.open_time,
      close_time: dayData.close_time
    }
  });

  const onSubmited = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const res = editMode ? await updateDay(values, dayData.schedule_ID) : await registerDay(values);
      if(!res.status) throw new Error(res.message)

      onClose()
      await successAlert({ message : res.data.message });

    } catch (err) {
      onClose()
      await errorAlert({ message : err.message });
    } finally {
      setLoading(false);
    }
  });

  if (loading) return <SpinnerLoading />;

  return (
    <div className="max-w-lg mx-auto bg-white p-10 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <AccessTime className="mx-auto h-14 w-14 text-purple-600" />
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">Configura tu Horario</h2>
        <p className="mt-2 text-lg text-gray-600">Establece el horario de atención para tu servicio.</p>
      </div>

      <form className="space-y-8" onSubmit={onSubmited}>
        <div className="space-y-2">
          <label htmlFor="weekday" className="block text-sm font-medium text-gray-700">
            Día de la semana
          </label>
          <select
            {...register('weekday', { required: 'El día de la semana es obligatorio' })}
            className="mt-1 block w-full px-4 py-3 text-base border border-gray-300 
                      rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-colors">
            <option value="">Selecciona un día</option>
            {weekdays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          {errors.weekday && <p className="text-sm text-red-600">{errors.weekday.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Hora de apertura */}
          <div className="space-y-2">
            <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">
              Hora de apertura
            </label>
            <input
              type="time"
              {...register('open_time', { 
                required: 'La hora de apertura es obligatoria',
                validate: value => {
                  const [hours, minutes] = value.split(':');
                  if (parseInt(hours) > 23 || parseInt(hours) < 0) return 'Hora inválida';
                  if (parseInt(minutes) > 59 || parseInt(minutes) < 0) return 'Minutos inválidos';
                  return true;
                }
              })}
              className="mt-1 block w-full px-4 py-3 text-base border border-gray-300 
                        rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                        transition-colors"
            />
            {errors.open_time && <p className="text-sm text-red-600">{errors.open_time.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700">
              Hora de cierre
            </label>
            <input
              type="time"
              {...register('close_time', { 
                required: 'La hora de cierre es obligatoria',
                validate: value => {
                  const [hours, minutes] = value.split(':');
                  if (parseInt(hours) > 23 || parseInt(hours) < 0) return 'Hora inválida';
                  if (parseInt(minutes) > 59 || parseInt(minutes) < 0) return 'Minutos inválidos';
                  return true;
                }
              })}
              className="mt-1 block w-full px-4 py-3 text-base border border-gray-300 
                        rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                        transition-colors"
            />
            {errors.close_time && <p className="text-sm text-red-600">{errors.close_time.message}</p>}
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full py-3 px-5 text-lg font-medium text-white bg-purple-600 
                       rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-purple-500 transition-all">
            {editMode ? 'Editar' : 'Guardar Día'}
          </button>
        </div>
      </form>
    </div>
  );
};
