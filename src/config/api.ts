/**
 * API Configuration and HTTP Client
 * @module config/api
 */

import { secureStorage } from '@/lib/storage';
import { AUTH_CONFIG } from '@/constants/auth';
import { setupTokenInterceptor } from './tokenInterceptor';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

/**
 * Base API config
 */
export const API_CONFIG = {
  BASE_URL: 'https://eventhub-api.alaskaritech.com',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;

/**
 * Axios instance
 */
const httpClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

/**
 * Attach token refresh interceptor
 */
setupTokenInterceptor(httpClient);

// Public http methods (no auth header)
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.get<T>(url, config),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.post<T>(url, data, config),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.put<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.delete<T>(url, config),
};

// Helper to build auth headers
export const getAuthHeaders = () => {
  const token = secureStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authenticated http methods (auto-attach Authorization header)
export const httpAuth = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.get<T>(url, {
      ...config,
      headers: { ...getAuthHeaders(), ...config?.headers },
    }),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.post<T>(url, data, {
      ...config,
      headers: { ...getAuthHeaders(), ...config?.headers },
    }),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.put<T>(url, data, {
      ...config,
      headers: { ...getAuthHeaders(), ...config?.headers },
    }),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    httpClient.patch<T>(url, data, {
      ...config,
      headers: { ...getAuthHeaders(), ...config?.headers },
    }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    httpClient.delete<T>(url, {
      ...config,
      headers: { ...getAuthHeaders(), ...config?.headers },
    }),
};
