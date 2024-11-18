// import styles from "./myMap.module.scss";
import { useMapEvents, ZoomControl } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Area, Point } from "@customtypes/map";
import { useContext, useEffect } from "react";
import { MapPoints, MapAreas, Centralize, Cursor } from "@components/index";
import { useLocalStorage } from "@hooks/index";
import {
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE,
  CurrentLocationContext,
} from "@contexts/CurrentLocationContext";
import { MapValuesContext } from "@contexts/MapValuesContext";

interface MapProps {
  className?: string;
  points?: Point[];
  areas?: Area[];
}

export const MyMap = ({ className, points, areas }: MapProps) => {
  const { setLocation } = useLocalStorage();

  const { setCurrentLocation, lat, lng } = useContext(CurrentLocationContext);
  const { setMapCenter, setMapZoom } = useContext(MapValuesContext);

  const map = useMapEvents({
    zoomend() {
      setMapZoom(map.getZoom());
    },
    locationfound(e) {
      const userLocation = e.latlng;
      map.flyTo(e.latlng, map.getZoom());
      setLocation("currentLocation", userLocation);
    },
    click(e) {
      if (
        lat === CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lat &&
        lng === CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lng
      ) {
        const location = e.latlng;
        setCurrentLocation(location);
        setLocation("currentLocation", location);
      }
    },
    dragend() {
      const center = map.getCenter();
      setMapCenter(center);
      setLocation("mapCenter", center);
    },
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

      <Cursor zoom={map.getZoom()} />
      <Centralize currentPosition={{ lat, lng }} />
      <ZoomControl position="bottomleft" />

      <MapPoints points={points} zoom={map.getZoom()} />
      <MapAreas areas={areas} />
    </>
  );
};

export default MyMap;
