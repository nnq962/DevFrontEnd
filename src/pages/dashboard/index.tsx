import React from 'react';
import {
    Card,
    Avatar,
    Button,
    Typography,
    Row,
    Col,
    Badge,
    Space,
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
    WifiOutlined
} from '@ant-design/icons';
import { useCustomNotification } from '../../components/notification';


const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
    // Dữ liệu mẫu tĩnh
    const mockUserInfo = {
        user_id: 'EDULIVE29',
        username: 'nnq962',
        name: 'Nguyễn Ngọc Quyết',
        role: 'super_admin',
        avatar_file: 'IMG_0101 (1).jpg'
    };

    // Thêm state cho số lượng phê duyệt
    const pendingApprovals = 2132130; // Số lượng phê duyệt chờ xử lý

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
                                    <Text type="secondary">@{mockUserInfo.username}</Text>
                                </div>
                            </div>

                            <Divider />

                            <Space direction="vertical" className="w-full">
                                <div className="flex justify-between items-center">
                                    <Text>Vai trò:</Text>
                                    <Text strong style={{ color: '#ff4d4f' }}>
                                        Super Admin
                                    </Text>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Text>Trạng thái máy chấm công:</Text>
                                    <Space>
                                        <WifiOutlined className="text-green-500" />
                                        <Text className="text-green-500">
                                            Hoạt động
                                        </Text>
                                    </Space>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Text>ID người dùng:</Text>
                                    <Text code>{mockUserInfo.user_id}</Text>
                                </div>
                            </Space>

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

                    {/* 6 Card chức năng - Chiều cao bằng card lớn */}
                    <Col xs={24} lg={16}>
                        <div className="h-full">
                            <Row gutter={[16, 16]} className="h-full">
                                {menuItems.map((item, index) => (
                                    <Col xs={24} sm={12} key={index}>
                                        {/* Wrap Card bằng Badge.Ribbon nếu có badge */}
                                        {item.badge && item.badge > 0 ? (
                                            <Badge.Ribbon text={item.badge} color="red">
                                                <Card
                                                    hoverable
                                                    className="h-40 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg"
                                                    styles={{
                                                        body: {
                                                            padding: '20px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            height: '100%'
                                                        }
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                                        {item.icon}
                                                        <Title level={4} style={{ margin: '0 0 0 12px', flex: 1 }}>
                                                            {item.title}
                                                        </Title>
                                                    </div>
                                                    <Text type="secondary" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                                                        {item.description}
                                                    </Text>
                                                </Card>
                                            </Badge.Ribbon>
                                        ) : (
                                            <Card
                                                hoverable
                                                className="h-40 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg"
                                                styles={{
                                                    body: {
                                                        padding: '20px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        height: '100%'
                                                    }
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                                    {item.icon}
                                                    <Title level={4} style={{ margin: '0 0 0 12px', flex: 1 }}>
                                                        {item.title}
                                                    </Title>
                                                </div>
                                                <Text type="secondary" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                                                    {item.description}
                                                </Text>
                                            </Card>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardPage;