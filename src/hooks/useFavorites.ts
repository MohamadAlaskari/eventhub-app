import { favoritesService } from "@/services/favorites.service"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"

export const useFavorites = () => {
    const {isAuthenticated} = useAuth()

    const favoritesQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favoritesService.getUserFavorites(),
        enabled: isAuthenticated,
        staleTime: 0,
        refetchOnMount: 'always',
        
    })
    return {
        favorites: favoritesQuery.data?.events ?? [],
        pageInfo: favoritesQuery.data?.page,
        isloading: favoritesQuery.isLoading,
    }
    
}