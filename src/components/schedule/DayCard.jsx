import { AccessTime, Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';
import { ScheduleModal } from './ScheduleModal';
import { SpinnerLoading } from '../common/SpinnerLoading';
import { errorAlert, successAlert, warningAlert } from "../common/Alerts.jsx";
import { deleteDay } from '../../API/schedule.js'

export const DayCard = ({schedule_ID = 0, weekday, open_time, close_time, adminMode = false }) => {

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false)
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  const deleteDayRequest = async () => {
     try {
        setLoading(true);
        const warning = await warningAlert({  });

        if(!warning.isConfirmed){
          await successAlert({ message : 'Acción cancelada con éxito' });
          return;
        }
        
        const res = await deleteDay(schedule_ID);
        if(!res.status) throw new Error(res.message)

        await successAlert({ message : res.message });

     } catch (error) {
        await errorAlert({ message : error.message });
     } finally {
      setLoading(false);
     }
  }

  if (loading) return <SpinnerLoading />

  return (
    <div className="flex justify-between items-center p-6">
        <div className="flex items-center">
            <AccessTime className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-lg font-medium text-gray-800"> {weekday} </span>
            </div>
        <span className="text-sm text-gray-600"> {open_time} - {close_time} </span>
        {adminMode && (
          <div className="flex items-center space-x-3">

            <span className="text-sm text-gray-500">
              <strong>ID:</strong> {schedule_ID}
            </span>

            <button onClick={handleOpen} className="flex items-center px-4 py-2 border border-purple-600 
              text-purple-600 rounded-full hover:bg-purple-50 transition-colors">
              <Edit className="mr-2" />
              Editar
            </button>

            <ScheduleModal 
              open={modalOpen} 
              onClose={handleClose} 
              dayData={{ schedule_ID, weekday, open_time, close_time }}       
            />

            <button className="flex items-center px-4 py-2 border border-purple-600 
              text-purple-600 rounded-full hover:bg-purple-50 transition-colors" 
              onClick={deleteDayRequest}>
              <Delete className="mr-2" />
              Eliminar
            </button>
          </div>
      )}
      
    </div>
  )
}
