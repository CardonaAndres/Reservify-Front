import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserByEmailModal } from "./UserByEmailModal.jsx";
import { SpinnerLoading } from '../../common/SpinnerLoading.jsx'
import { errorAlert } from '../../common/Alerts.jsx'
import { getUserByEmail } from "../../../API/user.js";

export const Header = ({ totalUsers, currentPage, totalPages }) => {

  const { register, handleSubmit } = useForm();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ userData, setUserData ] = useState({});
  const [ loading, setLoading ] = useState(false)
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  const searchUser = handleSubmit(async values => {
      try {
        setLoading(true);
        const res = await getUserByEmail(values.email);
        if(!res.status)
          throw new Error(res.message)

        setUserData(res.data.user); handleOpen();

      } catch (err) {
          await errorAlert({ message : err.message  });
      } finally {
        setLoading(false)
      }
  });

  if(loading) return <SpinnerLoading />

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Usuarios Registrados</h2>
          <p className="text-gray-600 mt-1">Total de usuarios: {totalUsers}</p>
        </div>
        <div className="flex items-center space-x-4 w-full lg:w-1/2">
          <div className="flex items-center bg-purple-50 rounded-full shadow-md px-4 py-2 space-x-2 w-full">
            <SearchIcon className="text-purple-500" />
            <input {...register("email",{ required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El email no es válido'
                },                     
                  minLength: {
                  value: 15,  
                  message: 'El email debe tener al menos 15 caracteres'
                }
            })} type="text" placeholder='Buscar usuario...'
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"/>
          </div>
          <button onClick={searchUser}
          className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-600 transition">
            Buscar
          </button>
        </div>

        <UserByEmailModal open={modalOpen} onClose={handleClose} userData={userData}/>

        <div className="text-right">
          <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
        </div>
      </div>
    </div>
  );
};
