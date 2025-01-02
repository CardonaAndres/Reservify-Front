import { AdminNavbar } from "../../components/users/admin/AdminNavbar"
import { Header } from "../../components/requests/Header";
import { useEffect, useState } from "react"
import { Pagination } from "../../components/common/Pagination";
import { SpinnerLoading } from "../../components/common/SpinnerLoading";
import { getAllRequests } from "../../API/request";
import { errorAlert } from "../../components/common/alerts";
import { useNavigate } from "react-router-dom";
import { router } from "../../configs/config";
import { ServiceRequestCard } from "../../components/requests/ServiceRequestCard";

export const ManageRequests = () => {
    const [ page, setPage ] = useState(1);
    const [ requests, setRequests ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalRequests, setTotalRequests ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); } 

    useEffect(() => {
        const getRequests = async () => {
            try{
                const res = await getAllRequests(page);
                if(!res.status) throw new Error(res.message)
                setRequests(res.data.requests);
                setTotalRequests(res.data.total_count);
                setTotalPages(res.data.total_pages);
            } catch (err){
                await errorAlert({ message : err.message });
                navigate(router.adminOptions);
            } finally {
                setLoading(false);
            }
        }

        getRequests();
    }, [page]);

    if(loading) return <SpinnerLoading />

    return (
        <>
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header 
                    totalPages={totalPages} 
                    currentPage={page} 
                    totalRequests={totalRequests}
                    adminMode={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request, index) => (
                        <ServiceRequestCard key={index} request={request} adminMode={true} />
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
