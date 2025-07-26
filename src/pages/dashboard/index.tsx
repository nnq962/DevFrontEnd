import React, { useState, useEffect } from 'react';
import { 
  MailOutlined, 
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  ExportOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button, Drawer, Avatar, Typography } from 'antd';

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Thông tin cơ bản',
    icon: <InfoCircleOutlined />,
  },
  {
    key: 'users',
    label: 'Theo dõi chấm công',
    icon: <UserOutlined />,
  },
  {
    key: 'messages',
    label: 'Phê duyệt',
    icon: <MailOutlined />,
  },
  {
    key: 'applications',
    label: 'Xuất dữ liệu',
    icon: <ExportOutlined />,
  },
  {
    key: 'reports',
    label: 'Quản lý người dùng',
    icon: <UsergroupAddOutlined />,
  },
  {
    key: 'settings',
    label: 'Cài đặt',
    icon: <SettingOutlined />,
  }
];

const Dashboard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('Đã click menu: ', e);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const sidebarContent = (
    <div style={{ paddingTop: isMobile ? '70px' : '0' }}>
      <Menu
        onClick={onClick}
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRight: 0,
          backgroundColor: 'transparent'
        }}
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
        theme="light"
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div 
          style={{ 
            width: 225, 
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            margin: '8px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header with title */}
          <div style={{ 
            padding: '16px', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ClockCircleOutlined style={{ 
              fontSize: '18px', 
              color: '#1890ff' 
            }} />
            <span style={{ 
              color: '#1890ff',
              fontWeight: 600,
              fontSize: '16px'
            }}>
              Hệ thống chấm công
            </span>
          </div>
          
          {/* Menu */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Menu
              onClick={onClick}
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRight: 0,
                backgroundColor: 'transparent'
              }}
              defaultSelectedKeys={['dashboard']}
              mode="inline"
              items={items}
              theme="light"
            />
          </div>

          {/* Bottom User Info & Logout */}
          <div style={{
            borderTop: '1px solid #f0f0f0',
            padding: '16px',
            backgroundColor: '#fafafa'
          }}>
            {/* User Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <Avatar 
                size={40} 
                style={{ 
                  backgroundColor: '#1890ff',
                  fontSize: '16px'
                }}
                icon={<UserOutlined />}
              />
              <div style={{ flex: 1 }}>
                <Text strong style={{ 
                  fontSize: '14px',
                  color: '#262626',
                  display: 'block'
                }}>
                  Nguyễn Văn A
                </Text>
                <Text style={{ 
                  fontSize: '12px',
                  color: '#8c8c8c'
                }}>
                  Admin
                </Text>
              </div>
            </div>
            
            {/* Logout Button */}
            <Button
              type="primary"
              loading={logoutLoading}
              onClick={() => {
                setLogoutLoading(true);
                // Simulate logout process
                setTimeout(() => {
                  console.log('Đăng xuất');
                  setLogoutLoading(false);
                }, 2000);
              }}
              iconPosition="end"
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                color: '#fff'
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(!drawerVisible)}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1001,
            borderRadius: '8px',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={210}
          styles={{
            body: { padding: 0 },
            header: { display: 'none' }
          }}
          closable={false}
        >
          {sidebarContent}
        </Drawer>
      )}
      
      {/* Content area */}
      <div style={{ 
        flex: 1, 
        padding: isMobile ? '74px 16px 16px 16px' : '16px 8px 8px 8px',
        backgroundColor: '#f0f2f5',
        overflow: 'auto'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
          minHeight: 'calc(100vh - 32px)'
        }}>
          <h1 style={{ 
            margin: '0 0 16px 0',
            color: '#262626',
            fontSize: '24px',
            fontWeight: 600
          }}>
            Dashboard Content
          </h1>
          <p style={{ 
            color: '#595959',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Chào mừng bạn đến với trang quản trị. Nội dung chính sẽ hiển thị ở đây với giao diện đẹp và responsive.
          </p>
          
          {/* Demo cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginTop: '24px'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                backgroundColor: '#fafafa',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>Card {i}</h4>
                <p style={{ margin: 0, color: '#8c8c8c' }}>Nội dung demo card {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;