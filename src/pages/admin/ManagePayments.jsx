import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../../components/users/admin/AdminNavbar'
import { SpinnerLoading } from '../../components/common/SpinnerLoading';
import { getAllPayments } from '../../API/payments';
import { errorAlert } from '../../components/common/Alerts.jsx';
import { router } from '../../configs/config';
import { Header } from '../../components/payments/Header';
import { Pagination } from '../../components/common/Pagination';
import { TicketCard } from '../../components/payments/TicketCard';

export const ManagePayments = () => {
    const [ page, setPage ] = useState(1);
    const [ tickets, setTickets ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalTickets, setTotalTickets ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); } 

    useEffect(() => {
        const getTickets = async () => {
            try {
                const res = await getAllPayments(page);
                if(!res.status) throw new Error(res.message)
                 
                setTickets(res.data.tickets);
                setTotalTickets(res.data.total_count);
                setTotalPages(res.data.total_pages);
            } catch (err) {
                navigate(router.adminOptions);
                await errorAlert({ message : err.message });
            } finally {
                setLoading(false);
            }
        }

        getTickets();

    },[page]);

    if (loading) return <SpinnerLoading />

    return (
        <>
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header 
                    totalTickets={totalTickets}
                    totalPages={totalPages}
                    currentPage={page}              
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket, index) => (
                        <TicketCard reservation={ticket} key={index}/>
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
