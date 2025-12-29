import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../../constants';

/**
 * Tours Service
 */
export const toursService = {
  /**
   * Get all tours
   */
  async getTours(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.TOURS.LIST}?${queryString}`
      : API_ENDPOINTS.TOURS.LIST;
    return apiClient.get(endpoint);
  },

  /**
   * Get tour by ID
   */
  async getTourById(id) {
    return apiClient.get(API_ENDPOINTS.TOURS.DETAIL.replace(':id', id));
  },

  /**
   * Search tours
   */
  async searchTours(query, filters = {}) {
    return apiClient.post(API_ENDPOINTS.TOURS.SEARCH, { query, ...filters });
  },

  /**
   * Get popular tours
   */
  async getPopularTours(limit = 10) {
    return apiClient.get(`${API_ENDPOINTS.TOURS.POPULAR}?limit=${limit}`);
  },

  /**
   * Get recommended tours
   */
  async getRecommendedTours(limit = 10) {
    return apiClient.get(`${API_ENDPOINTS.TOURS.RECOMMENDED}?limit=${limit}`);
  },

  /**
   * Get tour categories
   */
  async getCategories() {
    return apiClient.get(API_ENDPOINTS.TOURS.CATEGORIES);
  },
};

export default toursService;

