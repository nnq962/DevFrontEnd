import React, { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Select, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ElevatedCard from '../../components/common/elevated-card';

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'Đi làm' },
        { type: 'success', content: 'Nghỉ' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'Đi làm' },
        { type: 'success', content: 'Nghỉ' },
        { type: 'error', content: 'Nghỉ' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'Đúng giờ' },
        { type: 'success', content: 'Vắng buổi sáng' },
        { type: 'error', content: 'Vắng buổi chiều' },
        { type: 'error', content: 'Đi muộn' },
        { type: 'error', content: 'Nghỉ có lương' },
        { type: 'error', content: 'Nghỉ không lương' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  // Custom header render
  const headerRender: CalendarProps<Dayjs>['headerRender'] = ({ value, onChange }) => {
    const monthOptions = [];
    for (let i = 0; i < 12; i++) {
      monthOptions.push({
        label: dayjs().month(i).format('MMMM'),
        value: i,
      });
    }

    const handleMonthChange = (month: number) => {
      const newDate = value.clone().month(month);
      onChange(newDate);
      setCurrentDate(newDate);
    };

    const handleTodayClick = () => {
      const today = dayjs();
      onChange(today);
      setCurrentDate(today);
    };

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: '12px',
        padding: '0 0 16px 0'
      }}>
        <Select
          value={value.month()}
          onChange={handleMonthChange}
          options={monthOptions}
          style={{ width: 120 }}
        />
        <Button 
          type="primary"
          onClick={handleTodayClick}
          style={{ height: '32px' }}
        >
          Hôm nay
        </Button>
      </div>
    );
  };

  return (
    <ElevatedCard 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined style={{ color: '#1890ff' }} />
          <span>Lịch chấm công chi tiết</span>
        </div>
      }
      elevation="medium"
    >
      <Calendar 
        cellRender={cellRender} 
        headerRender={headerRender}
        value={currentDate}
        onChange={setCurrentDate}
      />
    </ElevatedCard>
  );
};

export default CalendarComponent;