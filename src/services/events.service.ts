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
            const queryParams = new URLSearchParams({
                countryCode: params.countryCode ? params.countryCode : 'US',
                startDate: params.startDate ? params.startDate : '',
                size: (params.size ? params.size : 10).toString(),
                page: (params.page ? params.page : 0).toString()
            })
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