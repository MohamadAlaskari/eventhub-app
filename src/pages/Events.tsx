import EventCard from "@/components/EventCard";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";
import { CountryCode } from "@/types/CountryCode";
import type { Event } from "@/types/event";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const Events = () => {
      // State for current page
  const [page, setPage] = useState(0);
  // State for selected country code
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>(CountryCode.DE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  

  const { events, isLoading, pageInfo } = useEvents({ countryCode: selectedCountryCode, size: 15 , page});
  const countryCodes = Object.values(CountryCode);

  useEffect(() => {
    if (!events) return;
    let filtered = events;
  
    // Lokale Suche
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Lokale Kategorie
    if (selectedCategory) {
      filtered = filtered.filter((e) => e.segment === selectedCategory);
    }
  
    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategory]);

  
   const handleNextPage = () => {
    if (pageInfo && page < pageInfo.totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  // Handler for country selection
  const handleCountryChange = (value: string) => {
    setSelectedCountryCode(value as CountryCode);
    setPage(0); // Reset to first page when country changes
  };
  const handleResetFilter = () => {
    setSelectedCountryCode(CountryCode.DE);
    setSearchQuery("");
    setSelectedCategory(null);

    setPage(0);
  }

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
             ): filteredEvents && filteredEvents.length > 0 ?(
                <>
                {/* Search and Filters Section*/}
                <div className="flex flex-col justify-between md:flex-row gap-3 sm:gap-4 mb-6">
                    {/* Search Input */}
                    <div className="flex-2 ">
                        <Input 
                            type="search" 
                            placeholder="Search events..." 
                            className="w-full"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    {/* Filters */}
                    <div className="flex-1 flex flex-col gap-3 sm:flex-row  sm:gap-4">
                        {/* Country Filter */}
                        <div className="flex-1 min-w-0">
                            <Select value={selectedCountryCode} onValueChange={handleCountryChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Country" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto">
                                    <SelectGroup >
                                        <SelectLabel>Countries</SelectLabel>
                                        {countryCodes.map((code) => (
                                            <SelectItem key={code} value={code}>{code}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Category Filter */}
                        <div className="flex-1 min-w-0">
                            <Select value={selectedCategory??""} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="max-h-60 overflow-y-auto">
                                        <SelectLabel>Category</SelectLabel>
                                        {Array.from(new Set(filteredEvents.map(event => event.segment))).map((segment) => (
                                            <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <Separator className="mb-6"/>


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
                        {filteredEvents.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageInfo && pageInfo.totalPages > 1 && (
                        <div className="mt-10">
                            <Pagination>
                                <PaginationContent>
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

                                {/* Example: show 3 page numbers dynamically */}
                                {Array.from({ length: pageInfo.totalPages })
                                    .slice(
                                    Math.max(0, page - 1),
                                    Math.min(pageInfo.totalPages, page + 2)
                                    )
                                    .map((_, idx) => {
                                    const pageNum =
                                        Math.max(0, page - 1) + idx;
                                    return (
                                        <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            href="#"
                                            isActive={pageNum === page}
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
                        onClick={handleResetFilter}
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
