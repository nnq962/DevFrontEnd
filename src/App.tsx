import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/login/login';
import Layout from './components/layout/layout';
import BasicInfoPage from './pages/basic-info/basic-infor';
import FollowShiftPage from './pages/follow-shift/follow-shift';

// Temporary placeholder components cho các trang khác
const ApprovalPage = () => (
  <div>
    <h1 style={{ margin: '0 0 16px 0', color: '#262626', fontSize: '24px', fontWeight: 600 }}>
      Phê duyệt
    </h1>
    <p style={{ color: '#595959', fontSize: '16px' }}>
      Trang phê duyệt đang được phát triển...
    </p>
  </div>
);

const DataExportPage = () => (
  <div>
    <h1 style={{ margin: '0 0 16px 0', color: '#262626', fontSize: '24px', fontWeight: 600 }}>
      Xuất dữ liệu
    </h1>
    <p style={{ color: '#595959', fontSize: '16px' }}>
      Trang xuất dữ liệu đang được phát triển...
    </p>
  </div>
);

const UserManagementPage = () => (
  <div>
    <h1 style={{ margin: '0 0 16px 0', color: '#262626', fontSize: '24px', fontWeight: 600 }}>
      Quản lý người dùng
    </h1>
    <p style={{ color: '#595959', fontSize: '16px' }}>
      Trang quản lý người dùng đang được phát triển...
    </p>
  </div>
);

const SettingsPage = () => (
  <div>
    <h1 style={{ margin: '0 0 16px 0', color: '#262626', fontSize: '24px', fontWeight: 600 }}>
      Cài đặt
    </h1>
    <p style={{ color: '#595959', fontSize: '16px' }}>
      Trang cài đặt đang được phát triển...
    </p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to basic-info */}
        <Route path="/" element={<Navigate to="/basic-info" replace />} />
        
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route path="basic-info" element={<BasicInfoPage />} />
          <Route path="follow-shift" element={<FollowShiftPage />} />
          <Route path="approval" element={<ApprovalPage />} />
          <Route path="data-export" element={<DataExportPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/basic-info" replace />} />
      </Routes>
    </Router>
  );
};

export default App;