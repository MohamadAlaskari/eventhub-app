import { favoritesService } from "@/services/favorites.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { toast } from "sonner"

export const useFavorites = () => {
    const {isAuthenticated} = useAuth()
    const queryClient = useQueryClient()

    // Query to fetch user's favorite events
    const favoritesQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favoritesService.getUserFavorites(),
        enabled: isAuthenticated,
        staleTime: 0,
        refetchOnMount: 'always',
        
    })

    // Mutation to add a favorite event
    const addFavoriteMutation = useMutation({
        mutationFn: (eventId: string) => favoritesService.addFavorite(eventId),
        onSuccess: (_, eventId) => {
            queryClient.invalidateQueries({ queryKey: ['favorite', eventId] });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success('Event added to favorites',{
                description: 'You can find it in your favorites list'
            })
        },
        onError: (error) => {
            toast.error('Error', {
                description: error instanceof Error ? error.message : 'Failed to add to favorites'
            })
        }

    })


    // Mutation to remove a favorite event
    const removeFavoriteMutation = useMutation({
        mutationFn: (eventId: string) => favoritesService.removeFavorite(eventId),
        onSuccess: () => {
            toast.success('Event removed from favorites')
            queryClient.invalidateQueries({ queryKey: ['favorite', eventId] });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });

        },
        onError: (error) => {
            toast.error('Error', {
                description: error instanceof Error ? error.message : 'Failed to remove from favorites'
            })
        }
    })



    return {
        favorites: favoritesQuery.data?.events ?? [],
        pageInfo: favoritesQuery.data?.page,
        isloading: favoritesQuery.isLoading,
        addFavorite: addFavoriteMutation,
        removeFavorite: removeFavoriteMutation,
        isAdding: addFavoriteMutation.isPending,
        isRemoving: removeFavoriteMutation.isPending,
    }
    
}

export const useFavoriteStatus = (eventId: string) => {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: ["favorite", eventId],
        queryFn: () => favoritesService.checkFavorite(eventId),
        enabled: isAuthenticated && !!eventId,
        staleTime: 0,
        refetchOnMount: "always",
    });
};