import React, { useState } from 'react';
import {
    Card,
    Avatar,
    Button,
    Typography,
    Row,
    Col,
    Badge,
    Divider
} from 'antd';
import {
    UserOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    DownloadOutlined,
    TeamOutlined,
    SettingOutlined,
    MessageOutlined,
} from '@ant-design/icons';
// import { useCustomNotification } from '../../components/notification';


const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
    // Dữ liệu mẫu tĩnh
    const mockUserInfo = {
        user_id: 'EDULIVE29',
        name: 'Nguyễn Ngọc Quyết',
        role: 'super_admin',
        avatar_file: 'IMG_0101 (1).jpg'
    };

    // Thêm state cho trạng thái máy chấm công
    const [deviceStatus] = useState(true); // true: hoạt động, false: không hoạt động

    // Thêm state cho số lượng phê duyệt
    const pendingApprovals = 5;

    const menuItems = [
        {
            title: 'Theo dõi chấm công',
            description: 'Xem lịch sử và gửi yêu cầu các về chấm công',
            icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
        },
        {
            title: 'Phê duyệt',
            description: 'Phê duyệt lỗi chấm công và nghỉ phép',
            icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
            badge: pendingApprovals // Thêm badge cho card phê duyệt
        },
        {
            title: 'Xuất dữ liệu',
            description: 'Xuất bảng excel báo cáo chấm công',
            icon: <DownloadOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
        },
        {
            title: 'Quản lý người dùng',
            description: 'Quản lý tải khoản của người dùng',
            icon: <TeamOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
        },
        {
            title: 'Cài đặt',
            description: 'Tuỳ chỉnh thông tin cá nhân',
            icon: <SettingOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />
        },
        {
            title: 'Feedback',
            description: 'Góp ý cải thiện hệ thống',
            icon: <MessageOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />
        }
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            {/* Bỏ phần CSS animation bounce */}

            <div className="w-full max-w-7xl">
                <Row gutter={[24, 24]}>
                    {/* Card thông tin tổng quan */}
                    <Col xs={24} lg={8}>
                        <Card
                            title="Thông tin tổng quan"
                            className="h-full"
                            extra={
                                <Badge
                                    status="success"
                                    text="Hoạt động"
                                />
                            }
                        >
                            <div className="text-center mb-4">
                                <Avatar
                                    size={80}
                                    icon={<UserOutlined />}
                                    className="mb-3"
                                />
                                <div>
                                    <Title level={4} className="my-2">
                                        {mockUserInfo.name}
                                    </Title>
                                </div>
                            </div>

                            <Divider />

                            <div className="space-y-4">
                                {/* Vai trò */}
                                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        <Text className="text-gray-600 font-medium">Vai trò</Text>
                                    </div>
                                    <Text strong className="text-red-500">
                                        Super Admin
                                    </Text>
                                </div>

                                {/* Trạng thái máy chấm công */}
                                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-2 h-2 rounded-full mr-3 ${deviceStatus ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        ></div>
                                        <Text className="text-gray-600 font-medium">Trạng thái máy</Text>
                                    </div>
                                    <Text
                                        className={`font-semibold ${deviceStatus ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {deviceStatus ? 'Hoạt động' : 'Không hoạt động'}
                                    </Text>
                                </div>

                                {/* ID người dùng */}
                                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <Text className="text-gray-600 font-medium">ID người dùng</Text>
                                    </div>
                                    <Text
                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono font-semibold"
                                    >
                                        {mockUserInfo.user_id}
                                    </Text>
                                </div>
                            </div>

                            <Divider />

                            <Button
                                type="primary"
                                danger
                                block
                                size="large"
                                iconPosition="end"
                            >
                                Đăng xuất
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardPage;
