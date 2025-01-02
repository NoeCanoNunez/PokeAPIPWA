import React, {  } from 'react';
import { Outlet } from 'react-router-dom';
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';
// import Footer from '../Footer/Footer';

const Dashboard: React.FC = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className="flex flex-col min-h-screen">
        <Outlet />
      {/* <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> */}
      {/* <div className="flex flex-1 pt-16">
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full
          ${isSidebarOpen ? 'ml-64' : 'ml-0 lg:ml-16'}
          pb-14`}
        >
          <div className="w-full h-full">
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;