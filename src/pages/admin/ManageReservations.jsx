import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../components/users/admin/AdminNavbar"
import { Header } from "../../components/reservations/Header";
import { Pagination } from "../../components/common/Pagination";
import { ReservationCard } from "../../components/reservations/ReservationCard";
import { SpinnerLoading } from "../../components/common/SpinnerLoading";
import { getAllMReservations } from "../../API/reservations";
import { errorAlert } from "../../components/common/alerts";
import { router } from "../../configs/config";

export const ManageReservations = () => {

    const [ page, setPage ] = useState(1);
    const [ reservations, setReservations ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalReservations, setTotalReservations ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); } 

    useEffect(() => {
        const getAllReservations = async () => {
            try {
                const res = await getAllMReservations(page);
                if(!res.status) throw new Error(res.message)

                setReservations(res.data.reservations);
                setTotalPages(res.data.total_pages);
                setTotalReservations(res.data.total_count);

            } catch (err) {
                await errorAlert({ message : err.message });
                navigate(router.adminOptions);
            } finally {
                setLoading(false);
            }

        }

        getAllReservations();

    }, [page])

    if(loading) return <SpinnerLoading />

    return (
        <>
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header 
                    totalPages={totalPages} 
                    currentPage={page} 
                    totalReservations={totalReservations}
                    adminMode={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map((reservation) => (
                        <ReservationCard 
                            key={reservation.reservation_ID} 
                            reservation={reservation} 
                            adminMode={true}
                        />
                    ))}
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}  
                />
            </div>
        </>
  )
}
