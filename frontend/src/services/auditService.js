import api from './api';

export const auditService = {
  getAudits: async () => {
    const response = await api.get('/audits');
    return response.data;
  },
  createAudit: async (data) => {
    const response = await api.post('/audits', data);
    return response.data;
  },
  verifyAudit: async (data) => {
    const response = await api.post('/audits/verify', data);
    return response.data;
  },
  closeAudit: async (id) => {
    const response = await api.put(`/audits/${id}/close`);
    return response.data;
  }
};
