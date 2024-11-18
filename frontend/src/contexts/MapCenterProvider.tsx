import { ReactNode, useEffect, useState } from "react";
import {
  MAP_CENTER_CONTEXT_INITIAL_STATE,
  MapCenterContext,
} from "./MapCenterContext";
import { useLocalStorage } from "@hooks/useLocalStorage";
export const MapCenterProvider = ({ children }: { children: ReactNode }) => {
  const { getLocation } = useLocalStorage();

  const [mapCenter, setMapCenter] = useState({
    lat: MAP_CENTER_CONTEXT_INITIAL_STATE.lat,
    lng: MAP_CENTER_CONTEXT_INITIAL_STATE.lng,
  });

  useEffect(() => {
    const lastLocation = getLocation("mapCenter")
    if(lastLocation) {
      setMapCenter(lastLocation)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapCenterContext.Provider
      value={{
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        setMapCenter,
      }}
    >
      {children}
    </MapCenterContext.Provider>
  );
};
