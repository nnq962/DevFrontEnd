import { apiClient, apiUtils } from './client';
import { config } from './config';
import type { LoginCredentials, LoginResponse, ApiResponse } from './types';

/**
 * Authentication API
 */
export const authAPI = {
  /**
   * Đăng nhập
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        config.endpoints.auth.login,
        credentials
      );
      return response.data;
    } catch (error: any) {
      // Xử lý đặc biệt cho lỗi đăng nhập
      if (error.response?.status === 401) {
        return {
          status: 'error',
          message: error.response.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng',
          error: 'invalid_credentials'
        };
      }
      
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Đăng xuất
   */
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        config.endpoints.auth.logout
      );
      
      // Xóa token và user info khỏi localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      
      return response.data;
    } catch (error: any) {
      // Vẫn xóa token ngay cả khi API call failed
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Kiểm tra trạng thái đăng nhập
   */
  checkAuthStatus: (): boolean => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user_info');
    return !!(token && userInfo);
  },

  /**
   * Lấy thông tin user từ localStorage
   */
  getCurrentUser: () => {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  /**
   * Lấy token từ localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Lưu thông tin đăng nhập
   */
  saveAuthData: (token: string, userInfo: any): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  },

  /**
   * Xóa thông tin đăng nhập
   */
  clearAuthData: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');
  }
};