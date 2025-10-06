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
            // Update favorite status for EventDetail page
            queryClient.setQueryData(["favorite", eventId], true);

            //  Optionally update Favorites page cache instantly
            queryClient.setQueryData(["favorites"], (oldData: any) => {
                if (!oldData || !oldData.events) return oldData;

                const alreadyExists = oldData.events.some((e: any) => e.id === eventId);
                if (alreadyExists) return oldData;

                return {
                ...oldData,
                events: [...oldData.events, { id: eventId }],
                };
            });

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
        onSuccess: (_, eventId) => {
            toast.success('Event removed from favorites')
            // Update favorite status in EventDetail page immediately
            queryClient.setQueryData(["favorite", eventId], false);

            // Update the Favorites list cache to remove the event instantly
            queryClient.setQueryData(["favorites"], (oldData: any) => {
                if (!oldData || !oldData.events) return oldData;

                return {
                ...oldData,
                events: oldData.events.filter((event: any) => event.id !== eventId),
                };
            });


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
        addFavorite: addFavoriteMutation.mutate,
        removeFavorite: removeFavoriteMutation.mutate,
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