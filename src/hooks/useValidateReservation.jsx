import { useState, useEffect } from "react";
import { getFullSchedule } from "../API/schedule";

const weekdaysMap = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
};

const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

export const useValidateReservation = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const get_schedule = async () => {
            try {
                setLoading(true);
                const res = await getFullSchedule();
                if (!res.status) throw new Error(res.message);
                setSchedule(res.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        get_schedule();
    }, []);

    const validateReservation = (day, time) => {
        if (loading) return false;

        // Ajustamos la fecha para manejar la zona horaria correctamente
        const [year, month, dayOfMonth] = day.split('-').map(Number);
        const date = new Date(year, month - 1, dayOfMonth, 12, 0, 0);
        const weekday = weekdaysMap[date.getDay()];
        
        const scheduleForDay = schedule.find(
            (item) => item.weekday === weekday
        );

        if (!scheduleForDay) {
            return false;
        }

        const inputTimeInMinutes = convertToMinutes(time);
        const openTimeInMinutes = convertToMinutes(scheduleForDay.open_time);
        const closeTimeInMinutes = convertToMinutes(scheduleForDay.close_time);

        const currentDate = new Date();
        const currentDay = currentDate.toISOString().split('T')[0];
        const currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

        if (day === currentDay && inputTimeInMinutes <= currentTimeInMinutes) {
            return false;
        }

        return (
            inputTimeInMinutes >= openTimeInMinutes && 
            inputTimeInMinutes <= closeTimeInMinutes
        );
    };

    return {
        loading,
        error,
        validateReservation,
    };
};