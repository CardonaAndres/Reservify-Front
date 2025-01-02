import { ProfileEditForm } from './ProfileEditForm.jsx';
import { modalStyles } from '../../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';

export const ProfileModal = ({ open, onClose, userData }) => {

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <ProfileEditForm onClose={onClose} userData={userData}/>
        </Box>
    </Modal>
  )
}
