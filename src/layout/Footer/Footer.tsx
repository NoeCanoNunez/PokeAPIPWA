import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-8 bg-black bg-opacity-70 backdrop-blur-lg z-40">
      <div className="container mx-auto h-full px-4 flex justify-between items-center text-white text-[8px] sm:text-xs">
        {/* Sección izquierda: Información de derechos reservados */}
        <div className="flex items-center space-x-4">
          <span>© 2024 WOLPIC</span>
          <span>|</span>
          <span>Español</span>
        </div>

        {/* Sección central: Enlaces */}
        <div className="flex items-center space-x-4">
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contacto</a>
          <a href="#topics" className="hover:text-gray-300 transition-colors">Documentación</a>
          <a href="#print" className="hidden md:block hover:text-gray-300 transition-colors">Nuestra Web</a>
        </div>

        {/* Sección derecha: Enlace adicional */}
        <div className=" hidden md:flex items-center space-x-4">
          <a href="https://wolpic.com/" className="hover:text-gray-300 transition-colors">
            https://wolpic.com/
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
