import { modalStyles } from '../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { ScheduleForm } from './ScheduleForm.jsx';

export const ScheduleModal = ({ open, onClose, dayData = {} }) => {

    const formatData = {
        schedule_ID : dayData.schedule_ID || null,
        weekday : dayData.weekday || null,
        open_time : dayData.open_time || null,
        close_time : dayData.close_time || null
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <ScheduleForm onClose={onClose} dayData={formatData} />
            </Box>
        </Modal>
    )
}
