import AuthService from "@/services/auth.service";
import type { AuthState, LoginCredentials, RegisterCredetials } from "@/types/auth";
import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";


// Interface defining the context type with authentication methods
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterCredetials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Creating the context with the AuthContextType interface
export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
const authService = new AuthService();


/**
 * Authentication Provider Component
 * Wraps the application and provides authentication context to all child components
 */
export const AuthProvider= ({children}: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    })

    /**
   * Initialize authentication state on component mount
   * Checks for existing authentication and loads user data
   */
    useEffect(() => {
        const initializeAuth = async () => {
            // If user is not authenticated, just set loading to false
            if (!authService.isAuthenticated()) {
                setAuthState(prev => ({ ...prev, isLoading: false }));
                    return;
            }

            try {
                // Attempt to get current user data from the auth service
                const user = await authService.getCurrentUser();
                setAuthState({
                user,
                isAuthenticated: true,
                isLoading: false,
                });
            } catch (error) {
                console.warn('Failed to initialize authentication:', error);
                setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                });
            }

        }
            initializeAuth();

    }, [] )


   // 
  const login= useCallback(async (credentials: LoginCredentials) => {
    try {
        setAuthState(oldState => ({ ...oldState, isLoading: true }));

        const user = await authService.login(credentials);
        setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
        })

      toast.success(`Welcome back, ${user.name}`);

    } catch (error: any) {
        setAuthState( oldState => ({ ...oldState, isLoading: false }));
        toast.error('Login failed', {
            description: error instanceof Error ? error.message : 'An error occurred',
        });

        throw error;
    }
  },[]) 
  


      // 
    const register = useCallback(async (userData: RegisterCredetials) => {
        try {
            setAuthState(oldState => ({ ...oldState, isLoading: true }));

             const data= await authService.register(userData);
            
            setAuthState({
                user:null,
                isAuthenticated: false,
                isLoading: false,
            });

            toast.success('Account created!', {
                description: data.message,
            });
            
        } catch (error: any) {
            setAuthState(oldState => ({ ...oldState, isLoading: false }));
            toast.error('Registration failed', {
                description: error instanceof Error ? error.message : 'An error occurred',
            });            
            throw error;
        }
    }, []); 

    const logout = useCallback(async () => {
        try {
            await authService.logout();
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            })
            toast.success('Logged out', {
                description: 'You have been successfully logged out',
            });
            
        } catch (error) {
            console.error('Failed to logout:', error);

            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            })
            throw error;
        }
    },[]) 


    const refreshUser = useCallback(async () => {
        try {
            const user = await authService.getCurrentUser();
            setAuthState(oldState => ({ ...oldState, user }))
        } catch (error) {
            console.error('Failed to refresh user:', error);
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            })
            throw error;
        }
    }, [])
    
  const contextValue : AuthContextType = {
      ...authState,
      login,
      register,
      logout,
      refreshUser
  }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}







