import { IUserLocation } from "@customtypes/map";
import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<IUserLocation | undefined>();

  function getUserLocation() {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setUserLocation((prevLocation: IUserLocation | undefined) =>
          prevLocation ? { ...prevLocation, rotation: alpha } : undefined
        );
      }
    };

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation((prevLocation: IUserLocation | undefined) => ({
            ...prevLocation,
            lat: latitude,
            lng: longitude,
          }));
        },
        (error) => console.error("Erro ao obter localização:", error),
        { enableHighAccuracy: true, maximumAge: 100000, timeout: 5000 }
      );

      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        navigator.geolocation.clearWatch(watchId);
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    } else {
      console.error("Geolocalização não é suportada pelo navegador.");
    }
  }

  useEffect(getUserLocation, []);

  return { userLocation, getUserLocation };
};

export default useUserLocation;
