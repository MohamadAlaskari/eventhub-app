import EventCard from "@/components/EventCard";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";
import type { Event } from "@/types/event";
import { Calendar } from "lucide-react";
import {  useState } from "react";

const Events = () => {
      // State for current page
  const [page, setPage] = useState(0);

  const { events, isLoading, pageInfo } = useEvents({ countryCode: "DE", size: 15 , page});

 
  
   const handleNextPage = () => {
    if (pageInfo && pageInfo.number < pageInfo.totalPages - 1) {
      setPage( pageInfo.number + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo && pageInfo.number > 0) {
      setPage(pageInfo.number - 1);
    }
  };


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
                <>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">
                            {pageInfo?.totalElements} Event
                            {pageInfo?.totalElements !== 1 ? "s" : ""} Found
                        
                        </h2>
                        <div className="text-sm text-muted-foreground">
                            Page {pageInfo ? pageInfo.number + 1 : 1} of{" "}
                            {pageInfo?.totalPages}                    
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageInfo && pageInfo.totalPages > 1 && (
                        <div className="mt-10">
                            <Pagination>
                                <PaginationContent>
                                {/** Previous button */}    
                                <PaginationItem>
                                    <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePrevPage();
                                    }}
                                    className={page === 0 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                    {[0, 1, 2, 3].map((offset) => {
                                        const pageNum = pageInfo.number + offset;
                                        if (pageNum > pageInfo.totalPages - 1) return null;
                                        return (
                                            <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                href="#"
                                                isActive={ pageInfo.number==pageNum}
                                                onClick={(e) => {
                                                e.preventDefault();
                                                setPage(pageNum);
                                                }}
                                            >
                                                {pageNum + 1}
                                            </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}


                                {pageInfo.totalPages > 3 && (
                                    <PaginationItem>
                                    <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/** Next button */}
                                <PaginationItem>
                                    <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNextPage();
                                    }}
                                    className={
                                        page >= pageInfo.totalPages - 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                    }
                                    />
                                </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
               </>
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
