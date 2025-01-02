import { Link, useLocation } from "react-router-dom"
import { router } from "../../configs/config.js"
import { Delete  } from "@mui/icons-material";
import { useState } from "react";
import { ReservationModal } from "../reservations/ReservationModal.jsx";

export const TableCardOptions = ({ isAuth, adminMode, table_ID, handleOpen, deleteTableFunc }) => {

    const [ modalOpen, setModalOpen ] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith(router.dashboard);

    return (
        <>
            {(isAuth && !adminMode && isDashboard) &&
                <>
                    <button onClick={handleModalOpen} className="flex-1 bg-purple-600 text-white 
                        px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Reservar
                    </button> 

                    <ReservationModal 
                        open={modalOpen} 
                        onClose={handleModalClose} 
                        table_ID={table_ID}          
                    />
                
                </>
            }

            {(!isAuth && !adminMode) &&
                <Link to={router.dashboard} className="flex-1 bg-purple-600 text-white px-4 py-2
                        rounded-lg hover:bg-purple-700 transition-colors">
                    Ver detalles
                </Link> 
            }

            
            {(isAuth && adminMode) &&
                <>
                    <button onClick={handleOpen} className="flex-1 border border-purple-600 text-purple-600 
                    px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                                Ver Detalles
                    </button>

                    <button onClick={deleteTableFunc} type="button" className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Delete className="mr-2" /> Eliminar
                    </button>        
                </>
            }
        
        
        </>
    )
}

