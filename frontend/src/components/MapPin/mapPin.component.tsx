import { LatLngExpression } from "leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { MapPinIcon } from "@assets/icons";

export const MapPin = ({ position }: { position: LatLngExpression }) => {
  const markerIcon = new L.Icon({
    iconUrl: MapPinIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  return <Marker position={position} icon={markerIcon}></Marker>;
};

export default MapPin;
