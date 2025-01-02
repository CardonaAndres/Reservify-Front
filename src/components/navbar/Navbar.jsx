import { useState } from "react";
import { Restaurant, Close, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { router } from "../../configs/config";
import { NavLink } from "../common/NavLink";
import { DropUserMenu } from "./DropUserMenu";
import { useNavLinks } from "../../hooks/useNavLinks";
import { useAuth } from "../../context/AuthContext";
import { SpinnerLoading } from "../common/SpinnerLoading";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const navigationLinks = useNavLinks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (loading) return <SpinnerLoading />;

  return (
    <div className="bg-white shadow-lg md:shadow-l w-full z-50 rounded-b-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Title */}
          <Link to={router.home} className="flex items-center space-x-3">
            <Restaurant className="h-8 w-8 text-purple-700 drop-shadow-xl" />
            <h1 className="ml-2 text-3xl font-extrabold text-purple-700 hover:text-purple-600 transition duration-300 ease-in-out transform hover:scale-105">
              Reservify
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                className="text-gray-700 hover:text-purple-500 hover:shadow-md hover:scale-105 transition-all duration-300"
              />
            ))}
            <DropUserMenu userData={user} />
          </div>

          <button onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-purple-700 transition duration-300 ease-in-out"
            aria-label="Toggle menu">
            {isMenuOpen ? (
              <Close className="h-6 w-6 text-purple-700" />
            ) : (
              <MenuIcon className="h-6 w-6 text-purple-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-16 bg-white shadow-2xl z-20 rounded-tl-lg rounded-tr-lg">
          <div className="px-4 py-3 space-y-4">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                className="block py-2 text-center text-lg text-gray-800 hover:bg-purple-100 rounded-md transition-all duration-300"
              />
            ))}
            <DropUserMenu userData={user} />
          </div>
        </div>
      )}
    </div>
  );
};
