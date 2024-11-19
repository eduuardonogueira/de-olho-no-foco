import { ReactNode, useEffect, useState } from "react";
import {
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE,
  CurrentLocationContext,
} from "./CurrentLocationContext";
import useUserLocation from "@hooks/useUserLocation";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const CurrentLocationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { getLocation, setLocation } = useLocalStorage();
  const { userLocation } = useUserLocation();

  const [currentLocation, setCurrentLocation] = useState({
    lat: CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lat,
    lng: CURRENT_LOCATION_CONTEXT_INITIAL_STATE.lng,
  });

  useEffect(() => {
    if (userLocation) {
      setCurrentLocation((prev) => ({ ...prev, ...userLocation }));
      setLocation("currentLocation", userLocation);
    } else {
      const location = getLocation("currentLocation");
      location ? setCurrentLocation((prev) => ({ ...prev, ...location })) : "";
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  return (
    <CurrentLocationContext.Provider
      value={{
        ...currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </CurrentLocationContext.Provider>
  );
};
