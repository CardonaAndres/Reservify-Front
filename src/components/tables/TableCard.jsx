import { TableBar, Tag, Group  } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";;
import { useState } from "react";
import { TableModal } from "./TableModal.jsx";
import { errorAlert, successAlert, warningAlert } from "../common/Alerts.jsx";
import { SpinnerLoading } from "../common/SpinnerLoading.jsx";
import { deleteTable } from "../../API/tables.js";
import { TableCardOptions } from "./TableCardOptions.jsx";

export const TableCard = ({ table_ID, table_number, capacity, adminMode = false }) => {

  const { isAuth } = useAuth();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  const deleteTableFunc = async () => {
      try {
        setLoading(true);
        const warning = await warningAlert({ message: "¿Estás seguro de eliminar esta mesa?" });
        
        if (!warning.isConfirmed) {
          await successAlert({ message : 'Acción cancelada con éxito' });
          return; 
        }
          
        const res = await deleteTable(table_ID);
        if (!res.status) 
          throw new Error(res.message);
        
        await successAlert({ message : 'Mesa eliminada con éxito' });
          
      } catch (err) {
        await errorAlert({ message : err.message })
      } finally {
        setLoading(false);
      }
  }

  if (loading) return <SpinnerLoading />
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <TableBar className="text-purple-600" fontSize="medium" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Mesa {table_number}</h3>
        </div>
        {adminMode &&
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    ID: {table_ID}
            </span>
        }
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-600">
          <Tag className="text-purple-500" fontSize="small" />
          <span>Número de Mesa: {table_number}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <Group className="text-purple-500" fontSize="small" />
          <span>Capacidad: {capacity} personas</span>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <TableCardOptions 
          isAuth={isAuth} 
          adminMode={adminMode} 
          table_ID={table_ID} 
          handleOpen={handleOpen}
          deleteTableFunc={deleteTableFunc}
        />

        <TableModal 
          onClose={handleClose} 
          open={modalOpen} 
          tableData={{ table_ID, table_number, capacity }}
        />
      </div>
    </div>
  );
};
