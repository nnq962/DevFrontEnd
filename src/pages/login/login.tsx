import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Typography } from 'antd';
import { useCustomNotification } from '../../components/common/notification';
import { loginService } from '../../services/login';
import type { LoginRequest } from '../../services/login';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const { showNotification, contextHolder } = useCustomNotification();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // Thêm state mới

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);

    try {
      const response = await loginService(values);

      if (response.status === 'success') {
        // Đăng nhập thành công
        setLoading(false); // Tắt loading spinner
        setRedirecting(true); // Bật trạng thái redirecting
        
        showNotification({
          type: 'success',
          message: 'Đăng nhập thành công',
          description: `Chào mừng ${response.data?.user.name} đã quay trở lại`,
          duration: 3,
          placement: 'topRight'
        });

        // Lưu thông tin user giống như login.js
        if (response.data?.user) {
          const user = response.data.user;
          const userInfo = {
            user_id: user.user_id,
            username: user.username,
            name: user.name || user.username,
            role: user.role,
            avatar_file: user.avatar_file,
            permissions: user.permissions || {}
          };

          localStorage.setItem('user_info', JSON.stringify(userInfo));

          // Lưu thêm session expires nếu cần
          localStorage.setItem('session_expires', response.data.session_expires);
        }

        // Redirect đến basic-info sau 2 giây
        setTimeout(() => {
          window.location.href = '/basic-info';
        }, 2000);

      } else {
        // Đăng nhập thất bại
        showNotification({
          type: 'error',
          message: 'Đăng nhập thất bại',
          description: response.message || 'Tên đăng nhập hoặc mật khẩu không chính xác',
          duration: 4,
          placement: 'topRight'
        });
        setLoading(false); // Chỉ tắt loading khi thất bại
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification({
        type: 'error',
        message: 'Lỗi hệ thống',
        description: 'Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau.',
        duration: 4,
        placement: 'topRight'
      });
      setLoading(false); // Chỉ tắt loading khi có lỗi
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotification({
      type: 'info',
      message: 'Tính năng này chưa được update',
      description: 'Vui lòng liên hệ telegram @quyetnguyenngoc để được hỗ trợ',
      duration: 3,
      placement: 'topRight'
    });
  };

  // Tính toán trạng thái disabled cho form
  const isFormDisabled = loading || redirecting;

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card
          className="w-full max-w-sm shadow-lg"
          style={{ borderRadius: '12px' }}
        >
          <div className="text-center mb-6">
            <Title level={2} className="mb-2">Hệ thống chấm công</Title>
            <p className="text-gray-600">Chúc bạn một ngày làm việc vui vẻ!</p>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Vui lòng nhập tài khoản!' },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();

                    if (value.length < 3) {
                      return Promise.reject(new Error('Tài khoản phải có ít nhất 3 ký tự và chỉ được chứa chữ hoặc số!'));
                    }

                    if (!/^[a-zA-Z0-9]+$/.test(value)) {
                      return Promise.reject(new Error('Tài khoản phải có ít nhất 3 ký tự và chỉ được chứa chữ hoặc số!'));
                    }

                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Nhập tên đăng nhập"
                className="rounded-lg"
                disabled={isFormDisabled}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Nhập mật khẩu"
                className="rounded-lg"
                disabled={isFormDisabled}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox disabled={isFormDisabled}>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a 
                  href="#forgot" 
                  onClick={isFormDisabled ? undefined : handleForgotPassword}
                  style={{ 
                    pointerEvents: isFormDisabled ? 'none' : 'auto',
                    opacity: isFormDisabled ? 0.5 : 1 
                  }}
                >
                  Quên mật khẩu
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading || redirecting}
                className="w-full h-12 text-lg font-medium rounded-lg"
                style={{ backgroundColor: '#1677ff' }}
                iconPosition='end'
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>


          <div className="text-center mt-4">
            <span className="text-gray-600">Developed by </span>
            <a href="https://github.com/nnq962" target="_blank">
              nnq962
            </a>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;