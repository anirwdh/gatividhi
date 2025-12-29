import { API_BASE_URL } from '../../constants';

/**
 * API Client - Centralized HTTP client for all API requests
 */
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get authentication token from storage
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Set authentication token
   */
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Build full URL
   */
  buildURL(endpoint) {
    // Replace path parameters
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Get default headers
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle response
   */
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'An error occurred');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    const url = this.buildURL(endpoint);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(options.headers),
      ...options,
    });

    return this.handleResponse(response);
  }

  /**
   * POST request
   */
  async post(endpoint, data, options = {}) {
    const url = this.buildURL(endpoint);
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return this.handleResponse(response);
  }

  /**
   * PUT request
   */
  async put(endpoint, data, options = {}) {
    const url = this.buildURL(endpoint);
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return this.handleResponse(response);
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data, options = {}) {
    const url = this.buildURL(endpoint);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return this.handleResponse(response);
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    const url = this.buildURL(endpoint);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(options.headers),
      ...options,
    });

    return this.handleResponse(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

