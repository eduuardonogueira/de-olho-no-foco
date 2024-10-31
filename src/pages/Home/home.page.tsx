import { Map } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useEffect, useRef, useState, MutableRefObject } from "react";
import { LatLngExpression, Map as TypeMap } from "leaflet";
import { MagnifyingGlass } from "@phosphor-icons/react";

export const Home = () => {
  const mapRef: React.LegacyRef<TypeMap> | undefined = useRef(null);
  const map = document.getElementById("mapContainer");
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const location: LatLngExpression = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(location);
          
          // Centralizar o mapa
          if (mapRef.current) {
            mapRef.current.flyTo(location, 15);
          }
        },
        (error) => console.error("Erro ao obter localização:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mapContainer}>
        <section>
          <input type="text" />
          <MagnifyingGlass size={32} weight="bold" />
        </section>
        <MapContainer
          ref={mapRef}
          id="mapContainer"
          center={userLocation || [0, 0]}
          zoom={15}
          style={{ height: 800 }}
        >
          <Map />
        </MapContainer>
      </main>
    </div>
  );
};

export default Home;
