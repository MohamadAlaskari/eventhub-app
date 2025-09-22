/**
 * API configuration settings and HTTP client setup.
 * 
 */
import { AUTH_CONFIG } from "@/constants/auth";
import { secureStorage } from "@/lib/storage";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Define the API configuration settings.
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api" ,
    TIMEOUT: 10000, 
    HEADERS: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
} as const;


// Create an Axios instance with the API configuration.
const httpClient:AxiosInstance  = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

// HTTP Methods - Direct access to httpClient
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

// Auth helpers
export const getAuthHeaders = () => {
  const token = secureStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authenticated HTTP Methods - Direct access to httpClient with auth headers
export const httpAuth = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    httpClient.get<T>(url, { ...config, headers: { ...getAuthHeaders(), ...config?.headers } }),
    
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    httpClient.post<T>(url, data, { ...config, headers: { ...getAuthHeaders(), ...config?.headers } }),
    
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    httpClient.put<T>(url, data, { ...config, headers: { ...getAuthHeaders(), ...config?.headers } }),
    
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    httpClient.delete<T>(url, { ...config, headers: { ...getAuthHeaders(), ...config?.headers } }),
};


