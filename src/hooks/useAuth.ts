/**
 * Hook to access authentication context
 * Must be used within AuthProvider
 */

import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');     
    }
    
    return context;
}