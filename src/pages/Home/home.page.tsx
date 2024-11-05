import { Menu, MyMap, SearchBar } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useEffect, useState } from "react";
import useUserLocation from "@hooks/useUserLocation";
import { Point } from "@customtypes/map";
import { useApi, useLocalStorage } from "@hooks/index";
import { LatLngExpression } from "leaflet";

export const Home = () => {
  const { getPoints } = useApi();
  const { userLocation } = useUserLocation();
  const { getLocation } = useLocalStorage();
  const [center, setCenter] = useState<LatLngExpression | undefined >(undefined);
  const [points, setPoints] = useState<Point[]>([]);

  async function fetchPoints() {
    try {
      const data = await getPoints();
      setPoints(data);
    } catch (error) {
      console.error(error);
    }
  }

  function getCenterLocation() {
    if (userLocation?.coordinates) {
      console.log(userLocation.coordinates);
      setCenter(userLocation.coordinates);
    } else {
      const location = getLocation("userLocation");
      console.log(center);
      console.log(location);
      setCenter(location || [0, 0]);
      console.log(center);
    }
  }

  useEffect(() => {
    getCenterLocation();
    fetchPoints();
  }, [userLocation]);

  if(!center) return (
    <p>Carregando mapa</p>
  )

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
        <SearchBar />
        <MapContainer
          id="mapContainer"
          center={center}
          zoom={15}
          className={styles.mapContainer}
          zoomControl={false}
        >
          <MyMap className={styles.map} points={points} />
        </MapContainer>
        <Menu />
      </main>
    </div>
  );
};

export default Home;
