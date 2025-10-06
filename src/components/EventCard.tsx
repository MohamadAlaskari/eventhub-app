import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '@/types/event';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {

  // Safe date creation with fallback
  const createEventDate = () => {
    if (!event.startDate) return new Date();
    
    const dateTimeString = event.startTime 
      ? `${event.startDate}T${event.startTime}`
      : `${event.startDate}T00:00:00`;
    
    const date = new Date(dateTimeString);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  
  const eventDate = createEventDate();
  const eventImage = event.images.find(img => img.ratio === "16_9") || event.images[0];

  return (
    <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 overflow-hidden">
        {/**Card image and overlay price and segment badge */}
        <div className="relative overflow-hidden">
            <img
            src={eventImage?.url}
            alt={event.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
                e.currentTarget.src = 'assets/images/placeholder.png';
            }}
            />
            <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-background/90 text-foreground shadow-soft">
                    {event.segment}
                </Badge>
            </div>

            {event.minPrice && (
            <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-success text-success-foreground border-success">
                ${event.minPrice}
                </Badge>
            </div>
            )}
        </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {event.name}
        </h3>
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-3">

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {format(eventDate, 'MMM dd, yyyy')}
            {event.startTime && ` • ${format(eventDate, 'h:mm a')}`}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{event.city}, {event.country}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {event.promoter}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Link to={`/events/${event.id}`} className="w-full">
          <Button 
            variant="hero" 
            className="w-full group-hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;