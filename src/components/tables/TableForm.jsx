import { TableRestaurant, People } from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { createTable, updateTable } from '../../API/tables';
import { errorAlert, successAlert } from '../common/Alerts';


export const TableForm = ({ onClose, tableData }) => {

    const isEditing = tableData.table_ID ? true : false;
    const [ loading, setLoading ] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues : {
            table_number : tableData.table_number,
            capacity : tableData.capacity
        }
    });

    const onSubmited = handleSubmit(async (values) => {
        try {
            setLoading(true);
            const res = isEditing ? await updateTable(values, tableData.table_ID) : await createTable(values);

            if(!res.status)
                throw new Error(res.message)

            onClose();
            await successAlert({ message : res.data.message });

        } catch (err) {
            onClose();
            await errorAlert({ message : err.message })
        } finally {
            setLoading(false);
        }
    });

    if(loading) return <SpinnerLoading />

    return (
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center">
            <TableRestaurant className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Mesa' : 'Nueva Mesa'}
            </h2>
            <p className="mt-2 text-gray-600">
                {isEditing
                    ? 'Modifica los detalles de la mesa existente'
                    : 'Configura una nueva mesa para el restaurante' 
                }
            </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={onSubmited}>
            {/* Table Number Input */}
            <div>
            <label htmlFor="table_number" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Mesa
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TableRestaurant className="text-gray-400" />
                </div>
                <input
                    type="number"
                    min="1" 
                    {...register('table_number', { required : 'Ingresa el numero de mesa' }) }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            placeholder-gray-400 transition-colors"
                    placeholder="Ej: 15" 
                />
            </div>
            <p className="mt-1 text-sm text-gray-500">
                {errors.table_number ? 
                    <p className="text-red-500 text-sm">{errors.table_number.message}</p>:
                    'Ingresa un número único para identificar la mesa'
                }             
            </p>
            </div>

            <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacidad
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <People className="text-gray-400" />
                </div>
                <input
                    {...register('capacity',{ required : 'Ingresa la capacidad maxima de personas' })}
                    type="number"
                    min="2"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            placeholder-gray-400 transition-colors"
                    placeholder="Ej: 4" 
                />
            </div>
            <p className="mt-1 text-sm text-gray-500">
                {errors.capacity ? 
                    <p className="text-red-500 text-sm">{errors.capacity.message}</p>:
                    'Número máximo de comensales que pueden sentarse'
                }
            </p>
            </div>

            <div className="flex gap-4 pt-4">
            <button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-full
                        text-white bg-purple-600 hover:bg-purple-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                        transition-colors">
                {isEditing ? 'Guardar Cambios' : 'Crear Mesa'}
            </button>
            <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-full
                        text-gray-700 bg-white hover:bg-gray-100
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                        transition-colors"
            >
                Cancelar
            </button>
            </div>
        </form>
        </div>
    );
};
