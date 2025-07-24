import axios from 'axios';

// Cấu hình base URL cho API
const API_BASE_URL = 'https://edulive.nnq962.pro/api';

// Tạo axios instance với cấu hình mặc định
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 giây timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interface cho dữ liệu đăng nhập
export interface LoginRequest {
    username: string;
    password: string;
    remember?: boolean;
}

// Interface cho response từ API
export interface LoginResponse {
    status: string;
    message: string;
    data?: {
        session_expires: string;
        user: {
            user_id: string;
            username: string;
            name: string;
            role: string;
            avatar_file: string;
            created_at: string;
            updated_at: string;
            permissions: {
                [key: string]: boolean;
            };
        };
    };
}

// Service function để đăng nhập
export const loginService = async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {

        const response = await apiClient.post<LoginResponse>('/auth/login', {
            username: loginData.username,
            password: loginData.password,
            remember: loginData.remember || false,
        });

        return response.data;
    } catch (error) {
        // Xử lý lỗi từ API
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server trả về response với status code lỗi
                return {
                    status: 'error',
                    message: error.response.data?.message || 'Đăng nhập thất bại',
                };
            } else if (error.request) {
                // Request được gửi nhưng không nhận được response
                return {
                    status: 'error',
                    message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
                };
            }
        }

        // Lỗi khác
        return {
            status: 'error',
            message: 'Đã xảy ra lỗi không xác định.',
        };
    }
};

export default { loginService };