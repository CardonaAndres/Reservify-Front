import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Logout, Message, ExpandMore } from '@mui/icons-material';
import { router } from '../../configs/config.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { AdminOptions } from './AdminOptions.jsx';

export const DropUserMenu = ({ userData }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();

    return (
        <div className="relative">
          {/* Dropdown Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 bg-white py-2 rounded-lg hover:bg-purple-50 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:ring-offset-2">

            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <AccountCircle className="h-5 w-5 text-purple-600" />
            </div>

            <div className="text-left hidden sm:block">      
              <div className="text-xs text-gray-500">{userData?.email}</div>
            </div>

            <ExpandMore className={`h-5 w-5 text-gray-500 transition-transform 
                duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
          </button>
    
          {/* Dropdown Menu */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}/>
    
              <div className="absolute right-0 mt-2 w-max rounded-lg bg-white shadow-lg 
                ring-1 ring-black ring-opacity-5 z-20 py-1 focus:outline-none">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100 max-w-[250px]">
                  <p className="text-sm font-medium text-gray-700">Conectado como:</p>
                  <p className="text-sm text-gray-500 truncate">{userData?.email}</p>
                </div>
    
                {/* Menu Items */}
                <div className="py-1">
                  {/* Profile Option */}
                  <Link to={router.profile} className="flex items-center px-4 py-2 text-sm 
                    text-gray-700 hover:bg-purple-50 transition-colors duration-150">
                     <AccountCircle className="h-4 w-4 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium">Mi Perfil</p>
                      <p className="text-xs text-gray-500">Gestiona tu información personal</p>
                    </div>
                  </Link>
                  {/* Admin Options */}
                  {(userData.role_ID == 1) && <AdminOptions />}
  
                  <Link to={router.myRequests} className='flex items-center px-4 py-2 
                    text-sm text-gray-700 hover:bg-purple-50 transition-colors duration-150'>
                    <Message className="h-4 w-4 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium">Contáctanos</p>
                      <p className="text-xs text-gray-500">Soporte y ayuda</p>
                    </div>                
                  </Link>
    
                  {/* Divider */}
                  <div className="h-px bg-gray-200 my-1" />

                  {/* Logout Option */}
                  <button onClick={() => logout()}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 
                    hover:bg-red-50 transition-colors duration-150">
                    <Logout className="h-4 w-4 mr-3" />
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
    );
};
