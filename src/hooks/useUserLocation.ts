import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
            },
            (error) => console.error("Erro ao obter localização atual:", error),
            {
              enableHighAccuracy: true,
              timeout: 5000,
            }
          );
        },
        { enableHighAccuracy: true, maximumAge: 100000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocalização não é suportada pelo navegador.");
    }
  }, []);

  return { userLocation };
};

export default useUserLocation;
