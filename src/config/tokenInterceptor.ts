/**
 * 
 * This file is used to setup the token interceptor for axios
 * @module tokenInterceptor
 * 
 */
import type { AxiosInstance } from 'axios';
import { secureStorage } from '@/lib/storage';
import { AUTH_CONFIG } from '@/constants/auth';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

export const setupTokenInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response) => response,  // if the request is successful, return the response
    async (error) => {
      const original = error.config;


      const orginalUrl = original.url.includes(AUTH_ENDPOINTS.LOGIN) ||
        original.url.includes(AUTH_ENDPOINTS.REGISTER) ||
        original.url.includes(AUTH_ENDPOINTS.REFRESH)

      // if the error not 401 or from this urls, return the error
      if (error.response?.status !== 401 || orginalUrl) {
        return Promise.reject(error);
      }

      // if the error is 401, try to get the refresh token and use it to get a new access token
      const refreshToken = secureStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        // if there is no refresh token, clear the storage and return the error
        secureStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
        return Promise.reject(error);
      }

      try {
        // try to get a new access token using the refresh token
        const resp = await http.post(AUTH_ENDPOINTS.REFRESH, { refreshToken });
        const { access_token, refresh_token } = resp.data;

        // if the request is successful, save the new access token and refresh token
        secureStorage.setItem(AUTH_CONFIG.TOKEN_KEY, access_token);
        secureStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, refresh_token);

        // use the new access token to make the original request again
        original.headers['Authorization'] = `Bearer ${access_token}`;
        return http(original);
      } catch (e) {

        // if the request to get a new access token failed, clear the storage and return the error
        secureStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
        secureStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
        return Promise.reject(e);
      }
    }
  );
};
