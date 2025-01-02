import { useState, useEffect } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { SpinnerLoading } from '../../components/common/SpinnerLoading';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from '../../components/common/alerts';
import { router } from '../../configs/config';
import { getAllMyReservations } from '../../API/reservations';
import { ReservationCard } from '../../components/reservations/ReservationCard';
import { Header } from '../../components/reservations/Header';
import { Pagination } from '../../components/common/Pagination';

export const MyReservations = () => {

    const [ loading, setLoading ] = useState(true);
    const [ myReservations, setMyReservations ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalReservations, setTotalReservations ] = useState(0);
    const [ page, setPage ] = useState(1); 
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); }
    const navigate = useNavigate();

    useEffect(() => {
        const getReservations = async () =>{
            try {
                const res = await getAllMyReservations(page);
                if(!res.status) throw new Error(res.message)

                setMyReservations(res.data.reservations);
                setTotalReservations(res.data.total_count);
                setTotalPages(res.data.total_pages)

            } catch (err) {
                await errorAlert({ message : err.message });
                navigate(router.dashboard);
            } finally {
                setLoading(false)
            }
        }

        getReservations();

    }, [page]);

    if (loading) return <SpinnerLoading />

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header 
                    totalPages={totalPages} 
                    currentPage={page} 
                    totalReservations={totalReservations}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myReservations.map((reservation) => (
                        <ReservationCard key={reservation.reservation_ID} reservation={reservation} />
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
