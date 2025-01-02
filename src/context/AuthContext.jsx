import { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest, verifySession, 
    registerRequest, logoutRequest, updatePasswordRequest } from '../API/auth.js';
import { successAlert, errorAlert } from '../components/common/Alerts.jsx';
import Cookie from 'js-cookie'

// Crear el contexto
const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('AuthContext debe ser usado dentro de un AuthProvider');
    return context;
};

// Proveedor del AuthContext
export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const login = async (email, password) => {
        try {

            setLoading(true);
            const res = await loginRequest({ email, password });

            if (!res.status) throw new Error(res.message || 'Hubo un error desconocido');

            setUser(res.data.user);
            setIsAuth(true); Cookie.set('isAuth', true);
            await successAlert({ message: res.data.message});
            
        } catch (err) {
            await errorAlert({ message: err.message });
            return false
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try{
            setLoading(true);
            const res = await registerRequest(userData);

            if(!res.status)
                throw new Error(res.message)

            await successAlert({message : res.data.message});
            Cookie.set('isAuth', true)
            setIsAuth(true);
            setUser(res.data.user);

        } catch(err) {
            setIsAuth(false);
            setUser({});
            await errorAlert({message : err.message});
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            const res = await logoutRequest();

            if(!res.status)
                throw new Error(res.message)

            Cookie.remove('isAuth', { path: '/' })
            setIsAuth(false);
            setUser({})
            await successAlert({ message : res.message })

        } catch (err) {
            await errorAlert({ message : err.message })
        } finally {
            setLoading(false)
        }
    };

    const updatePassword = async (email, new_password) => {
        try {
            setLoading(true)
            const res = await updatePasswordRequest({ email, new_password })

            if(!res.status)
                throw new Error(res.message)

            await successAlert({ message : res.data.message })

            return res.status
            
        } catch (err) {
            await errorAlert({ message : err.message })
        } finally {
            setLoading(false)
        }
    }

    // Este useEffect verifica si el usuario está autenticado al cargar la página
    useEffect(() => {
        let isMounted = true; // Evitar actualizaciones de estado si el componente se desmonta

        const verify_user = async () => {
            try {
                setLoading(true);
                const authStatus = Cookie.get("isAuth");  // Leer la cookie "isAuth"

                if (isMounted) {
                    if (authStatus) {
                        
                        const res = await verifySession();  // Verifica el token con el backend

                        if (!res.status){
                            Cookie.remove('isAuth', { path: '/' });
                            throw new Error(res?.message || 'Vuelve a iniciar sesión, por favor');
                        } 
                                   
                        setUser(res.data.user);
                        setIsAuth(true);

                    } else {
                        Cookie.remove('isAuth', { path: '/' });
                        setIsAuth(false);
                        setUser({});  
                    }
                }

            } catch (err) {
                if (isMounted) {     
                    Cookie.remove('isAuth', { path: '/' });          
                    setIsAuth(false);
                    setUser({});  
                }
            } finally {
                setLoading(false)
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        verify_user();

        return () => {
            isMounted = false;  // Limpiar cuando el componente se desmonte
        };
     
    }, []);  
    
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                user,
                login,
                register,
                logout,
                updatePassword,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
