import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { config } from './config';

/**
 * Axios client instance với cấu hình sẵn
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor - Tự động thêm token vào header
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - Xử lý lỗi 401 và redirect
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Xử lý lỗi 401 - Token hết hạn
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      
      // Chỉ redirect nếu không phải trang login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Utility functions for API calls
 */
export const apiUtils = {
  /**
   * Handle API errors and return user-friendly messages
   */
  handleError: (error: any): string => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return 'Có lỗi xảy ra, vui lòng thử lại sau';
  },

  /**
   * Download file from blob response
   */
  downloadFile: (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  /**
   * Create FormData from object
   */
  createFormData: (data: Record<string, any>): FormData => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    return formData;
  }
};