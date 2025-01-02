import { Delete, Payment, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { errorAlert, successAlert, warningAlert } from '../common/Alerts.jsx';
import { deleteReservation } from '../../API/reservations';
import { ReservationModal } from './ReservationModal.jsx'
import { PaymentFormModal } from '../payments/PaymentFormModal';

export const ReservationCarOptions = ({ adminMode, reservation }) => {

    const [ loading, setLoading ] = useState(false);
    const [ reservationData, setReservationData ] = useState({})
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalOpenPayment, setModalOpenPayment ] = useState(false);
    const handleClose = () =>  setModalOpen(false);
    const handleOpen = () => setModalOpen(true);
    const handleClosePayment = () =>  setModalOpenPayment(false);
    const handleOpenPayment = () => setModalOpenPayment(true);

    const onDelete = async () => {
        try {
            setLoading(true);
            const warning = await warningAlert({ });
            if(!warning.isConfirmed){
                await successAlert({ message : 'Acción cancelada con éxito' });
                return;
            }

            const res = await deleteReservation(reservation.reservation_ID);
            if (!res.status) throw new Error(res.message)
            await successAlert({ })

        } catch (err) {
            await errorAlert({ message : err.message })
        } finally {
            setLoading(false);
        }
    }

    const onUpdate = () => {
        setReservationData({
            reservation_ID : reservation.reservation_ID,
            reservation_date : reservation.reservation_date,
            reservation_time : reservation.reservation_time,
        });
        handleOpen();
    }

    if (loading) return <SpinnerLoading />

    return (
        <>
            {(!adminMode && reservation.status !== 'confirmada' ) && 
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">

                    <button onClick={onDelete} className="text-red-500 
                        hover:text-red-700 focus:outline-none">
                        <Delete className="h-5 w-5" />
                    </button>

                    {(reservation.status !== 'cancelada' && reservation.status !== 'finalizado') &&
                        <>
                            <button onClick={handleOpenPayment} 
                                className="text-green-500 hover:text-green-700 focus:outline-none">
                                <Payment className="h-5 w-5" />
                            </button>

                            <PaymentFormModal 
                                onClose={handleClosePayment} 
                                open={modalOpenPayment} 
                                reservation={reservation}
                            />
                        
                        </>
                    }
                </div>  
            }
            {adminMode &&
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button onClick={onUpdate} className="text-blue-500 
                        hover:text-blue-700 focus:outline-none">
                        <Edit className="h-5 w-5" />
                    </button>
                    <ReservationModal
                        open={modalOpen}
                        onClose={handleClose}
                        reservationData={reservationData}
                        table_ID={reservation.table_ID}
                        user_ID={reservation.user_ID}
                    />

                </div>  
            }  
        </>
    )
}

