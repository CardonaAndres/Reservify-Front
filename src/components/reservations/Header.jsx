import SearchIcon from "@mui/icons-material/Search";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SpinnerLoading } from "../common/SpinnerLoading";
import { errorAlert, successAlert } from "../common/Alerts.jsx";
import { getReservationByID, verifyAllReservations } from "../../API/reservations";
import { ReservationModal } from "./ReservationModal";

export const Header = ({ adminMode = false, totalReservations, currentPage, totalPages }) => {

    const { register, handleSubmit } = useForm();
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ reservation , setReservation ] = useState({});
    const [ loading, setLoading ] = useState(false)
    const handleClose = () =>  setModalOpen(false);
    const handleOpen = () => setModalOpen(true);

    const onVerifyAllReservations = async () => {
        try {
            setLoading(true);
            const reservationsWereValidated = Cookies.get('reservationsWereValidated');
            if (reservationsWereValidated) 
                throw new Error('Debes esperar dos horas para volver a validar');

            const res = await verifyAllReservations()
            if(!res.status) throw new Error(res.message)
            
            await successAlert({ message: 'Todas las reservas fueron validadas' });
            Cookies.set('reservationsWereValidated', 'true', { expires: 2 / 24 });

        } catch (err) {
            await errorAlert({ message : err.message })
        } finally {
            setLoading(false);
        }

    }

    const onSearch = handleSubmit(async (values) => {
        const { reservation_ID  } = values;
        try {
            setLoading(true);
            const res = await getReservationByID(reservation_ID);
            if(!res.status) throw new Error(res.message);
            setReservation(res.data.reservation);
            handleOpen();
        } catch (err) { 
            await errorAlert({ message : err.message });
        } finally {
            setLoading(false);
        }
    });

    if (loading) return <SpinnerLoading />

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center 
                space-y-4 lg:space-y-0">

                <div>
                    <p className="text-gray-600 mt-1">Total de reservas: {totalReservations}</p>
                </div>

                {adminMode &&
                <>
                    <div className="flex items-center space-x-4 w-full lg:w-1/2">
                        <div className="flex items-center bg-purple-50 rounded-full shadow-md px-4 
                            py-2 space-x-2 w-full">
                              <SearchIcon className="text-purple-500" />
                              <input {...register("reservation_ID",{ required: true })} 
                                type="text" placeholder='Buscar reserva...' className="bg-transparent
                               outline-none w-full text-gray-800 placeholder-gray-500"/>
                        </div>
                        <button onClick={onSearch} className="bg-purple-500 text-white px-4 
                            py-2 rounded-full shadow-md hover:bg-purple-600 transition">
                            Buscar
                        </button>

                    </div>
                    <button onClick={onVerifyAllReservations} className="bg-purple-500 text-white 
                        px-4 py-2 rounded-full shadow-md hover:bg-purple-600 transition">
                        Validar reservas
                    </button>
                    <ReservationModal 
                        onClose={handleClose}
                        open={modalOpen}
                        table_ID={reservation.table_ID}
                        reservationData={reservation}
                        user_ID={reservation.table_ID}         
                    />
                </>
                }

                <div className="text-right">
                    <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
                </div>

            </div>
        </div>
    )
}


