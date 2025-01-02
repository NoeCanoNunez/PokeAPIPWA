import React from 'react';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
    return (
        <main className="w-full h-full min-h-[calc(100vh-6rem)] bg-gray-50">
            <Outlet />
        </main>
    );
};

export default Main;