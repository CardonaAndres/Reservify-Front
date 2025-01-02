import { useState, useEffect } from "react"
import { TableCard } from "../tables/TableCard.jsx";
import { SpinnerLoading } from "../common/SpinnerLoading.jsx";
import { getAllTables } from "../../API/tables.js";

export const TableSection = () => {
    const [ tables, setTables ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const get_tables = async () => {
            try {
                const tablesStored = localStorage.getItem('tables');
                if(tablesStored)
                    return setTables(JSON.parse(tablesStored));

                const res = await getAllTables(1);
                if (!res.status) throw new Error(res.message);

                const tablesData = res.data.tables.tables;

                setTables(tablesData.slice(0, -1));
                localStorage.setItem("tables", JSON.stringify(tablesData.slice(0, -1)));
              
            } catch (err) {
                console.log(err.message);
                setTables([])
            } finally {
                setLoading(false);
            }
        }

        get_tables();

    }, []);

    if (loading) return <SpinnerLoading />

    return (
        
        <div className="py-12 bg-gradient-to-br from-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="text-3xl font-bold text-gray-800 mb-4">
                       Algunas De Nuestras Mesas Disponibles
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                    Explora nuestras mesas y encuentra la perfecta para tu ocasión. 
                    Cada mesa está diseñada para brindarte la mejor experiencia.
                    </p>
                </div>
                {/* Grid de Mesas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tables.map((table, index) => (
                        <TableCard
                            key={index}
                            tableId={table.table_ID}
                            tableNumber={table.table_number}
                            capacity={table.capacity}
                        />
                    ))}
                </div>

            </div>
      </div>
    )
}
