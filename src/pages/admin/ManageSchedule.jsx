import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../../components/users/admin/AdminNavbar';
import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../../components/common/SpinnerLoading';
import { getFullSchedule } from '../../API/schedule';
import { router } from '../../configs/config';
import { errorAlert } from '../../components/common/Alerts.jsx';
import { DayCard } from '../../components/schedule/DayCard';
import { Header } from '../../components/schedule/Header';

export const ManageSchedule = () => {

    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const get_schedule = async () => {
            try {
                const res = await getFullSchedule();
                if (!res.status)
                    throw new Error(res.message)

                setDays(res.data.data);

            } catch (err) { 
                navigate(router.adminOptions);
                await errorAlert({ message: err.message });
            } finally {
                setLoading(false);
            }

        }

        get_schedule();

    }, [navigate]);

    if (loading) return <SpinnerLoading />

    return (
        <>
            <AdminNavbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
                <Header />

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {days.map((day, index) => (
                            <DayCard
                                key={index}
                                schedule_ID={day.schedule_ID}
                                weekday={day.weekday}
                                open_time={day.open_time}
                                close_time={day.close_time}
                                adminMode={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
