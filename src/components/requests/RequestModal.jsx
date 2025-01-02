import { Modal, Box } from '@mui/material';
import { modalStyles } from '../../assets/js/styles';
import { RequestForm } from './RequestForm';

export const RequestModal = ({ open, onClose }) => {

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <RequestForm onClose={onClose}/>
            </Box>
        </Modal>
    )
}
