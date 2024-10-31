import { Menu, MyMap, SearchBar } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { Map as TypeMap } from "leaflet";
import useUserLocation from "@hooks/useUserLocation";

export const Home = () => {
  const mapRef: React.LegacyRef<TypeMap> | undefined = useRef(null);
  // const map = document.getElementById("mapContainer");

  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo(userLocation.coordinates, 15);
    }
  }, [mapRef.current]);

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
        <SearchBar />
        <MapContainer
          ref={mapRef}
          id="mapContainer"
          center={
            userLocation?.coordinates || [
              -1.4548981866300403, -48.44616551421902,
            ]
          }
          zoom={15}
          className={styles.mapContainer}
          zoomControl={false}
        >
          <MyMap className={styles.map} />
        </MapContainer>
        <Menu />
      </main>
    </div>
  );
};

export default Home;
