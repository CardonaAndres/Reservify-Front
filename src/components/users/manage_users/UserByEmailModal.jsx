import { modalStyles } from '../../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { UserByEmailCard } from './UserByEmailCard.jsx';

export const UserByEmailModal = ({ open, onClose, userData }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <UserByEmailCard user={userData} onClose={onClose} />
            </Box>
        </Modal>
      )
}
