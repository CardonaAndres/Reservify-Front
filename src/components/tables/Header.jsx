import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SpinnerLoading } from '../common/SpinnerLoading.jsx'
import { errorAlert } from '../common/Alerts'
import { TableModal } from "./TableModal.jsx";
import { getTableByID } from "../../API/tables.js";

export const Header = ({ totalTables, currentPage, totalPages, adminMode = false }) => {

  const { register, handleSubmit } = useForm();

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ tableData, setTableData ] = useState({});
  const [ loading, setLoading ] = useState(false)
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  const searchUser = handleSubmit(async values => {

    try {
      setLoading(true);

      const res = await getTableByID(values.table_ID);
      
      if(!res.status) throw new Error(res.message)
      if(!res.data) throw new Error('La mesa con el ID dado no existe')

      setTableData(res.data);
      handleOpen();
    
    } catch (err) {
      await errorAlert({ message : err.message })
    } finally {
      setLoading(false);
    }
 
  });

  if(loading) return <SpinnerLoading />

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <p className="text-gray-600 mt-1">Total de mesas: {totalTables}</p>
        </div>
        {adminMode && 
          <>
            <div className="flex items-center space-x-4 w-full lg:w-1/2">
              <div className="flex items-center bg-purple-50 rounded-full shadow-md px-4 py-2 
                space-x-2 w-full">
                <SearchIcon className="text-purple-500" />
                <input {...register("table_ID")} type="text" placeholder='Buscar mesa por su ID...'
                  className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"/>
              </div>
              <button onClick={searchUser}
                className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md 
                hover:bg-purple-600 transition">
                Buscar
              </button>
            </div>

            <button onClick={handleOpen} className="bg-purple-500 text-white px-4 py-2 
                rounded-full shadow-md hover:bg-purple-600 transition">
                Registrar Mesa
            </button>
            
          <TableModal onClose={handleClose} open={modalOpen} tableData={tableData} />
          </>  
        }
        <div className="text-right">
          <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
        </div>
      </div>
    </div>
  );
};
