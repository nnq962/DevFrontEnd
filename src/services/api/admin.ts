import { apiClient, apiUtils } from './client';
import { config } from './config';
import type { 
  ReportParams, 
  Report, 
  ApiResponse,
  PaginatedResponse
} from './types';

/**
 * Admin API
 */
export const adminAPI = {
  /**
   * Lấy số lượng báo cáo cần phê duyệt
   */
  getPendingReportsCount: async (date?: string, reportType: string = 'all'): Promise<any> => {
    const params: Record<string, string> = {};
    
    if (date) {
      params.date = date;
    }
    
    if (reportType && reportType !== 'all') {
      params.report_type = reportType;
    }

    const queryString = Object.keys(params).length > 0 
      ? `?${new URLSearchParams(params).toString()}` 
      : '';

    try {
      const response = await apiClient.get<ApiResponse>(
        `${config.endpoints.admin.get_pending_reports_count}${queryString}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Lấy danh sách báo cáo để phê duyệt (dành cho admin/super_admin)
   */
  getReports: async (params: ReportParams = {}): Promise<PaginatedResponse<Report>> => {
    // Làm sạch params trước khi tạo URLSearchParams
    const cleanParams = { ...params };
    Object.keys(cleanParams).forEach(key => {
      const value = cleanParams[key as keyof ReportParams];
      if (value === undefined || 
          value === null || 
          value === 'undefined' || 
          value === 'null' || 
          value === '') {
        delete cleanParams[key as keyof ReportParams];
      }
    });

    const queryString = Object.keys(cleanParams).length > 0 
      ? `?${new URLSearchParams(cleanParams as any).toString()}` 
      : '';

    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Report>>>(
        `${config.endpoints.admin.get_reports}${queryString}`
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Cập nhật trạng thái báo cáo (phê duyệt/từ chối)
   */
  updateReportStatus: async (
    reportId: string, 
    status: 'approved' | 'rejected', 
    adminNote: string = ''
  ): Promise<Report> => {
    if (!reportId) {
      throw new Error('Thiếu tham số report ID');
    }

    if (!['approved', 'rejected'].includes(status)) {
      throw new Error('Trạng thái không hợp lệ. Chỉ chấp nhận "approved" hoặc "rejected"');
    }

    const data = {
      status: status,
      admin_note: adminNote
    };

    try {
      const response = await apiClient.post<ApiResponse<Report>>(
        `${config.endpoints.admin.update_report_status}/${reportId}`,
        data
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  }
};