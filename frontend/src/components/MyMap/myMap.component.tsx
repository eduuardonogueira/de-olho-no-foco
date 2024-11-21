// import styles from "./myMap.module.scss";
import "@assets/css/map.css";
import { useMapEvents, ZoomControl } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Area, Point } from "@customtypes/map";
import { useContext, useEffect, useRef } from "react";
import {
  MapPoints,
  MapAreas,
  Centralize,
  Cursor,
  CancelRoute,
} from "@components/index";
import { useLocalStorage } from "@hooks/index";
import {
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE,
  CurrentLocationContext,
} from "@contexts/CurrentLocationContext";

import { MapValuesContext } from "@contexts/MapValuesContext";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { RoutingContext } from "@contexts/RoutingContext";

// import "leaflet.locatecontrol";
// import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
// import { LocateControl } from "leaflet.locatecontrol";

interface MapProps {
  className?: string;
  points?: Point[];
  areas?: Area[];
}

export const MyMap = ({ className, points, areas }: MapProps) => {
  const { setLocation } = useLocalStorage();

  const { setCurrentLocation, lat, lng } = useContext(CurrentLocationContext);
  const { setMapCenter, setMapZoom } = useContext(MapValuesContext);
  const {
    mapInstance,
    start,
    setStart,
    end,
    routingMachine,
    setRoutingMachine,
  } = useContext(RoutingContext);

  const map = useMapEvents({
    zoomend() {
      setMapZoom(map.getZoom());
    },
    locationfound(e) {
      const userLocation = e.latlng;
      map.flyTo(userLocation, map.getZoom());
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

  // Save routing machine instance to state here:

  // Routing machine ref
  const RoutingMachineRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    console.log(end);
    setStart(new L.LatLng(lat, lng));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  useEffect(() => {
    console.log(start);
    if (!mapInstance) return;
    if (mapInstance) {
      RoutingMachineRef.current = L.Routing.control({
        lineOptions: {
          styles: [
            {
              color: "#34c759",
              stroke: true,
              weight: 4,
            },
          ],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        waypoints: [start!, end!],
      });
      setRoutingMachine(RoutingMachineRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance]);

  useEffect(() => {
    if (routingMachine && mapInstance && end) {
      routingMachine.addTo(mapInstance);
      routingMachine.setWaypoints([start!, end!]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routingMachine, start, end]);

  useEffect(() => {
    map.locate();
    // new LocateControl().addTo(map);
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

      <CancelRoute />
      <Cursor zoom={map.getZoom()} />
      <Centralize currentPosition={{ lat, lng }} />
      <ZoomControl position="bottomleft" />

      <MapPoints points={points} zoom={map.getZoom()} />
      <MapAreas areas={areas} />
    </>
  );
};

export default MyMap;
