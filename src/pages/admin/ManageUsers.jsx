import { AdminNavbar } from '../../components/users/admin/AdminNavbar';
import { SpinnerLoading } from '../../components/common/SpinnerLoading'
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../API/user';
import { router } from '../../configs/config.js';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from '../../components/common/Alerts.jsx';
import { Header } from '../../components/users/manage_users/Header.jsx';
import { UserCard } from '../../components/users/manage_users/UserCard.jsx';
import { Pagination } from '../../components/common/Pagination.jsx';

export const ManageUsers = () => {

    const [page, setPage] = useState(1);
    const [ users, setUsers ] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const handleNextPage = () => {if (page < totalPages) setPage(prev => prev + 1);}
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); } 

    useEffect(() => {
        const get_users = async () => {
            try {
                const res = await getAllUsers(page);
                if(!res.status) throw new Error(res.message)

                setUsers(res.data.users);
                setTotalPages(res.data.total_pages);
                setTotalUsers(res.data.total_count);

            } catch (err) {
                await errorAlert({ message : err.message });
                navigate(router.adminOptions);
            } finally {
                setLoading(false)
            }
        }

        get_users();

    }, [page]);

    if(loading) return <SpinnerLoading/>

    return (
        <>
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header totalUsers={totalUsers} currentPage={page} totalPages={totalPages}/>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {users.map(user => (
                            <UserCard key={user.user_ID} user={user} />
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
