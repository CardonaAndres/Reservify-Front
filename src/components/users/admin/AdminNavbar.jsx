import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext'
import { Settings, LogOut, ChevronDown, User} from 'lucide-react';
import { router } from '../../../configs/config.js';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { logout } = useAuth()

    return (
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <span className="ml-2 text-xl font-bold text-purple-700">Admin - Reservify</span>
                </div>
              </div>

    
              {/* Right side items */}
              <div className="flex items-center space-x-4">
    
                {/* Profile Dropdown */}
                <div className="relative">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
                    <ChevronDown className="hidden md:block h-4 w-4 text-gray-400" />
                  </button>
    
                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link to={router.adminOptions} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                          <User className="h-4 w-4 mr-3" />
                          Opciones
                        </Link>
                        <button onClick={async () => await logout()} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                            <LogOut className="h-4 w-4 mr-3" />
                            Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
    );
}
