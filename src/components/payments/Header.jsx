import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { TicketModal } from "./TicketModal";
import { SpinnerLoading } from "../common/SpinnerLoading";
import { getPayment } from "../../API/payments";
import { errorAlert } from "../common/alerts";

export const Header = ({totalTickets, currentPage, totalPages }) => {

    const { register, handleSubmit } = useForm();
    const [ ticket, setTicket ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const handleModalClose = () => setModalOpen(false);
    const handleModalOpen = handleSubmit(async (values) => {       
        try{
            setLoading(true)
            const { reservation_ID } = values;
            const res = await getPayment(reservation_ID);
            if(!res.status) throw new Error(res.message)
            setTicket(res.data);
            setModalOpen(true);
        } catch (err) {
            await errorAlert({ message : err.message });
        } finally {
            setLoading(false)
        }
        
    });
    
    if(loading) return <SpinnerLoading />

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center 
                space-y-4 lg:space-y-0">

                <div>
                    <p className="text-gray-600 mt-1">Total de reservas pagas: {totalTickets}</p>
                </div>

    
                <div className="flex items-center space-x-4 w-full lg:w-1/2">
                    <div className="flex items-center bg-purple-50 rounded-full shadow-md px-4 
                        py-2 space-x-2 w-full">
                        <SearchIcon className="text-purple-500" />
                        <input {...register("reservation_ID",{ required: true })} 
                            type="text" placeholder='Buscar reserva paga...' className="bg-transparent
                        outline-none w-full text-gray-800 placeholder-gray-500"/>
                    </div>
                    <button  onClick={handleModalOpen} className="bg-purple-500 text-white px-4 
                        py-2 rounded-full shadow-md hover:bg-purple-600 transition">
                        Buscar
                    </button>

                    <TicketModal open={modalOpen} onClose={handleModalClose} ticketData={ticket}/>

                </div>

                <div className="text-right">
                    <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
                </div>

            </div>
        </div>
    )
}
