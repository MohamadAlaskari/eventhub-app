import { http, httpAuth } from "@/config/api";
import { AUTH_CONFIG, AUTH_ERRORS } from "@/constants/auth";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { secureStorage } from "@/lib/storage";
import type { AuthResponse, AuthUser, LoginCredentials, RegisterCredetials } from "@/types/auth";

class AuthService {
    constructor() {}

    async login(loginCredentials: LoginCredentials) : Promise<AuthUser> {
        try {
            const response = await http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, loginCredentials);
            const authresponse: AuthResponse = response.data;
        
            // Save tokens to Local Storage
            secureStorage.setItem(AUTH_CONFIG.TOKEN_KEY, authresponse.accessToken);
            secureStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, authresponse.refreshToken);
            
            return this.getCurrentUser();
        } catch (error) {
            console.log(error);
            throw new Error(error instanceof Error ? error.message : AUTH_ERRORS.INVALID_CREDENTIALS);
        }
    }

    async register(registerCredentials : RegisterCredetials){
        try {
            const res = await http.post<{status: boolean, message: string}>(API_ENDPOINTS.AUTH.REGISTER, registerCredentials);
            
            return {status: res.data.status ,message: res.data.message};
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : AUTH_ERRORS.VALIDATION_ERROR);
        }
    }

    async logout(): Promise<void>{
        try {
            await httpAuth.post(API_ENDPOINTS.AUTH.LOGOUT);
            secureStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
            secureStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
        } catch (error) {
            console.warn('Logout failed:', error);
            // Still remove tokens locally even if API call fails
            secureStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
            secureStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);    
        }

    }

    async getCurrentUser() : Promise<AuthUser>{
        try {
            const res = await httpAuth.get<AuthUser>(API_ENDPOINTS.AUTH.PROFILE);
            return res.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : AUTH_ERRORS.UNAUTHORIZED);
        }
    }
  
    async refreshAccessToken() : Promise<AuthResponse>{
        try {
            const res = await httpAuth.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH);
            const authresponse: AuthResponse = res.data;

            // Save tokens to Local Storage
            secureStorage.setItem(AUTH_CONFIG.TOKEN_KEY, authresponse.accessToken);
            secureStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, authresponse.refreshToken);
            return authresponse
          
        } catch (error) {
            console.error("failed to refresh access token", error);
            throw new Error(error instanceof Error ? error.message : AUTH_ERRORS.TOKEN_EXPIRED);
        }
    }
  
    isAuthenticated() : boolean {
        return !!secureStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    }

}
export default AuthService;