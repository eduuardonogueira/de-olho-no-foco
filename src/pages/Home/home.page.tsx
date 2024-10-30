import { Map, Sidebar } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer, Polyline, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { MagnifyingGlass } from "@phosphor-icons/react";

export const Home = () => {
  const map = document.getElementById("mapContainer");
  const [userLocation, setUserLocation] = useState<
    LatLngExpression | undefined
  >();

  navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.latitude);
    setUserLocation([position.coords.latitude, position.coords.longitude]);
  });

  console.log(userLocation);

  return (
    <div className={styles.container}>
      <main className={styles.mapContainer}>
        <section>
          <input type="text" />
          <MagnifyingGlass size={32} weight="bold" />
        </section>
        <MapContainer
          id="mapContainer"
          center={userLocation}
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
