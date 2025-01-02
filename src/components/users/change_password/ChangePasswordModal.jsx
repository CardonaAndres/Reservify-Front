import { modalStyles } from '../../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { ChangePasswordForm } from './ChangePasswordForm.jsx';

export const ChangePasswordModal = ({ open, onClose }) => {

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <ChangePasswordForm onClose={onClose}/>
        </Box>
    </Modal>
  )
}
