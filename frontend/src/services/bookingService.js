import api from './api';

export const bookingService = {
  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  createBooking: async (data) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },
  updateBooking: async (id, data) => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
  getCalendar: async () => {
    const response = await api.get('/bookings/calendar');
    return response.data;
  }
};
