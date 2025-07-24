import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Users from './pages/Users';

// Temporary placeholder components
const Profile = () => <div>Profile Page</div>;
const Settings = () => <div>Settings Page</div>;
const Users = () => <div>Users Page</div>;

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;