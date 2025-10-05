import type { CountryCode } from "./CountryCode";

export interface RegisterCredetials {
    name: string;
    email: string;
    password: string;
    countryCode: CountryCode;

}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
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
