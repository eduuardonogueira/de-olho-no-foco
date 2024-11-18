import { ReactNode, useEffect, useState } from "react";
import {
  MAP_VALUES_CONTEXT_INITIAL_STATE,
  MapValuesContext,
} from "./MapValuesContext";
import { useLocalStorage } from "@hooks/useLocalStorage";
export const MapValuesProvider = ({ children }: { children: ReactNode }) => {
  const { getLocation } = useLocalStorage();

  const [mapZoom, setMapZoom] = useState(MAP_VALUES_CONTEXT_INITIAL_STATE.zoom);
  const [mapCenter, setMapCenter] = useState({
    lat: MAP_VALUES_CONTEXT_INITIAL_STATE.lat,
    lng: MAP_VALUES_CONTEXT_INITIAL_STATE.lng,
  });

  useEffect(() => {
    const lastLocation = getLocation("mapCenter");
    if (lastLocation) {
      setMapCenter(lastLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapValuesContext.Provider
      value={{
        zoom: mapZoom,
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        setMapCenter,
        setMapZoom,
      }}
    >
      {children}
    </MapValuesContext.Provider>
  );
};
