import { http } from "@/config/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import type { Event } from "@/types/event";

 

class EventDetailsService {
    async getEventDetails(id:string): Promise<Event> {
        try {
            const res = await http.get<Event>(`${API_ENDPOINTS.EVENTS.DETAILS(id)}`)
            if (!res.data  ) {
                throw new Error('No data found')
            }
            return res.data;           
        } catch (error) {
            throw new Error(`Failed to fetch events, ${error instanceof Error ? error.message : 'Unknown error'} `)
            
        }
        
    }
}

export const eventDetailsService = new EventDetailsService();