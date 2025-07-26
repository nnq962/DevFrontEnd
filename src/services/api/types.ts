/**
 * API Types and Interfaces
 */

// Authentication Types
export interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    user: User;
    token?: string;
  };
  error?: string;
}

// User Types
export interface User {
  user_id: string;
  username: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  avatar_file?: string;
  permissions?: Record<string, any>;
  email?: string;
  telegram_id?: string;
  room_id?: string;
  active?: boolean;
}

export interface UserInfo {
  user_id: string;
  username: string;
  name: string;
  role: string;
  avatar_file?: string;
  permissions: Record<string, any>;
}

export interface UserData {
  name?: string;
  room_id?: string;
  role?: 'user' | 'admin' | 'super_admin';
  email?: string;
  telegram_id?: string;
  avatar_file?: string;
  active?: boolean;
}

// Attendance Types
export interface AttendanceParams {
  user_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
}

export interface AttendanceRecord {
  user_id: string;
  date: string;
  check_in_time?: string;
  check_out_time?: string;
  status: 'present' | 'absent' | 'late' | 'early_leave';
  notes?: string;
}

// Report Types
export interface ReportData {
  report_type: 'incorrect_photo' | 'machine_error' | 'leave_request' | 'other';
  description: string;
  date?: string;
  [key: string]: any;
}

export interface ReportParams {
  report_type?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'all';
  from_date?: string;
  to_date?: string;
  page?: number;
  limit?: number;
}

export interface Report {
  id: string;
  user_id: string;
  report_type: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  admin_note?: string;
  files?: string[];
}

// Photo Types
export interface PhotoUploadResult {
  success: boolean;
  message: string;
  file_url?: string;
}

export interface MultiplePhotoUploadResult {
  results: Array<{
    file: string;
    success: boolean;
    data?: any;
  }>;
  errors: Array<{
    file: string;
    success: boolean;
    error: string;
  }>;
  total: number;
  successful: number;
  failed: number;
}

// Export Types
export interface ExportParams {
  month: string; // YYYY-MM
}

export interface ExcelGenerateResult {
  success: boolean;
  file: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Change Password Types
export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

// Feedback Types
export interface FeedbackData {
  subject: string;
  message: string;
  type: 'bug' | 'feature' | 'general';
}