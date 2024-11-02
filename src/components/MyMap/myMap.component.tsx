// import styles from "./myMap.module.scss";
import { useMapEvents, ZoomControl } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
// import pinSvg from "@assets/icons/pin.svg";
import { Area, Point } from "@customtypes/map";
import useUserLocation from "@hooks/useUserLocation";
import { useEffect, useState } from "react";
import { MapPoints, MapAreas, Centralize, Cursor } from "@components/index";

interface MapProps {
  className?: string;
  points?: Point[];
  areas?: Area[];
}

export const MyMap = ({ className, points, areas }: MapProps) => {
  const map = useMapEvents({
    zoomend() {
      setCurrentZoom(map.getZoom());
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const API_KEY = import.meta.env.VITE_API_MAPS;
  const { userLocation } = useUserLocation();
  const [currentZoom, setCurrentZoom] = useState<number>(15);

  useEffect(() => {
    map.locate();
  }, []);

  return (
    <>
      <TileLayer
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
        url={`https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${API_KEY}`}
        id="osm-bright"
        className={className}
      />

      <Cursor zoom={currentZoom} userLocation={userLocation} />
      <Centralize currentPosition={userLocation?.coordinates} />
      <ZoomControl position="bottomleft" />

      <MapPoints points={points} zoom={currentZoom} />
      <MapAreas areas={areas} />
    </>
  );
};

export default MyMap;
