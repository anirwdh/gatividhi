import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../../constants';

/**
 * Bookings Service
 */
export const bookingsService = {
  /**
   * Create booking
   */
  async createBooking(bookingData) {
    return apiClient.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
  },

  /**
   * Get user bookings
   */
  async getUserBookings() {
    return apiClient.get(API_ENDPOINTS.BOOKINGS.LIST);
  },

  /**
   * Get booking by ID
   */
  async getBookingById(id) {
    return apiClient.get(API_ENDPOINTS.BOOKINGS.DETAIL.replace(':id', id));
  },

  /**
   * Cancel booking
   */
  async cancelBooking(id) {
    return apiClient.post(API_ENDPOINTS.BOOKINGS.CANCEL.replace(':id', id));
  },
};

export default bookingsService;

