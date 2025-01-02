import { useState } from "react";
import { Restaurant, Menu as MenuIcon, Close } from "@mui/icons-material";
import { router } from "../../configs/config.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { SpinnerLoading } from "../common/SpinnerLoading.jsx";
import { useNavLinks } from "../../hooks/useNavLinks.jsx";
import { NavLink } from "../common/NavLink.jsx";

export const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuth, loading } = useAuth()
    const navigationLinks = useNavLinks()

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    if (loading) return <SpinnerLoading />

    return (
      <div className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to={router.home} className="flex items-center">
              <Restaurant className="h-8 w-8 text-purple-700" />
              <h1 className="ml-2 text-2xl font-bold text-purple-700">Reservify</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label}  />
              ))}
               <Link to={router.login} className="bg-purple-600 text-white px-6 py-2 
                rounded-full hover:bg-purple-700 transition-colors">
                { isAuth ? 'Bienvenido' : 'Iniciar Sesión' }
              </Link>  
     
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-purple-700"
              aria-label="Toggle menu">
              {isMenuOpen ? <Close className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationLinks.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label} className="block"/>
              ))}
            <Link to={router.login} className="w-full bg-purple-600 text-white px-6 py-2 
                rounded-full hover:bg-purple-700 transition-colors">
                { isAuth ? 'Bienvenido' : 'Iniciar Sesión' }
            </Link>
            </div>
          </div>
        )}
      </div>
    );
  };
