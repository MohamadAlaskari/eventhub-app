

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// MapBox Access Token aus Umgebungsvariable
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;



interface MapBoxProps {
  lat: number;
  long: number;
  zoom?: number;
  height?: string;
}

const MapBox = ({ lat, long, zoom = 12, height = '400px' }: MapBoxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Map already initialized

    // Check if MapBox Access Token is set
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('MapBox Access Token ist nicht gesetzt. Bitte VITE_MAPBOX_ACCESS_TOKEN in der .env-Datei definieren.');
      return;
    }

    // Set MapBox Access Token 
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // create new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12', // Standard-Style
      center: [long, lat], // [longitude, latitude]
      zoom: zoom
    });

    // Event-Listener for loaded map
    map.current.on('load', () => {
      setIsLoaded(true);
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add marker when map is loaded
  useEffect(() => {
    if (map.current && isLoaded) {
      // Alle bestehenden Marker entfernen
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
      existingMarkers.forEach(marker => marker.remove());

      // Neuen Marker hinzufügen
      new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map.current!);

      // Karte zum neuen Zentrum bewegen
      map.current.setCenter([long, lat]);
    }
  }, [lat, long, isLoaded]);

  return (
    <div 
      ref={mapContainer} 
      style={{ height: height, width: '100%' }}
      className="rounded-lg shadow-lg"
    />
  );
};

export default MapBox