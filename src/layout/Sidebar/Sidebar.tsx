import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiImage, FiBook, FiGift, FiPackage, FiStar, FiTable } from 'react-icons/fi';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const menuItems = [
    { to: "/", icon: FiHome, text: "Inicio" },
    { to: "/dashboard/fotos", icon: FiImage, text: "Fotografías" },
    { to: "/dashboard/tablas", icon: FiTable, text: "Tablas" },
    { to: "/marcos", icon: FiPackage, text: "Marcos" },
    { to: "/albumes", icon: FiBook, text: "Álbumes" },
    { to: "/personalizados", icon: FiGift, text: "Personalizados" },
    { to: "/destacados", icon: FiStar, text: "Destacados" },
  ];

  return (
    <div 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-40 ${
        isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'
      } ${isHovered && !isSidebarOpen ? 'lg:w-64' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-col p-1.5 h-full overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 min-w-[1.25rem]" />
            {(isSidebarOpen || isHovered) && (
              <span className="ml-3 whitespace-nowrap overflow-hidden transition-all duration-300">
                {item.text}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;