import React from 'react';
import CalendarComponent from './calendar';
import OverviewCard from './overview';

const FollowShift: React.FC = () => {
  return (
    <div className="follow-shift-page">
      {/* Card thống kê tổng quan */}
      <OverviewCard />
      
      {/* Card lịch chấm công */}
        <CalendarComponent />
      
    </div>
  );
};

export default FollowShift;
