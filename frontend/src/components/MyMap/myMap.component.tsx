// import styles from "./myMap.module.scss";
import { useMapEvents, ZoomControl } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
// import pinSvg from "@assets/icons/pin.svg";
import { Area, Point } from "@customtypes/map";
import { useContext, useEffect } from "react";
import { MapPoints, MapAreas, Centralize, Cursor } from "@components/index";
import { useLocalStorage } from "@hooks/index";
import {
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE,
  CurrentLocationContext,
} from "@contexts/CurrentLocationContext";
import { MapCenterContext } from "@contexts/MapCenterContext";

interface MapProps {
  className?: string;
  points?: Point[];
  areas?: Area[];
}

export const MyMap = ({ className, points, areas }: MapProps) => {
  const { setCurrentLocation, lat, lng, zoom, rotation } = useContext(
    CurrentLocationContext
  );
  const { setMapCenter } = useContext(MapCenterContext)

  const { setLocation } = useLocalStorage();

  const map = useMapEvents({
    zoomend() {
      const zoom = map.getZoom();
      setCurrentLocation({ lat, lng, zoom });
    },
    locationfound(e) {
      const userLocation = e.latlng;
      map.flyTo(e.latlng, zoom);
      setLocation("currentLocation", userLocation);
    },
    click(e) {
      if (
        lat === CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lat &&
        lng === CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lng
      ) {
        const location = e.latlng
        setCurrentLocation({ ...location, zoom });
        setLocation("currentLocation", location);
      }
    },
    drag() {
      const center = map.getCenter()
      setMapCenter(center)
      setLocation("mapCenter", center)
    }
  });

  const API_KEY = import.meta.env.VITE_API_MAPS;

  useEffect(() => {
    map.locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TileLayer
        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
        url={`https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${API_KEY}`}
        id="osm-bright"
        className={className}
      />

      <Cursor zoom={zoom} userLocation={{ lat, lng, rotation }} />
      <Centralize currentPosition={{ lat, lng }} />
      <ZoomControl position="bottomleft" />

      <MapPoints points={points} zoom={zoom} />
      <MapAreas areas={areas} />
    </>
  );
};

export default MyMap;
