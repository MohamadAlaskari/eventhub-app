export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/signup',
  PROFILE: '/auth/profile',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
} as const;

/**
 * Events Endpoints
 */
export const EVENTS_ENDPOINTS = {
  LIST: '/event/events',                    
  DETAILS: (id: string) => `/event/${id}`,  
} as const;

/**
 * Favorites Endpoints
 */
export const FAVORITE_ENDPOINTS = {
  ADD: (eventId: string) => `/favorite/${eventId}`,  
  REMOVE: (eventId: string) => `/favorite/${eventId}`,
  CHECK: (eventId: string) => `/favorite/${eventId}`,   
  LIST: '/favorite',                                    
} as const;

/**
 * User Endpoints
 */
export const USER_ENDPOINTS = {
  CREATE: '/user',                            
  GET_BY_ID: (id: string) => `/user/${id}`,   
  UPDATE: (id: string) => `/user/${id}`,      
  DELETE: (id: string) => `/user/${id}`,      
} as const;

/**
 * Unified API Endpoints Export
 */
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  EVENTS: EVENTS_ENDPOINTS,
  FAVORITE: FAVORITE_ENDPOINTS,
  USER: USER_ENDPOINTS,
} as const;