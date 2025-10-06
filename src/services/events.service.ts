import { http } from "@/config/api"
import { API_ENDPOINTS } from "@/constants/endpoints"
import type {Event ,PageInfo } from "@/types/event";

export interface EventsApiResponse {
  events: Event[];
  pageInfo: PageInfo;
}

export interface EventsApiParams {
  countryCode?: string;
  startDate?: string;
  size?: number;
  page?: number;
}

class EventsService {
    
    async getEvents(params: EventsApiParams): Promise<EventsApiResponse>{
        try {
            const queryParams = new URLSearchParams();


            // Nur hinzufügen, wenn vorhanden
            if (params.countryCode) queryParams.append("countryCode", params.countryCode);
            if (params.startDate) queryParams.append("startDate", params.startDate);
            if (params.size) queryParams.append("size", params.size.toString());
            if (params.page) queryParams.append("page", params.page.toString());
                
            const res = await http.get<EventsApiResponse>(`${API_ENDPOINTS.EVENTS.LIST}?${queryParams}`)
    
    
            return {
                events: res.data.events,
                pageInfo: res.data.pageInfo
            }
        } catch (error) {
            throw new Error(`Failed to fetch events: ${error instanceof Error ? error.message : 'Unknown error'}`)  
        }

    }
        

}

export const eventsService = new EventsService();