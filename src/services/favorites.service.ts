import { httpAuth } from "@/config/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import type { Event, PageInfo } from "@/types/event";

interface FavoriteApiResponse {
    page: PageInfo;
    events: Event[];
}


class FavoritesService {

    async getUserFavorites(): Promise<FavoriteApiResponse> {
        try {

            const res = await httpAuth.get<FavoriteApiResponse>(API_ENDPOINTS.FAVORITE.LIST)

            if (!res.data.events) {
                throw new Error('No Fovorite Events found');
            }
            return {
                page: res.data.page,
                events: res.data.events,
            };
            
        } catch (error) {
            throw new Error(`Failed to fetch user Favorite ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        
    }

    async addFavorite(eventId: string): Promise<void> {
        try {
            await httpAuth.post(API_ENDPOINTS.FAVORITE.ADD(eventId));  
        } catch (error) {
            throw new Error(`Failed to add Favorite ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async removeFavorite(eventId: string): Promise<void> {
        try {
            await httpAuth.delete(API_ENDPOINTS.FAVORITE.REMOVE(eventId));
        } catch (error) {
            throw new Error(`Failed to remove Favorite ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async checkFavorite(eventId: string): Promise<boolean> {
        try {
            const res = await httpAuth.get<boolean>(API_ENDPOINTS.FAVORITE.CHECK(eventId));
            return res.data;
        } catch (error) {
            throw new Error(`Failed to check Favorite ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    
}

export const favoritesService = new FavoritesService();

// git commit : add favorites service to fetch user favorites and add/remove favorite events