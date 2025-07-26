import { apiClient, apiUtils } from './client';
import { config } from './config';
import type { 
  ExcelGenerateResult, 
  ApiResponse 
} from './types';

/**
 * Export API
 */
export const exportAPI = {
  /**
   * Xuất dữ liệu chấm công theo tháng
   */
  exportAttendance: async (month: string): Promise<any> => {
    if (!month) {
      throw new Error('Thiếu tham số month (format: YYYY-MM)');
    }

    // Validate month format
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      throw new Error('Format tháng không hợp lệ. Sử dụng YYYY-MM');
    }

    const data = { month };

    try {
      const response = await apiClient.post<ApiResponse>(
        config.endpoints.export.export_attendance,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Tạo file Excel từ dữ liệu chấm công
   */
  generateExcel: async (data: any[], month: string): Promise<ExcelGenerateResult> => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Dữ liệu không hợp lệ hoặc rỗng');
    }

    if (!month) {
      throw new Error('Thiếu tham số month (format: YYYY-MM)');
    }

    // Validate month format
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      throw new Error('Format tháng không hợp lệ. Sử dụng YYYY-MM');
    }

    const requestData = { data, month };

    try {
      const response = await apiClient.post<ApiResponse<ExcelGenerateResult>>(
        config.endpoints.export.generate_excel,
        requestData
      );
      return response.data.data!;
    } catch (error: any) {
      throw new Error(apiUtils.handleError(error));
    }
  },

  /**
   * Tải file Excel đã được tạo
   */
  downloadExcelFile: async (filePath: string, filename?: string): Promise<void> => {
    try {
      // Tạo URL với query parameter
      const downloadUrl = `${config.apiBaseUrl}${config.endpoints.export.download_excel}?file=${encodeURIComponent(filePath)}`;

      const response = await apiClient.get(downloadUrl, {
        responseType: 'blob'
      });

      if (response.status !== 200) {
        throw new Error('Không thể tải file');
      }

      // Tạo blob từ response
      const blob = new Blob([response.data]);

      // Đặt tên file - đảm bảo luôn có giá trị
      let finalFilename: string;
      
      if (filename) {
        finalFilename = filename;
      } else {
        // Lấy tên file từ response header hoặc tạo tên mặc định
        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          finalFilename = filenameMatch ? filenameMatch[1] : `bao_cao_cham_cong_${new Date().getTime()}.xlsx`;
        } else {
          finalFilename = `bao_cao_cham_cong_${new Date().getTime()}.xlsx`;
        }
      }

      // Download file
      apiUtils.downloadFile(blob, finalFilename);
    } catch (error: any) {
      throw new Error(`Lỗi tải file: ${apiUtils.handleError(error)}`);
    }
  },

  /**
   * Tạo và tải Excel trong một bước (convenience method)
   */
  exportAndDownloadExcel: async (data: any[], month: string, filename?: string): Promise<ExcelGenerateResult> => {
    try {
      // Bước 1: Tạo file Excel
      const result = await exportAPI.generateExcel(data, month);

      if (!result.file) {
        throw new Error('Không nhận được đường dẫn file từ server');
      }

      // Bước 2: Tải file
      const defaultFilename = `bao_cao_cham_cong_${month.replace('-', '_')}.xlsx`;
      await exportAPI.downloadExcelFile(result.file, filename || defaultFilename);

      return result;
    } catch (error: any) {
      throw new Error(`Lỗi xuất Excel: ${apiUtils.handleError(error)}`);
    }
  }
};