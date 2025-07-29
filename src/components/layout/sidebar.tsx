import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  ExportOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button, Drawer, Avatar, Typography, Badge } from 'antd';

const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
  isMobile: boolean;
}

const baseItems: MenuItem[] = [
  {
    key: '/basic-info',
    label: 'Thông tin cơ bản',
    icon: <InfoCircleOutlined />,
  },
  {
    key: '/follow-shift',
    label: 'Theo dõi chấm công',
    icon: <UserOutlined />,
  },
  {
    key: '/approval',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: '4px' }}>
        <span>Phê duyệt</span>
        <Badge 
          count={33} 
          style={{ backgroundColor: '#ff4d4f', color: '#fff', marginRight: '2px' }}
        />
      </div>
    ),
    icon: <CheckCircleOutlined />,
  },
  {
    key: '/data-export',
    label: 'Xuất dữ liệu',
    icon: <ExportOutlined />,
  },
  {
    key: '/user-management',
    label: 'Quản lý người dùng',
    icon: <UsergroupAddOutlined />,
  },
  {
    key: '/settings',
    label: 'Cài đặt',
    icon: <SettingOutlined />,
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Create different items for desktop and mobile
  const items = isMobile 
    ? [{ type: 'divider' as const }, ...baseItems]
    : baseItems;

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('Navigating to: ', e.key);
    navigate(e.key);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    // Clear user data
    localStorage.removeItem('user_info');
    localStorage.removeItem('session_expires');
    
    setTimeout(() => {
      console.log('Đăng xuất');
      setLogoutLoading(false);
      navigate('/login');
    }, 1000);
  };

  const sidebarContent = (
    <div style={{ 
      paddingTop: isMobile ? '70px' : '0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Menu
          onClick={onClick}
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRight: 0,
            backgroundColor: 'transparent'
          }}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          theme="light"
        />
      </div>

      {/* Bottom User Info & Logout for Mobile */}
      {isMobile && (
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
            onClick={handleLogout}
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
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div 
          style={{ 
            width: 230, 
            backgroundColor: '#fff',
            borderRight: '1px solid #f0f0f0',
            height: '100vh',
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
              selectedKeys={[location.pathname]}
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
              onClick={handleLogout}
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
    </>
  );
};

export default Sidebar;
