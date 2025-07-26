import { apiClient, apiUtils } from './client';
import { config } from './config';
import type { 
  AttendanceParams, 
  AttendanceRecord, 
  ReportData, 
  ReportParams, 
  Report, 
  ApiResponse,
  PaginatedResponse
} from './types';

/**
 * Attendance API
 */
export const attendanceAPI = {
  /**
   * Lấy lịch sử chấm công của người dùng
   */
  getAttendance: async (params: AttendanceParams): Promise<AttendanceRecord[]> => {
    const queryParams = new URLSearchParams({
      user_id: params.user_id,
      start_date: params.start_date,
      end_date: params.end_date
    }).toString();

    try {
      const response = await apiClient.get<ApiResponse<AttendanceRecord[]>>(
        `${config.endpoints.attendance.get_attendance}?${queryParams}`
      );
      return response.data.data || [];
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Tạo báo cáo
   */
  createReport: async (userId: string, reportData: ReportData, files?: FileList): Promise<Report> => {
    // Loại bỏ user_id khỏi reportData nếu có (vì đã có trong URL)
    const { user_id, ...dataWithoutUserId } = reportData;

    try {
      // Nếu không có file, gửi JSON request
      if (!files || files.length === 0) {
        const response = await apiClient.post<ApiResponse<Report>>(
          `${config.endpoints.attendance.create_report}/${userId}`,
          dataWithoutUserId
        );
        return response.data.data!;
      }

      // Nếu có file, sử dụng FormData
      const formData = new FormData();

      // Thêm dữ liệu báo cáo vào FormData
      Object.keys(dataWithoutUserId).forEach(key => {
        formData.append(key, dataWithoutUserId[key]);
      });

      // Thêm các file vào FormData
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }

      const response = await apiClient.post<ApiResponse<Report>>(
        `${config.endpoints.attendance.create_report}/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Lấy danh sách báo cáo của người dùng
   */
  getUserReports: async (userId: string, params: ReportParams = {}): Promise<PaginatedResponse<Report>> => {
    if (!userId) {
      throw new Error('Thiếu tham số user_id');
    }

    // Làm sạch params trước khi tạo URLSearchParams
    const cleanParams = { ...params };
    Object.keys(cleanParams).forEach(key => {
      const value = cleanParams[key as keyof ReportParams];
      if (value === undefined || value === null || value === 'undefined' || value === 'null') {
        delete cleanParams[key as keyof ReportParams];
      }
    });

    const queryString = Object.keys(cleanParams).length > 0 
      ? `?${new URLSearchParams(cleanParams as any).toString()}` 
      : '';

    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Report>>>(
        `${config.endpoints.attendance.get_user_reports}/${userId}${queryString}`
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Lấy tóm tắt báo cáo chờ xử lý
   */
  getPendingReportsSummary: async (): Promise<any> => {
    try {
      const response = await apiClient.get<ApiResponse>(
        config.endpoints.attendance.get_pending_reports_summary
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * URL builders
   */
  getAttendancePhotoUrl: (userId: string, date: string, type: 'check_in' | 'check_out'): string => {
    // Chuyển đổi format ngày từ YYYY-MM-DD sang YYYY_MM_DD
    const formattedDate = date.replace(/-/g, '_');
    return `${config.apiBaseUrl}${config.endpoints.attendance.view_attendance_photo}/${userId}?date=${formattedDate}&type=${type}`;
  },

  getReportFileUrl: (userId: string, filename: string): string | null => {
    if (!userId) {
      return null;
    }
    return `${config.apiBaseUrl}${config.endpoints.attendance.download_report_file}/${userId}/${filename}`;
  },

  /**
   * Kiểm tra xem ảnh chấm công có tồn tại không
   */
  checkAttendancePhotoExists: async (userId: string, date: string, type: 'check_in' | 'check_out'): Promise<boolean> => {
    try {
      const url = attendanceAPI.getAttendancePhotoUrl(userId, date, type);
      
      // Sử dụng HEAD request để kiểm tra sự tồn tại của ảnh
      const response = await apiClient.head(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },

  /**
   * Tải ảnh chấm công về dưới dạng blob để hiển thị
   */
  getAttendancePhotoBlob: async (userId: string, date: string, type: 'check_in' | 'check_out'): Promise<Blob> => {
    try {
      if (!userId || !date) {
        throw new Error('User ID và date là bắt buộc');
      }

      const url = attendanceAPI.getAttendancePhotoUrl(userId, date, type);

      const response = await apiClient.get(url, {
        responseType: 'blob'
      });

      if (response.status !== 200) {
        throw new Error('Không thể tải ảnh');
      }

      return response.data;
    } catch (error: any) {
      throw new Error(`Lỗi tải ảnh: ${apiUtils.handleError(error)}`);
    }
  },

  /**
   * Download file báo cáo
   */
  downloadReportFile: async (userId: string, filename: string): Promise<void> => {
    try {
      const url = attendanceAPI.getReportFileUrl(userId, filename);
      if (!url) {
        throw new Error('URL không hợp lệ');
      }

      const response = await apiClient.get(url, {
        responseType: 'blob'
      });

      if (response.status !== 200) {
        throw new Error('Không thể tải file');
      }

      // Download file
      apiUtils.downloadFile(response.data, filename);
    } catch (error: any) {
      throw new Error(`Lỗi tải file: ${apiUtils.handleError(error)}`);
    }
  }
};

export default attendanceAPI;