import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../../constants';

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login user
   */
  async login(credentials) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Register user
   */
  async register(userData) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      apiClient.setAuthToken(null);
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    return apiClient.get(API_ENDPOINTS.AUTH.ME);
  },

  /**
   * Refresh token
   */
  async refreshToken() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!apiClient.getAuthToken();
  },
};

export default authService;

