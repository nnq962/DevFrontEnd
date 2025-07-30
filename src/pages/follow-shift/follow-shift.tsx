import React from 'react';
import CalendarComponent from './calendar';
import OverviewCard from './overview';
import ReportsTable from './reports-table';

const FollowShift: React.FC = () => {
  return (
    <div className="page-container">
      {/* Card thống kê tổng quan */}
      <OverviewCard />
      
      {/* Card lịch chấm công */}
        <CalendarComponent />

      {/* Bảng báo cáo */}
      <ReportsTable />
      
    </div>
  );
};

export default FollowShift;
