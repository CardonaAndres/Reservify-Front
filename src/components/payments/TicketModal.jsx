import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../assets/js/styles';
import { TicketCard } from './TicketCard';

export const TicketModal = ({ open, onClose, ticketData }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <TicketCard reservation={ticketData} />
        </Box>
    </Modal>
  )
}
