/**
 * API Services Export
 * Main entry point for all API services
 */

// Core
export { config } from './config';
export { apiClient, apiUtils } from './client';

// API Services
export { authAPI } from './auth';
export { userAPI } from './user';
export { attendanceAPI } from './attendance';
export { adminAPI } from './admin';
export { exportAPI } from './export';

// Types
export * from './types';

// Default export for convenience
import { authAPI } from './auth';
import { userAPI } from './user';
import { attendanceAPI } from './attendance';
import { adminAPI } from './admin';
import { exportAPI } from './export';

export default {
  auth: authAPI,
  user: userAPI,
  attendance: attendanceAPI,
  admin: adminAPI,
  export: exportAPI
};