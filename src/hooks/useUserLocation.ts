import { UserLocation } from "@customtypes/map";
import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>();

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha } = event;
      if (alpha !== null) {
        setUserLocation((prevLocation) =>
          prevLocation ? { ...prevLocation, rotation: alpha } : null
        );
      }
    };

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation((prevLocation) => ({
            coordinates: [latitude, longitude],
            rotation: prevLocation?.rotation || 0,
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
  }, []);

  return { userLocation };
};

export default useUserLocation;
