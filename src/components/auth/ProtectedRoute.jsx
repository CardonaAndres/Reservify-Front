import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { SpinnerLoading } from "../common/SpinnerLoading";
import { router } from "../../configs/config.js";
import Cookie from 'js-cookie'

export const ProtectedRoute = () => {
  const { loading } = useAuth(); 
  
  const authStatus = Cookie.get("isAuth");

  if (loading) 
      return <SpinnerLoading message="Estamos verificando el estado de autenticación" />;

  if (!authStatus) 
    return <Navigate to={router.login} />;
  
  // Si el usuario está autenticado, dejamos que acceda a las rutas protegidas
  return <Outlet />;
};
