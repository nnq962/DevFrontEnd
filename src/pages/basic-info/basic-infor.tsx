import React from 'react';

const BasicInfoPage: React.FC = () => {
  return (
    <>
      <h1 style={{ 
        margin: '0 0 16px 0',
        color: '#262626',
        fontSize: '24px',
        fontWeight: 600
      }}>
        Thông tin cơ bản
      </h1>
      <p style={{ 
        color: '#595959',
        fontSize: '16px',
        lineHeight: '1.6'
      }}>
        Chào mừng bạn đến với trang quản trị. Đây là trang thông tin cơ bản của hệ thống chấm công.
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
            <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>Thông tin {i}</h4>
            <p style={{ margin: 0, color: '#8c8c8c' }}>Nội dung thông tin cơ bản {i}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BasicInfoPage;