import { modalStyles } from '../../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { RoleManagementCard } from './RoleManagementCard.jsx';

export const RoleManagementModal = ({ open, onClose, email, currentRoleID }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <RoleManagementCard email={email} currentRoleID={currentRoleID} onClose={onClose} />
            </Box>
        </Modal>
      )
}
