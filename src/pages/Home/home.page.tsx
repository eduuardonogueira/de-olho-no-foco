import {
  Menu,
  MyMap,
  SearchBar,
  CreateButton,
  Loader,
} from "@components/index";
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
  const [openModal, setOpenModal] = useState<boolean>();
  const [center, setCenter] = useState<LatLngExpression>();
  const [points, setPoints] = useState<Point[]>([]);

  console.log(openModal);

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
      setCenter(userLocation.coordinates);
    } else {
      const location = getLocation("userLocation");
      setCenter(location);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getCenterLocation();
      fetchPoints();
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
        <SearchBar />
        {center ? (
          <MapContainer
            id="mapContainer"
            center={center}
            zoom={15}
            className={styles.mapContainer}
            zoomControl={false}
          >
            <MyMap className={styles.map} points={points} />
            <CreateButton setOpenModal={setOpenModal} />
          </MapContainer>
        ) : (
          <Loader text={"Carregando Mapa"} />
        )}
        <Menu />
      </main>
    </div>
  );
};

export default Home;
