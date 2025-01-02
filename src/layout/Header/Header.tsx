import React from 'react';
import { FiMenu, FiShoppingCart, FiSearch, FiUser, FiX } from 'react-icons/fi';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const logo = '/vite.svg';

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-sky-600 z-50 shadow-sm">
      <div className="h-full mx-auto">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-8 ">
            <button 
              onClick={toggleSidebar} 
              className="text-white hover:text-blue-600 transition-colors duration-200"
              aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isSidebarOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
            <img src={logo} alt="Logo" className="h-10" />
            
            <nav className="flex items-center space-x-6">
              {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-white hover:text-black hover:uppercase text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-black"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-64 px-5 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
              <FiSearch className="absolute right-4 top-2.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            </div>

            <button className="relative text-white hover:text-black transition-colors duration-200">
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                0
              </span>
            </button>

            <button className="text-white hover:text-black transition-colors duration-200">
              <FiUser className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;