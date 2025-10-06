import { eventsService, type EventsApiParams, type EventsApiResponse } from "@/services/events.service";
import { useQuery } from "@tanstack/react-query";

export const EVENTS_QUERY_KEY = ["events"];

export const useEvents = (params: EventsApiParams) => {
  
    const eventsQuery = useQuery<EventsApiResponse>({
    queryKey: ["events", params],
    queryFn: () => eventsService.getEvents(params),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: "always",
    retry: 1,
  });
  return {
    events: eventsQuery.data?.events,
    pageInfo: eventsQuery.data?.pageInfo,
    isLoading: eventsQuery.isLoading,
    isError: eventsQuery.isError,
    refetch: eventsQuery.refetch,
    

  };
}