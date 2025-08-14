import { LatLngExpression } from "leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { MapPinIcon } from "@assets/icons";

interface IMapPin {
  position: LatLngExpression;
}

export const MapPin = ({ position }: IMapPin) => {
  const markerIcon = new L.Icon({
    iconUrl: MapPinIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  return <Marker position={position} icon={markerIcon} />;
};

export default MapPin;
