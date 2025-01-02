import { useState, useEffect } from 'react';
import { AdminNavbar } from '../../components/users/admin/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { SpinnerLoading } from '../../components/common/SpinnerLoading';
import { getAllTables } from '../../API/tables';
import { Pagination } from '../../components/common/Pagination';
import { errorAlert } from '../../components/common/alerts';
import { router } from '../../configs/config';
import { TableCard } from '../../components/tables/TableCard';
import { Header } from '../../components/tables/Header';

export const ManageTables = () => {
    const [page, setPage] = useState(1);
    const [tables, setTables] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalTables, setTotalTables] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNextPage = () => { if (page < totalPages) setPage((prev) => prev + 1)};
    const handlePrevPage = () => { if (page > 1) setPage((prev) => prev - 1) };

    useEffect(() => {
        const get_tables = async () => {
            try {
                const res = await getAllTables(page);
                if (!res.status) throw new Error(res.message);

                setTables(res.data.tables.tables);
                setTotalPages(res.data.tables.total_pages);
                setTotalTables(res.data.tables.total_count);
            } catch (err) {
                await errorAlert({ message: err.message });
                navigate(router.adminOptions);
            } finally {
                setLoading(false);
            }
        };

        get_tables();
    }, [page]);

    if (loading) return <SpinnerLoading />;

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header 
                    totalPages={totalPages} 
                    totalTables={totalTables} 
                    currentPage={page} 
                    adminMode={true}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tables.map((table, index) => (
                        <TableCard
                            key={index}
                            table_ID={table.table_ID}
                            table_number={table.table_number}
                            capacity={table.capacity}
                            adminMode={true}
                        />
                    ))}
                </div>

                {/* Paginación */}
                <div className="mt-8 flex justify-center">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage}
                    />
                </div>
            </div>
        </>
    );
};
