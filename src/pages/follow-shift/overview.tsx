import React from 'react';
import { List } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ElevatedCard from '../../components/common/elevated-card';

const OverviewCard: React.FC = () => {
  // Dữ liệu mẫu - bạn có thể thay thế bằng API call
  const attendanceData = [
    { title: 'Ngày làm việc', value: '22 ngày', color: '#1890ff' },
    { title: 'Đã điểm danh', value: '20 ngày', color: '#13c2c2' },
    { title: 'Đúng giờ', value: '15 lần', color: '#52c41a' },
    { title: 'Đi muộn (8:10-8:30)', value: '3 lần', color: '#fa8c16' },
    { title: 'Đi muộn (sau 8:30)', value: '2 lần', color: '#ff4d4f' },
    { title: 'Về sớm', value: '1 lần', color: '#fa8c16' },
    { title: 'Vắng buổi sáng', value: '1 lần', color: '#ff4d4f' },
    { title: 'Vắng buổi chiều', value: '1 lần', color: '#ff4d4f' },
    { title: 'Nghỉ', value: '2 ngày', color: '#722ed1' },
    { title: 'Tiền phạt', value: '1.000.000 VNĐ', color: '#ff4d4f' },
  ];

  return (
    <ElevatedCard 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined style={{ color: '#1890ff' }} />
          <span>Thống kê chấm công tháng này</span>
        </div>
      }
      elevation="medium"
    >
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={attendanceData}
        renderItem={(item) => (
          <List.Item>
            <ElevatedCard 
              title={item.title}
              size="small"
              elevation="low"
              style={{ 
                textAlign: 'center',
                height: '120px',
              }}
            >
              <div style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: item.color,
                marginTop: '8px'
              }}>
                {item.value}
              </div>
            </ElevatedCard>
          </List.Item>
        )}
      />
    </ElevatedCard>
  );
};

export default OverviewCard;
