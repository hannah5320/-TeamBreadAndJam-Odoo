import api from './api';

export const allocationService = {
  getAllocations: async () => {
    const response = await api.get('/allocations');
    return response.data;
  },
  allocateAsset: async (data) => {
    const response = await api.post('/allocate', data);
    return response.data;
  },
  returnAsset: async (data) => {
    const response = await api.post('/return', data);
    return response.data;
  },
  transferAsset: async (data) => {
    const response = await api.post('/transfer', data);
    return response.data;
  },
  getAllocationHistory: async () => {
    const response = await api.get('/allocations/history');
    return response.data;
  }
};
