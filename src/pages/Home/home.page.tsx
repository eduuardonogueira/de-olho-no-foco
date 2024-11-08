import { Menu, MyMap, SearchBar } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useEffect, useState } from "react";
import useUserLocation from "@hooks/useUserLocation";
import { Point } from "@customtypes/map";
import { useApi } from "@hooks/index";

export const Home = () => {
  const { getPoints } = useApi();
  const { userLocation } = useUserLocation();

  const [points, setPoints] = useState<Point[]>([]);

  async function fetchPoints() {
    try {
      const data = await getPoints();
      setPoints(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
        <SearchBar />
        <MapContainer
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
          <MyMap className={styles.map} points={points} />
        </MapContainer>
        <Menu />
      </main>
    </div>
  );
};

export default Home;
