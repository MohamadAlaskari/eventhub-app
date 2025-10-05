import { Calendar, MapPin, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import type { Event } from "@/types/event";

interface FavoriteEventCardProps {
  event: Event;
  onRemove: (eventId: string) => void;
}

const FavoriteEventCard = ({ event, onRemove }: FavoriteEventCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {event.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {event.genre || event.segment}
              </Badge>
              {!event.minPrice || event.minPrice === 0 ? (
                <Badge variant="secondary" className="text-xs">
                  Kostenlos
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  {event.currency || '€'}{event.minPrice}
                  {event.maxPrice && event.maxPrice !== event.minPrice && ` - ${event.currency || '€'}${event.maxPrice}`}
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(event.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {formatDate(event.startDate)} um {event.startTime}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">
              {event.venue && event.city ? `${event.venue}, ${event.city}` : 'Standort wird bekannt gegeben'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Link to={`/events/${event.id}`} className="flex-1">
            <Button variant="hero" size="sm" className="w-full group-hover:shadow-glow transition-all duration-300">
              Details anzeigen
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteEventCard;
