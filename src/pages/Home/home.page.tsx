import { Menu, MyMap, SearchBar } from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useEffect, useRef } from "react";
import { Map as TypeMap } from "leaflet";
import useUserLocation from "@hooks/useUserLocation";
import { Point } from "@customtypes/map";

const points: Point[] = [
  {
    type: "sanitation",
    coordinates: [-1.3680755834664953, -48.47771036265044],
    description: "Aqui tem muito problema de Agua",
    createdAt: new Date(),
  },
  {
    type: "courteous",
    coordinates: [-1.3630648201222184, -48.4761319362582],
    description: "Aqui tem muito problema de Agua",
    createdAt: new Date(),
  },
  {
    type: "trash",
    coordinates: [-1.3664976090582104, -48.474276597540516],
    description: "Aqui tem muito problema de Agua",
    createdAt: new Date(),
  },
  {
    type: "flood",
    coordinates: [-1.3630021006720876, -48.479374437919674],
    description: "Aqui tem muito problema de Agua",
    createdAt: new Date(),
  },
  {
    type: "flood",
    coordinates: [-1.3614410821963085, -48.47320288283111],
    description: "Aqui tem muito problema de Agua",
    createdAt: new Date(),
  },
];

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
          <MyMap className={styles.map} points={points}/>
        </MapContainer>
        <Menu />
      </main>
    </div>
  );
};

export default Home;
