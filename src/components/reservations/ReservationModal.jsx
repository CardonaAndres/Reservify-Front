import { modalStyles } from '../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { ReservationForm } from './ReservationForm.jsx';

export const ReservationModal = ({ open, onClose, reservationData = {}, table_ID, user_ID = 0 }) => {

    const formatData = {
        reservation_ID : reservationData.reservation_ID || 0,
        reservation_date : reservationData.reservation_date || '2006-06-08',
        reservation_time : reservationData.reservation_time || null,
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <ReservationForm 
                    onClose={onClose} 
                    reservationData={formatData} 
                    table_ID = {table_ID}
                    user_ID = { user_ID }
                />
            </Box>
        </Modal>
    )
}
