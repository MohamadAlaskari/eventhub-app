import { eventDetailsService } from "@/services/event-details.servic"
import { useQuery } from "@tanstack/react-query"
import type { Event } from '@/types/event';


export const useEventDetails = (eventId: string) => {
    //Query for event details
    const getEventDetails = useQuery<Event>({
        queryKey: ['event', eventId],
        queryFn: () => eventDetailsService.getEventDetails(eventId),
        enabled: !!eventId,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: 'always'

    })

    return {
        event: getEventDetails.data,
        isLoading: getEventDetails.isLoading,
        isError: getEventDetails.isError,
        refresh: getEventDetails.refetch
    }
    }
