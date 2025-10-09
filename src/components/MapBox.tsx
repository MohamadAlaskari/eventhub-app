interface MapBoxProps {
  lat: number;
  long: number;
}
const MapBox = ({lat, long}: MapBoxProps) => {
  return (
    <div>MapBox - Lat: {lat}, Lng: {long}</div>
  )
}

export default MapBox