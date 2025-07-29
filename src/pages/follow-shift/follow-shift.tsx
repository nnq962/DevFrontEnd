import React from 'react';
import { Card } from 'antd';
import CalendarComponent from './calendar';

const FollowShift: React.FC = () => {
  return (
    <div className="follow-shift-page">
      <Card title="Lịch chấm công chi tiết" bordered={false}>
        <CalendarComponent />
      </Card>
    </div>
  );
};

export default FollowShift;
