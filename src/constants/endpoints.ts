/**
 * API Endpoints Configuration
 */


// Authentication Endpoints - Import from auth constants
import { AUTH_ENDPOINTS } from './auth';

// Events Endpoints - Your Backend API
export const EVENTS_ENDPOINTS = {
  LIST: '/event/events',
  DETAILS: (id: string) => `/event/${id}`,
} as const;

// User Endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/user/profile',
  UPDATE: '/user/update',
  BOOKINGS: '/user/bookings',
} as const;

// Export all endpoints
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  EVENTS: EVENTS_ENDPOINTS,
  USER: USER_ENDPOINTS,
} as const;