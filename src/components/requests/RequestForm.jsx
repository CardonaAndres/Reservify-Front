import { Message, Send } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { errorAlert, successAlert } from '../common/Alerts.jsx';
import { SpinnerLoading } from '../common/SpinnerLoading'
import { sendRequest } from '../../API/request';
import Cookies from 'js-cookie'

export const RequestForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState(false);
  
  const onSubmited = handleSubmit(async (values) => {
    try {
        setLoading(true);
        const res = await sendRequest(values);
        if(!res.status) throw new Error(res.message)
        Cookies.set('requestTimestamp', 'true', { expires: 3 / 24 });
        onClose()
        await successAlert({ message : res.message })

    } catch (err) {
        onClose();
        await errorAlert({ message : err.message });
    } finally {
      setLoading(false);
    }
  });

  if(loading) return <SpinnerLoading />

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Message className="h-12 w-12 text-purple-600" sx={{ fontSize : '64px' }} />
          </div>
          <div className="mt-4 text-3xl font-bold text-gray-800">
            Contacta con Nosotros
          </div>
          <p className="mt-2 text-gray-600">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
            Nuestro equipo te responderá lo antes posible.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmited}>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Asunto
            </label>
            <input type="text"
              {...register('title', { 
                required: 'El asunto es obligatorio', 
                minLength: { value: 5, message: 'El asunto debe tener al menos 5 caracteres' } 
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                       placeholder-gray-400 transition-colors"
              placeholder="Escribe el asunto de tu mensaje"
            />
             {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea rows={6} {...register('description', { 
                required: 'El mensaje es obligatorio',
                minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' } 
                })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                       placeholder-gray-400 transition-colors resize-none"
              placeholder="Escribe tu mensaje aquí..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adjuntar archivo (opcional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 
                border-gray-300 border-dashed rounded-lg hover:border-purple-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" 
                    fill="none" viewBox="0 0 48 48" aria-hidden="true" >
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white 
                    rounded-md font-medium text-purple-600 hover:text-purple-500">
                    <span>Sube un archivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF hasta 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button  type="submit" className="flex items-center justify-center px-6 py-3 
                bg-purple-600 text-white rounded-full hover:bg-purple-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-purple-500 transition-colors">
              <Send className="h-5 w-5 mr-2" />
              Enviar Mensaje
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            ¿Necesitas ayuda inmediata? Llámanos al{' '}
            <a className="text-purple-600 hover:text-purple-500">
              +00 000 000 00
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
