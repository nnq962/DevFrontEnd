import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Sidebar isMobile={isMobile} />
      
      {/* Content area */}
      <div style={{ 
        flex: 1, 
        padding: '0',
        backgroundColor: '#f0f2f5',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          backgroundColor: '#fff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Scrollable content area */}
          <div style={{
            flex: 1,
            padding: '10px',
            overflow: 'auto',
            height: '100%'
          }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
