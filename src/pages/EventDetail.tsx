import Layout from "@/components/Layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useEventDetails } from "@/hooks/useEventDetails"
import { useFavorites, useFavoriteStatus } from "@/hooks/useFavorites"
import { ArrowLeft, Calendar, ExternalLink, Heart, MapPin, Share2 } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MapBox from "@/components/MapBox"


const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {event, isLoading, isError} = useEventDetails(id!)
  const {isAuthenticated}= useAuth()
  const {addFavorite, removeFavorite, isAdding, isRemoving} = useFavorites()
  const { data: isFavorited = false } = useFavoriteStatus(id || '');
  const [showLoginDialog, setShowLoginDialog] = useState(false);




  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (!id) return;

    if (isFavorited) {
      removeFavorite(id);
    } else {
      addFavorite(id);

    }
  };


  const handleViewEvent = () => {
    if (event?.url) {
      window.open(event.url, '_blank', 'noopener,noreferrer');
    } else {
      toast('Event Information', {
        description: 'Event details not available at this time.',
      });
    }
  };

    const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: event?.name || 'Event',
      text: `Check out this event: ${event?.name}`,
      url: url,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast.success('Link copied!', {
          description: 'Event link copied to clipboard.',
        });
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!', {
        description: 'Event link copied to clipboard.',
      });
    }
  };


  if(isLoading){
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              to="/events"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
            </Link>
          <div className="space-y-6 animate-pulse">

            {/* Hero Image */}
            <Skeleton className="h-64 md:h-80 lg:h-96 w-full rounded-lg mb-8" />

            {/* Hauptinhalt */}
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Textbereich */}
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>              

              {/* Sidebar / Info Card */}
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (isError || !event){
    return(
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Event not found</h2>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/events">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
      </Layout>
    )
  }


    // Safe date creation with validation
  const createEventDate = () => {
    if (!event.startDate) return new Date();
    
    const dateTimeString = event.startTime 
      ? `${event.startDate}T${event.startTime}`
      : `${event.startDate}T00:00:00`;
    
    const date = new Date(dateTimeString);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const createSalesDate = (dateString: string) => {
    if (!dateString) return new Date();
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  
  const eventImage = event.images.find(img => img.ratio === "16_9") || event.images[0];
  const eventDate = createEventDate();
  const salesStart = createSalesDate(event.salesStart);
  const salesEnd = createSalesDate(event.salesEnd);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>

        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-lg mb-8 shadow-strong">
          <img
            src={eventImage?.url}
            alt={event.name}
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/800/400';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">
                {event.segment}
              </Badge>
              <Badge variant="outline" className="text-white border-white/20">
                {event.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {event.name}
            </h1>
          </div>
        </div>

        {/* Hauptinhalt */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/**Description */}
            {event.description &&(
            <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-2xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            )
            }

            {/**Event Details */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/**1er col */}
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">
                        {format(eventDate, 'EEEE, MMMM dd, yyyy')}
                      </p>
                      {event.startTime && (
                        <p className="text-sm text-muted-foreground">
                          {format(eventDate, 'h:mm a')} ({event.timezone})
                        </p>
                      )}
                    </div>

                  </div>
                  {/**2er col */}
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-sm font-medium">{event.venue}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.address}, {event.city}, {event.country}
                      </p>
                    </div>
                  </div>

                  {event.genre && (
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">Category</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{event.segment}</Badge>
                      <Badge variant="outline">{event.genre}</Badge>
                      {event.subGenre && event.subGenre !== "Undefined" && (
                        <Badge variant="outline">{event.subGenre}</Badge>
                      )}
                    </div>
                  </div>
                )}

                {(event.minPrice || event.maxPrice) && (
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">Price Range</p>
                    <p className="text-muted-foreground">
                      {event.currency} {event.minPrice || 'TBA'} 
                      {event.maxPrice && event.minPrice !== event.maxPrice && ` - ${event.maxPrice}`}
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Sales Period</p>
                  <p className="text-xs text-muted-foreground">
                    {format(salesStart, 'MMM dd, yyyy')} - {format(salesEnd, 'MMM dd, yyyy')}
                  </p>
              </div>
              </CardContent>
            </Card>

            
             {/* Map Card */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl">Location</CardTitle>
              </CardHeader>
              <CardContent>

                {/* Map karte */}
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <MapBox lat={parseFloat(event.latitude)} long={parseFloat(event.longitude)}  zoom={13} height="100%" />
                </div>
                {/* Map Infos */}  
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium">{event.venue}</p>
                  <p>{event.address}</p>
                  <p>{event.postalCode} {event.city} </p>
                  <p>{event.country} </p>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-soft sticky top-18">
              <CardHeader>
                <CardTitle>
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleViewEvent}
                  size="lg" 
                  className="w-full"
                  disabled={event.status !== 'onsale'}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Event Details
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    onClick={handleFavorite}
                    variant={isFavorited ? "accent" : "outline"}
                    size="sm"
                    className="flex-1"
                    disabled={isAdding || isRemoving}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-accent ' : ''}`} />
                    
                  </Button>
                </div>
                
              </CardContent>
            </Card>
          </div>
        </div>

      </div>

        

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to add events to your favorites.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <Link to="/login" className="w-full" onClick={() => setShowLoginDialog(false)}>
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setShowLoginDialog(false)}>
                <Button variant="outline" className="w-full" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowLoginDialog(false)}
                className="text-sm"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  )
 
  
}

export default EventDetail