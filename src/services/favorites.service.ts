import { httpAuth } from "@/config/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import type { Favorite, FavoritePageInfo } from "@/types/favorite";

interface FavoriteApiResponse {
    page: FavoritePageInfo;
    events: Favorite[];
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
    
}

export const favoritesService = new FavoritesService();