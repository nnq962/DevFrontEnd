import { apiClient, apiUtils } from './client';
import { config } from './config';
import type { 
  User, 
  UserData, 
  ApiResponse, 
  PhotoUploadResult, 
  MultiplePhotoUploadResult,
  ChangePasswordData,
  FeedbackData
} from './types';

/**
 * User Management API
 */
export const userAPI = {
  /**
   * Lấy danh sách người dùng
   */
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>(
        config.endpoints.users.get_users
      );
      return response.data.data || [];
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Lấy thông tin người dùng theo ID
   */
  getUser: async (userId: string): Promise<User> => {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        `${config.endpoints.users.get_user}/${userId}`
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Thêm người dùng mới
   */
  addUser: async (userData: UserData): Promise<User> => {
    // Validation
    const requiredFields = ['name', 'room_id', 'role'];
    const missingFields = requiredFields.filter(field => !userData[field as keyof UserData]);

    if (missingFields.length > 0) {
      throw new Error(`Thiếu các trường bắt buộc: ${missingFields.join(', ')}`);
    }

    const validRoles = ['user', 'admin', 'super_admin'];
    if (userData.role && !validRoles.includes(userData.role)) {
      throw new Error('Vai trò không hợp lệ. Chỉ chấp nhận: user, admin, super_admin');
    }

    try {
      const response = await apiClient.post<ApiResponse<User>>(
        config.endpoints.users.add_user,
        userData
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Cập nhật thông tin người dùng
   */
  updateUser: async (userId: string, userData: UserData): Promise<User> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    if (!userData || typeof userData !== 'object' || Object.keys(userData).length === 0) {
      throw new Error('Dữ liệu cập nhật không được để trống');
    }

    // Validate allowed fields
    const allowedFields = ['name', 'room_id', 'avatar_file', 'active', 'role', 'telegram_id', 'email'];
    const invalidFields = Object.keys(userData).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`Các trường không được phép cập nhật: ${invalidFields.join(', ')}`);
    }

    // Validate role if provided
    if (userData.role) {
      const validRoles = ['user', 'admin', 'super_admin'];
      if (!validRoles.includes(userData.role)) {
        throw new Error('Vai trò không hợp lệ. Chỉ chấp nhận: user, admin, super_admin');
      }
    }

    // Validate email format if provided
    if (userData.email && userData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Định dạng email không hợp lệ');
      }
    }

    // Validate active field if provided
    if (userData.active !== undefined && typeof userData.active !== 'boolean') {
      throw new Error('Trường active phải là boolean (true/false)');
    }

    // Clean data - remove empty strings and convert to appropriate types
    const cleanedData: Record<string, any> = {};
    Object.keys(userData).forEach(key => {
      const value = userData[key as keyof UserData];
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'active') {
          cleanedData[key] = Boolean(value);
        } else if (typeof value === 'string') {
          cleanedData[key] = value.trim();
        } else {
          cleanedData[key] = value;
        }
      }
    });

    try {
      const response = await apiClient.put<ApiResponse<User>>(
        `${config.endpoints.users.update_user}/${userId}`,
        cleanedData
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Xóa người dùng
   */
  deleteUser: async (userId: string): Promise<ApiResponse> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    try {
      const response = await apiClient.delete<ApiResponse>(
        `${config.endpoints.users.delete_user}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Đổi mật khẩu
   */
  changePassword: async (passwordData: ChangePasswordData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        config.endpoints.users.change_password,
        passwordData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Gửi feedback
   */
  submitFeedback: async (feedbackData: FeedbackData | FormData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        config.endpoints.users.submit_feedback,
        feedbackData,
        {
          headers: feedbackData instanceof FormData ? {
            'Content-Type': 'multipart/form-data'
          } : undefined
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Lấy danh sách ảnh của người dùng
   */
  getUserPhotos: async (userId: string, type: 'face' | 'avatar'): Promise<any> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    if (!type || !['face', 'avatar'].includes(type)) {
      throw new Error('Type phải là "face" hoặc "avatar"');
    }

    try {
      const response = await apiClient.get<ApiResponse>(
        `${config.endpoints.users.get_photos}/${userId}?type=${type}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Upload ảnh cho người dùng
   */
  uploadPhoto: async (userId: string, photoFile: File, type: 'face' | 'avatar'): Promise<PhotoUploadResult> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    if (!photoFile || !(photoFile instanceof File)) {
      throw new Error('Photo file là bắt buộc và phải là File object');
    }

    if (!type || !['face', 'avatar'].includes(type)) {
      throw new Error('Type phải là "face" hoặc "avatar"');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(photoFile.type)) {
      throw new Error('Chỉ chấp nhận file JPG, JPEG, PNG, HEIC, HEIF');
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (photoFile.size > maxSize) {
      throw new Error('File không được vượt quá 10MB');
    }

    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('type', type);

    try {
      const response = await apiClient.post<PhotoUploadResult>(
        `${config.endpoints.users.upload_photo}/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Upload nhiều ảnh khuôn mặt
   */
  uploadMultipleFacePhotos: async (userId: string, photoFiles: FileList | File[]): Promise<MultiplePhotoUploadResult> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    if (!photoFiles || photoFiles.length === 0) {
      throw new Error('Danh sách ảnh không được rỗng');
    }

    const results: any[] = [];
    const errors: any[] = [];

    // Upload từng ảnh một cách tuần tự để tránh quá tải server
    for (let i = 0; i < photoFiles.length; i++) {
      const file = photoFiles[i];
      try {
        const result = await userAPI.uploadPhoto(userId, file, 'face');
        results.push({
          file: file.name,
          success: true,
          data: result
        });
      } catch (error: any) {
        errors.push({
          file: file.name,
          success: false,
          error: error.message
        });
      }
    }

    return {
      results,
      errors,
      total: photoFiles.length,
      successful: results.length,
      failed: errors.length
    };
  },

  /**
   * Xóa ảnh của người dùng
   */
  deletePhoto: async (userId: string, filename: string, type: 'face' | 'avatar'): Promise<ApiResponse> => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID là bắt buộc và phải là string');
    }

    if (!filename || typeof filename !== 'string') {
      throw new Error('Filename là bắt buộc và phải là string');
    }

    if (!type || !['face', 'avatar'].includes(type)) {
      throw new Error('Type phải là "face" hoặc "avatar"');
    }

    const data = {
      file_name: filename,
      type: type
    };

    try {
      const response = await apiClient.delete<ApiResponse>(
        `${config.endpoints.users.delete_photo}/${userId}`,
        { data }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Convenience methods
   */
  uploadAvatar: async (userId: string, photoFile: File): Promise<PhotoUploadResult> => {
    return userAPI.uploadPhoto(userId, photoFile, 'avatar');
  },

  uploadFacePhoto: async (userId: string, photoFile: File): Promise<PhotoUploadResult> => {
    return userAPI.uploadPhoto(userId, photoFile, 'face');
  },

  /**
   * URL builders
   */
  getFacePhotoUrl: (userId: string, filename: string): string | null => {
    if (!userId || !filename) {
      return null;
    }
    return `${config.apiBaseUrl}${config.endpoints.users.view_face_photo}/${userId}/${filename}`;
  },

  getAvatarUrl: (userId: string): string => {
    return `${config.apiBaseUrl}${config.endpoints.users.view_avatar}/${userId}`;
  }
};

export default userAPI;