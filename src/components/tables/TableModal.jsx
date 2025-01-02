import { modalStyles } from '../../assets/js/styles.js';
import { Modal, Box } from '@mui/material';
import { TableForm } from './TableForm.jsx';

export const TableModal = ({ open, onClose, tableData = {} }) => {
    const formatData = {
        table_ID : tableData.table_ID || null,
        table_number : tableData.table_number || null,
        capacity : tableData.capacity || null
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <TableForm onClose={onClose} tableData={formatData}/>
            </Box>
        </Modal>
    )
}
