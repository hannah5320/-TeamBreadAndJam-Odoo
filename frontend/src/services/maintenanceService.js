import api from './api';

export const maintenanceService = {
  getMaintenanceRequests: async () => {
    const response = await api.get('/maintenance');
    return response.data;
  },
  createMaintenanceRequest: async (data) => {
    const response = await api.post('/maintenance', data);
    return response.data;
  },
  updateMaintenanceRequest: async (id, data) => {
    const response = await api.put(`/maintenance/${id}`, data);
    return response.data;
  },
  getMaintenanceHistory: async () => {
    const response = await api.get('/maintenance/history');
    return response.data;
  }
};
