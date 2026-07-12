import api from './api';

export const reportService = {
  getAssetReports: async () => {
    const response = await api.get('/reports/assets');
    return response.data;
  },
  getDepartmentReports: async () => {
    const response = await api.get('/reports/departments');
    return response.data;
  },
  getMaintenanceReports: async () => {
    const response = await api.get('/reports/maintenance');
    return response.data;
  },
  getAuditReports: async () => {
    const response = await api.get('/reports/audits');
    return response.data;
  },
  getBookingReports: async () => {
    const response = await api.get('/reports/bookings');
    return response.data;
  }
};
