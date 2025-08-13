import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FaHome, FaPalette, FaUsers, FaExchangeAlt, FaCog } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const NavLink = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <RouterNavLink
      className={`flex px-4 gap-4 items-center hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 p-2 rounded-md ${
        isActive ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500" : ""
      }`}
      to={to}
    >
      {icon}
      {children}
    </RouterNavLink>
  );
};

const navigationItems = [
  {
    to: "/",
    icon: <FaHome />,
    label: "Dashboard"
  },
  {
    to: "/card-design",
    icon: <FaPalette />,
    label: "Card Design"
  },
  {
    to: "/customers",
    icon: <FaUsers />,
    label: "Customers"
  },
  {
    to: "/transactions",
    icon: <FaExchangeAlt />,
    label: "Transactions"
  },
  {
    to: "/settings",
    icon: <FaCog />,
    label: "Settings"
  }
];

function Sidebar() {
  return (
    <div className="w-64 min-h-screen border-r-2 border-gray-200 bg-white p-5 ">
      <div className="flex flex-col gap-2">
        {navigationItems.map((item, index) => (
          <NavLink key={index} to={item.to} icon={item.icon}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
