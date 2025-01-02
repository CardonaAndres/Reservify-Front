import { useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/requests/Header';
import { Pagination } from '../../components/common/Pagination';
import { SpinnerLoading } from '../../components/common/SpinnerLoading';
import { getAllMyRequests } from '../../API/request';
import { ServiceRequestCard } from '../../components/requests/ServiceRequestCard';
import { errorAlert } from '../../components/common/Alerts.jsx';
import { router } from '../../configs/config';

export const MyRequests = () => {
    const [ page, setPage ] = useState(1);
    const [ requests, setRequests ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalRequests, setTotalRequests ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); } 

    useEffect(() => {
        const getMyRequests = async () =>{
            try {
                const res = await getAllMyRequests(page);
                if(!res.status) throw new Error(res.message)
                setRequests(res.data.requests);
                setTotalRequests(res.data.total_count);
                setTotalPages(res.data.total_pages);
            } catch (err) {
                await errorAlert({ message : err.message });
                navigate(router.dashboard);
            } finally {
              setLoading(false);
            }
        }

        getMyRequests();

    },[page]);

    if(loading) return <SpinnerLoading />

    return (
    <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Header 
                totalPages={totalPages} 
                currentPage={page} 
                totalRequests={totalRequests}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request, index) => (
                        <ServiceRequestCard key={index} request={request} />
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


