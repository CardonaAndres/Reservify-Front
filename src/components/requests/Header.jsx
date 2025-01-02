import { useState } from 'react'
import { RequestModal } from "./RequestModal";
import { errorAlert } from '../common/Alerts.jsx';
import Cookies from 'js-cookie'

export const Header = ({ adminMode = false, totalRequests, currentPage, totalPages  }) => {
  const [ modalOpen, setModalOpen ] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const handleOpen = async () => {
    const requestTimestamp = Cookies.get('requestTimestamp');
    if(requestTimestamp){
      await errorAlert({ message : 'Debes esperar 3 horas para volver a mandarnos algún mensaje.' });
      return;
    }
      
    setModalOpen(true)
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center 
                space-y-4 lg:space-y-0">

            <div>
                <p className="text-gray-600 mt-1">Total de mensajes : {totalRequests}</p>
            </div>

            <div className="flex justify-between items-center w-full lg:w-auto space-x-4">
                <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
                {!adminMode &&
                  <button onClick={handleOpen} className="bg-purple-600 text-white px-4 py-2 rounded-md 
                      hover:bg-purple-700 transition-colors text-sm">
                      Habla con nosotros ...
                  </button>
                }
                <RequestModal open={modalOpen} onClose={handleCloseModal} /> 
            </div>
        </div>
    </div>
  )
}

