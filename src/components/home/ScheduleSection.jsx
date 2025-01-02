import { AccessTime, Event } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { getFullSchedule } from '../../API/schedule';
import { DayCard } from '../schedule/DayCard';

export const ScheduleSection = () => {
    const [ days, setDays ] = useState([]);
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getAllDays = async () => {
            try {
                const scheduleStored = localStorage.getItem('schedule');

                if(scheduleStored) return setDays(JSON.parse(scheduleStored));
              
                const res = await getFullSchedule();
                if(!res.status) throw new Error(res.message)

                setDays(res.data.data);
                localStorage.setItem("schedule", JSON.stringify(res.data.data));
                
            } catch (err) {
                console.log(err.message);
                setDays([]);
            } finally {
                setLoading(false);
            }

        }  

        getAllDays();

    }, []);

    if (loading) return <SpinnerLoading />

    return (
        <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
            {/* Icono de calendario de Material UI */}
            <Event className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Horario de Atención</h2>
            <p className="text-gray-600">
                Disfruta de nuestra gastronomía los 7 días de la semana
            </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Horario Grid */}
            <div className="grid grid-cols-1 divide-y divide-gray-200">
                {days.map((day, index) => (
                    <DayCard 
                        key={index}
                        weekday={day.weekday} 
                        open_time={day.open_time}
                        close_time={day.close_time}
                    />
                ))}

            </div>

            <div className="bg-purple-50 p-6">
                <div className="flex items-center justify-center text-sm text-purple-600">
                <span className="mr-2">•</span>
                <span>El horario puede variar en días festivos</span>
                <span className="mx-2">•</span>
                <span>Cocina cierra 30 minutos antes</span>
                <span className="ml-2">•</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};
