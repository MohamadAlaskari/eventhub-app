import EventCard from "@/components/EventCard";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";
import type { Event } from "@/types/event";
import { Calendar } from "lucide-react";

const Events = () => {
  const { events, isLoading } = useEvents({ countryCode: "DE", size: 10 });

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Events
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Find amazing events happening around you. From concerts to
              conferences, there's something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {isLoading ? (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="h-48 bg-muted animate-pulse" />
                            <CardContent className="p-6 space-y-3">
                                <Skeleton className="h-4 bg-muted rounded animate-pulse" />
                                <Skeleton className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                                <Skeleton className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
             ): events && events.length > 0 ?(
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event: Event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
             ):(
                <div className="text-center py-20">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        No events found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Try adjusting your filter criteria
                    </p>
                    <Button 
                        onClick={() => {
                        // Clear filters  
                        }}
                        variant="outline"
                    >
                        Clear Filters
                    </Button>
                </div>
             )
        
            }
        </div>
      </section>
    </Layout>
  );
};

export default Events;
