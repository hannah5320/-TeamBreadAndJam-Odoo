import api from './api';

export const assetService = {
  getAssets: async () => {
    const response = await api.get('/assets');
    return response.data;
  },
  getAssetById: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },
  createAsset: async (data) => {
    const response = await api.post('/assets', data);
    return response.data;
  },
  updateAsset: async (id, data) => {
    const response = await api.put(`/assets/${id}`, data);
    return response.data;
  },
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  }
};
