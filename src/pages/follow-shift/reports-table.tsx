import React from 'react';
import { Table, Tag } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ElevatedCard from '../../components/common/elevated-card';

interface ReportData {
  key: string;
  date: string;
  reportType: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  managerResponse: string;
  submitDate: string;
}

const ReportsTable: React.FC = () => {
  // Dữ liệu mẫu - bạn có thể thay thế bằng API call
  const reportData: ReportData[] = [
    {
      key: '1',
      date: '2025/01/15',
      reportType: 'Nghỉ phép',
      description: 'Xin nghỉ phép 1 ngày để đi khám bệnh định kỳ',
      status: 'approved',
      managerResponse: 'Đã duyệt. Chúc bạn sức khỏe tốt!',
      submitDate: '2025/01/10 09:30'
    },
    {
      key: '2',
      date: '2025/01/20',
      reportType: 'Đi muộn',
      description: 'Đi muộn 15 phút do kẹt xe trên đường Nguyễn Trãi',
      status: 'pending',
      managerResponse: '',
      submitDate: '2025/01/20 08:45'
    },
    {
      key: '3',
      date: '2025/01/18',
      reportType: 'Làm thêm giờ',
      description: 'Làm thêm 2 giờ để hoàn thành dự án ABC cho khách hàng',
      status: 'approved',
      managerResponse: 'Cảm ơn bạn đã cống hiến. Sẽ tính overtime cho bạn.',
      submitDate: '2025/01/18 18:30'
    },
    {
      key: '4',
      date: '2025/01/12',
      reportType: 'Nghỉ ốm',
      description: 'Nghỉ ốm do sốt cao, có giấy chứng nhận của bác sĩ',
      status: 'rejected',
      managerResponse: 'Cần bổ sung thêm giấy tờ từ bệnh viện.',
      submitDate: '2025/01/12 07:15'
    },
    {
      key: '5',
      date: '2025/01/25',
      reportType: 'Về sớm',
      description: 'Xin về sớm 1 tiếng để đón con ở trường do vợ bận công tác',
      status: 'pending',
      managerResponse: '',
      submitDate: '2025/01/25 14:20'
    },
    {
      key: '6',
      date: '2025/01/08',
      reportType: 'Công tác',
      description: 'Đi công tác tại chi nhánh Hồ Chí Minh trong 3 ngày',
      status: 'approved',
      managerResponse: 'Đã duyệt. Chúc công tác thuận lợi!',
      submitDate: '2025/01/05 16:45'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'pending':
        return 'Chờ duyệt';
      default:
        return 'Không xác định';
    }
  };

  const columns: ColumnsType<ReportData> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Loại báo cáo',
      dataIndex: 'reportType',
      key: 'reportType',
      width: 130,
      filters: [
        { text: 'Nghỉ phép', value: 'Nghỉ phép' },
        { text: 'Đi muộn', value: 'Đi muộn' },
        { text: 'Làm thêm giờ', value: 'Làm thêm giờ' },
        { text: 'Nghỉ ốm', value: 'Nghỉ ốm' },
        { text: 'Về sớm', value: 'Về sớm' },
        { text: 'Công tác', value: 'Công tác' },
      ],
      onFilter: (value, record) => record.reportType === value,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: 'Đã duyệt', value: 'approved' },
        { text: 'Từ chối', value: 'rejected' },
        { text: 'Chờ duyệt', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Phản hồi của quản lý',
      dataIndex: 'managerResponse',
      key: 'managerResponse',
      ellipsis: true,
      render: (text: string) => text || <span style={{ color: '#8c8c8c' }}>Chưa có phản hồi</span>,
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'submitDate',
      key: 'submitDate',
      width: 150,
      sorter: (a, b) => new Date(a.submitDate).getTime() - new Date(b.submitDate).getTime(),
    },
  ];

  return (
    <ElevatedCard 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          <span>Các báo cáo của bạn</span>
        </div>
      }
      elevation="medium"
    >
      <Table
        columns={columns}
        dataSource={reportData}
        pagination={{
          total: reportData.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} báo cáo`,
        }}
        scroll={{ x: 800 }}
        size="middle"
      />
    </ElevatedCard>
  );
};

export default ReportsTable;