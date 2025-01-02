import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './layout/dashboard/Dashboard';
import { ProcesTables } from './pages/PricesTables/ProcesTables';

const App: React.FC = () => {

  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route 
        path="/dashboard" 
        element={ <Dashboard />}
      >
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="tablas" element={<ProcesTables />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes> 
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;