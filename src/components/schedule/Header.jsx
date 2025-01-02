import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SpinnerLoading } from '../common/SpinnerLoading.jsx'
import { ScheduleModal } from "./ScheduleModal.jsx";
import { errorAlert } from "../common/Alerts.jsx";
import { getDayByID } from "../../API/schedule.js";

export const Header = () => {

  const { register, handleSubmit } = useForm();

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ dayData, setDayData ] = useState({});
  const [ loading, setLoading ] = useState(false)
  const handleClose = () =>  setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  const searchUser = handleSubmit(async values => {
    try {
      setLoading(true);
      const res = await getDayByID(values.schedule_ID);

      if(!res.status) throw new Error(res.message)

      setDayData(res.data);
      handleOpen();

    } catch (err) {
      await errorAlert({ message : err.message });
    } finally {
      setLoading(false);
    }
 
  });

  if(loading) return <SpinnerLoading />

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
            <div className="text-2xl font-bold text-gray-800">Gestión De Horario</div>
        </div>

            <div className="flex items-center space-x-4 w-full lg:w-1/2">
              <div className="flex items-center bg-purple-50 rounded-full shadow-md px-4 py-2 
                space-x-2 w-full">
                <SearchIcon className="text-purple-500" />
                <input {...register("schedule_ID", { required : true })} 
                  type="text" placeholder='Buscar día por su ID...'
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
                Registrar Dia
            </button>

            <ScheduleModal onClose={handleClose} open={modalOpen} dayData={dayData}/>
            
      </div>
    </div>
  );
};
