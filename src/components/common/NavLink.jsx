import { Link } from "react-router-dom";

export const NavLink = ({ to, label, className }) => (
    <Link to={to} className={`text-gray-600 hover:text-purple-700 px-3 py-2 ${className || ""}`}>
    {label}
    </Link>
);