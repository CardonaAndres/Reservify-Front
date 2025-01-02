import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { SpinnerLoading } from "../common/SpinnerLoading";
import { router } from "../../configs/config.js";

export const AccessControl = () => {

    const { user, loading: authLoading } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const [ isAllowed, setIsAllowed ] = useState(false);

    useEffect(() => {
        const verifyAccess = async () => {
            if (authLoading) return

            if(user?.role_ID === 1){
                setIsAllowed(true)
            } else {
                setIsAllowed(false)
            }
                
            setLoading(false);
        }

        verifyAccess();
        
    }, [authLoading, user]);

    if (authLoading || loading) 
        return <SpinnerLoading />; // Muestra un spinner mientras carga
    

    // Si el usuario es administrador, dejamos que acceda a las rutas protegidas
    return isAllowed ? <Outlet /> : <Navigate to={router.login} replace />;
}

