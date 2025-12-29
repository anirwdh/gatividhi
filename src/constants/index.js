// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/user/auth/me',
  },
  // Tours
  TOURS: {
    LIST: '/tours',
    DETAIL: '/tours/:id',
    SEARCH: '/tours/search',
    CATEGORIES: '/tours/categories',
    POPULAR: '/tours/popular',
    RECOMMENDED: '/tours/recommended',
  },
  // Bookings
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    DETAIL: '/bookings/:id',
    CANCEL: '/bookings/:id/cancel',
  },
  // Reviews
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
  },
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
  },
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  TOUR_DETAIL: '/tours/:id',
  SEARCH: '/search',
  BOOKING: '/booking',
  BOOKING_CONFIRMATION: '/booking/confirmation',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  CONTACT: '/contact',
};

// App Constants
export const APP_CONFIG = {
  NAME: 'Gatividhi',
  DESCRIPTION: 'Discover amazing tours and experiences',
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_LANGUAGE: 'en',
};

