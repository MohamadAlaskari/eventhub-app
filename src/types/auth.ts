import type { CountryCode } from "./countryCode";

export interface RegisterCredetials {
    name: string;
    email: string;
    password: string;
    countryCode?: CountryCode;

}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isEmailVerified: true,
  countryCode: string;
  refreshTokenHash?: string;

}


export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
