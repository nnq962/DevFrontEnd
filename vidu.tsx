import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Badge, Calendar, Tabs, Dropdown, Button, Space, DatePicker, Table, Tag } from 'antd';
import type { BadgeProps, CalendarProps, MenuProps, TabsProps, TableColumnsType } from 'antd';
import type { Dayjs } from 'dayjs';
import { createStyles } from 'antd-style';
import { 
  CalendarOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  CoffeeOutlined,
  DollarOutlined,
  FileTextOutlined,
  DownOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;

const useStyle = createStyles(({ css }) => {
  return {
    customTable: css`
      .ant-table {
        .ant-table-container {
          .ant-table-body,
          .ant-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
      
      /* Mobile responsive styles */
      @media (max-width: 768px) {
        .ant-table-thead > tr > th {
          font-size: 12px;
          padding: 8px 4px;
        }
        
        .ant-table-tbody > tr > td {
          font-size: 12px;
          padding: 8px 4px;
        }
        
        .ant-table-pagination {
          .ant-pagination-item {
            min-width: 28px;
            height: 28px;
            line-height: 26px;
            font-size: 12px;
          }
          
          .ant-pagination-prev,
          .ant-pagination-next {
            min-width: 28px;
            height: 28px;
            line-height: 26px;
          }
          
          .ant-pagination-options {
            .ant-select {
              font-size: 12px;
            }
          }
          
          .ant-pagination-total-text {
            font-size: 12px;
          }
        }
      }
    `,
  };
});

interface ReportDataType {
  key: React.Key;
  date: string;
  type: string;
  description: string;
  status: string;
  timeOff: string;
}

// Dữ liệu chấm công cho calendar
const getAttendanceData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = [];
  const date = value.date();
  
  // Dữ liệu mẫu cho các ngày khác nhau
  switch (date) {
    case 5:
      listData = [
        { type: 'error', content: 'Đi muộn sau 8:30' },
        { type: 'warning', content: 'Về sớm' },
      ];
      break;
    case 8:
      listData = [
        { type: 'success', content: 'Điểm danh đúng giờ' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'Đi muộn 8:10-8:30' },
        { type: 'success', content: 'Về đúng giờ' },
      ];
      break;
    case 12:
      listData = [
        { type: 'error', content: 'Vắng buổi sáng' },
      ];
      break;
    case 15:
      listData = [
        { type: 'success', content: 'Điểm danh đúng giờ' },
      ];
      break;
    case 18:
      listData = [
        { type: 'warning', content: 'Đi muộn 8:10-8:30' },
      ];
      break;
    case 22:
      listData = [
        { type: 'error', content: 'Vắng buổi chiều' },
      ];
      break;
    case 25:
      listData = [
        { type: 'processing', content: 'Nghỉ phép' },
      ];
      break;
    default:
      // Các ngày còn lại có thể có dữ liệu bình thường
      if (date < 28 && value.day() !== 0 && value.day() !== 6) { // Không phải chủ nhật và thứ 7
        listData = [
          { type: 'success', content: 'Điểm danh bình thường' },
        ];
      }
  }
  return listData || [];
};

const FollowShiftPage: React.FC = () => {
  const { styles } = useStyle();
  const [selectedReportType, setSelectedReportType] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Đang chờ xử lý');

  // Dữ liệu mẫu - bạn có thể thay thế bằng API call
  const attendanceData = {
    workingDays: 22,
    attended: 20,
    onTime: 15,
    late8to30: 3,
    lateAfter30: 2,
    earlyLeave: 1,
    morningAbsent: 1,
    afternoonAbsent: 1,
    dayOff: 2,
    fine: 50000
  };

  // Dữ liệu báo cáo mẫu
  const reportData: ReportDataType[] = [
    {
      key: '1',
      date: '2024-01-15',
      type: 'Ảnh không đúng',
      description: 'Ảnh bị mờ, không nhận diện được khuôn mặt',
      status: 'Đang chờ xử lý',
      timeOff: '08:15 - 08:30'
    },
    {
      key: '2',
      date: '2024-01-12',
      type: 'Lỗi máy',
      description: 'Máy chấm công không hoạt động, không thể điểm danh',
      status: 'Đã phê duyệt',
      timeOff: '08:00 - 08:45'
    },
    {
      key: '3',
      date: '2024-01-10',
      type: 'Nghỉ phép',
      description: 'Nghỉ phép cá nhân theo đơn xin phép',
      status: 'Đã phê duyệt',
      timeOff: 'Cả ngày'
    },
    {
      key: '4',
      date: '2024-01-08',
      type: 'Ảnh không đúng',
      description: 'Ảnh chụp không rõ mặt, ánh sáng kém',
      status: 'Đã từ chối',
      timeOff: '08:20 - 08:25'
    },
    {
      key: '5',
      date: '2024-01-05',
      type: 'Lỗi máy',
      description: 'Hệ thống mạng bị gián đoạn',
      status: 'Đang chờ xử lý',
      timeOff: '08:00 - 09:00'
    },
    {
      key: '6',
      date: '2024-01-03',
      type: 'Nghỉ phép',
      description: 'Nghỉ ốm có giấy bác sĩ',
      status: 'Đã phê duyệt',
      timeOff: 'Nửa ngày sáng'
    },
    {
      key: '7',
      date: '2024-01-02',
      type: 'Ảnh không đúng',
      description: 'Camera bị lỗi, không chụp được ảnh',
      status: 'Đang chờ xử lý',
      timeOff: '08:05 - 08:15'
    },
    {
      key: '8',
      date: '2024-01-01',
      type: 'Nghỉ phép',
      description: 'Nghỉ lễ Tết Dương lịch',
      status: 'Đã phê duyệt',
      timeOff: 'Cả ngày'
    },
    {
      key: '9',
      date: '2023-12-30',
      type: 'Lỗi máy',
      description: 'Mất điện đột ngột, máy chấm công tắt',
      status: 'Đã phê duyệt',
      timeOff: '08:30 - 09:15'
    },
    {
      key: '10',
      date: '2023-12-28',
      type: 'Ảnh không đúng',
      description: 'Đeo khẩu trang, không nhận diện được',
      status: 'Đã từ chối',
      timeOff: '08:10 - 08:20'
    }
  ];

  // Dropdown items cho loại báo cáo
  const reportTypeItems: MenuProps['items'] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'wrong-image', label: 'Ảnh không đúng' },
    { key: 'machine-error', label: 'Lỗi máy' },
    { key: 'leave', label: 'Nghỉ phép' }
  ];

  // Dropdown items cho trạng thái
  const statusItems: MenuProps['items'] = [
    { key: 'pending', label: 'Đang chờ xử lý' },
    { key: 'approved', label: 'Đã phê duyệt' },
    { key: 'rejected', label: 'Đã từ chối' }
  ];

  // Columns cho table báo cáo với responsive
  const reportColumns: TableColumnsType<ReportDataType> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Loại báo cáo',
      dataIndex: 'type',
      key: 'type',
      width: 140,
      responsive: ['sm', 'md', 'lg', 'xl'],
      render: (type: string) => {
        let color = 'blue';
        if (type === 'Ảnh không đúng') color = 'orange';
        if (type === 'Lỗi máy') color = 'red';
        if (type === 'Nghỉ phép') color = 'green';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      render: (status: string) => {
        let color = 'processing';
        if (status === 'Đã phê duyệt') color = 'success';
        if (status === 'Đã từ chối') color = 'error';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Thời gian nghỉ',
      dataIndex: 'timeOff',
      key: 'timeOff',
      width: 150,
      responsive: ['sm', 'md', 'lg', 'xl'],
    }
  ];

  // Tab items với pagination
  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: (
        <Table<ReportDataType>
          className={styles.customTable}
          columns={reportColumns}
          dataSource={reportData}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} mục`,
            pageSizeOptions: ['5', '10', '20', '50'],
            size: 'small'
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )
    },
    {
      key: 'wrong-image',
      label: 'Ảnh không đúng',
      children: (
        <Table<ReportDataType>
          className={styles.customTable}
          columns={reportColumns}
          dataSource={reportData.filter(item => item.type === 'Ảnh không đúng')}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} mục`,
            pageSizeOptions: ['5', '10', '20', '50'],
            size: 'small'
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )
    },
    {
      key: 'machine-error',
      label: 'Lỗi máy',
      children: (
        <Table<ReportDataType>
          className={styles.customTable}
          columns={reportColumns}
          dataSource={reportData.filter(item => item.type === 'Lỗi máy')}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} mục`,
            pageSizeOptions: ['5', '10', '20', '50'],
            size: 'small'
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )
    },
    {
      key: 'leave',
      label: 'Nghỉ phép',
      children: (
        <Table<ReportDataType>
          className={styles.customTable}
          columns={reportColumns}
          dataSource={reportData.filter(item => item.type === 'Nghỉ phép')}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} mục`,
            pageSizeOptions: ['5', '10', '20', '50'],
            size: 'small'
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )
    }
  ];

  const dateCellRender = (value: Dayjs) => {
    const listData = getAttendanceData(value);
    return (
      <ul className="events" style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        fontSize: '12px'
      }}>
        {listData.map((item, index) => (
          <li key={index} style={{ marginBottom: '2px' }}>
            <Badge 
              status={item.type as BadgeProps['status']} 
              text={item.content}
              style={{ fontSize: '11px' }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const handleReportTypeChange = (key: string) => {
    const item = reportTypeItems?.find(item => item?.key === key);
    setSelectedReportType((item as any)?.label as string || 'Tất cả');
  };

  const handleStatusChange = (key: string) => {
    const item = statusItems?.find(item => item?.key === key);
    setSelectedStatus((item as any)?.label as string || 'Đang chờ xử lý');
  };

  return (
    <>
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarOutlined style={{ color: '#1890ff' }} />
            <span>Thống kê chấm công tháng này</span>
          </div>
        }
        style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Ngày làm việc */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f'
              }}
            >
              <Statistic
                title="Ngày làm việc"
                value={attendanceData.workingDays}
                suffix="ngày"
                valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>

          {/* Đã điểm danh */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f'
              }}
            >
              <Statistic
                title="Đã điểm danh"
                value={attendanceData.attended}
                suffix="ngày"
                valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Đúng giờ */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#e6f7ff',
                border: '1px solid #91d5ff'
              }}
            >
              <Statistic
                title="Đúng giờ"
                value={attendanceData.onTime}
                suffix="lần"
                valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Đi muộn (8:10-8:30) */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff7e6',
                border: '1px solid #ffd591'
              }}
            >
              <Statistic
                title="Đi muộn (8:10-8:30)"
                value={attendanceData.late8to30}
                suffix="lần"
                valueStyle={{ color: '#fa8c16', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Đi muộn (sau 8:30) */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff2f0',
                border: '1px solid #ffb3b3'
              }}
            >
              <Statistic
                title="Đi muộn (sau 8:30)"
                value={attendanceData.lateAfter30}
                suffix="lần"
                valueStyle={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<CloseCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Về sớm */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff7e6',
                border: '1px solid #ffd591'
              }}
            >
              <Statistic
                title="Về sớm"
                value={attendanceData.earlyLeave}
                suffix="lần"
                valueStyle={{ color: '#fa8c16', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<HomeOutlined />}
              />
            </Card>
          </Col>

          {/* Vắng buổi sáng */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff2f0',
                border: '1px solid #ffb3b3'
              }}
            >
              <Statistic
                title="Vắng buổi sáng"
                value={attendanceData.morningAbsent}
                suffix="lần"
                valueStyle={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Vắng buổi chiều */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff2f0',
                border: '1px solid #ffb3b3'
              }}
            >
              <Statistic
                title="Vắng buổi chiều"
                value={attendanceData.afternoonAbsent}
                suffix="lần"
                valueStyle={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<CoffeeOutlined />}
              />
            </Card>
          </Col>

          {/* Nghỉ */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#f9f0ff',
                border: '1px solid #d3adf7'
              }}
            >
              <Statistic
                title="Nghỉ"
                value={attendanceData.dayOff}
                suffix="ngày"
                valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<CoffeeOutlined />}
              />
            </Card>
          </Col>

          {/* Tiền phạt */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card 
              size="small" 
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff2f0',
                border: '1px solid #ffb3b3'
              }}
            >
              <Statistic
                title="Tiền phạt"
                value={attendanceData.fine}
                suffix="VNĐ"
                valueStyle={{ color: '#ff4d4f', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<DollarOutlined />}
                formatter={(value) => `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Calendar Section */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarOutlined style={{ color: '#1890ff' }} />
            <span>Lịch chấm công chi tiết</span>
          </div>
        }
        style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Badge status="success" />
              <span style={{ fontSize: '12px' }}>Điểm danh bình thường</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Badge status="warning" />
              <span style={{ fontSize: '12px' }}>Đi muộn/Về sớm</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Badge status="error" />
              <span style={{ fontSize: '12px' }}>Vi phạm nghiêm trọng</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Badge status="processing" />
              <span style={{ fontSize: '12px' }}>Nghỉ phép</span>
            </div>
          </div>
        </div>
        <Calendar cellRender={cellRender} />
      </Card>

      {/* Reports Section */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <span>Các báo cáo của bạn</span>
          </div>
        }
        style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}
      >
        {/* Filter Controls */}
        <div style={{ marginBottom: '16px' }}>
          <Space wrap size="middle">
            <div>
              <span style={{ marginRight: '8px', fontWeight: 500 }}>Trạng thái:</span>
              <Dropdown
                menu={{ 
                  items: statusItems,
                  onClick: ({ key }) => handleStatusChange(key)
                }}
                trigger={['click']}
              >
                <Button>
                  <Space>
                    {selectedStatus}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            
            <div>
              <span style={{ marginRight: '8px', fontWeight: 500 }}>Khoảng thời gian:</span>
              <RangePicker 
                placeholder={['Từ ngày', 'Đến ngày']}
                style={{ width: 240 }}
              />
            </div>
          </Space>
        </div>

        {/* Tabs with Reports */}
        <Tabs
          type="card"
          items={tabItems}
          onChange={(key) => console.log('Tab changed:', key)}
        />
      </Card>
    </>
  );
};

export default FollowShiftPage;
