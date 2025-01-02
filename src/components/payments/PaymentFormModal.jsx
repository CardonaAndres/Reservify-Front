import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../assets/js/styles';
import { PaymentForm } from './PaymentForm';

export const PaymentFormModal = ({ onClose, open, reservation }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
           <PaymentForm onClose={onClose} reservation={reservation} />
        </Box>
    </Modal>
  )
}
