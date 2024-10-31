import styles from "./areas.module.scss";
import { Menu, MyMap, SearchBar } from "@components/index";
import { MapContainer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { LatLngExpression, Map as TypeMap } from "leaflet";

export const Areas = () => {
  const mapRef: React.LegacyRef<TypeMap> | undefined = useRef(null);
  // const map = document.getElementById("mapContainer");
  const [mainLocation, setMainLocation] = useState<
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
          setMainLocation(location);

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

  // const [drawCoordinates, setDrawCoordinates] = useState<LatLngExpression[]>(
  //   []
  // );
  // const [lineColor, setLineColor] = useState({ color: "blue" });


  // function DrawFunction() {
  //   useMapEvents({
  //     click(e) {
  //       const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
  //       setDrawCoordinates((prevLine) => [...prevLine, newPosition]);
  //     },
  //     mouseover() {
  //       if (map) {
  //         map.style.cursor = "initial";
  //       }
  //     },

  //     drag() {
  //       if (map) {
  //         map.style.cursor = "grabbing";
  //       }
  //     },

  //     dragend() {
  //       if (map) {
  //         map.style.cursor = "initial";
  //       }
  //     },
  //   });

  //   return drawCoordinates == null ? null : (
  //     <Polyline positions={drawCoordinates} pathOptions={lineColor} />
  //   );
  // }

  // function handleRemoveLine(beforeLine: number, line: number) {
  //   setDrawCoordinates((prevLine) => prevLine.slice(beforeLine, line));
  // }

  // function handleSetColor(color: string) {
  //   setLineColor({ color: color });
  // }

  return (
    <div className={styles.container}>
      <main className={styles.areasContainer}>
        <SearchBar />
        <MapContainer
          ref={mapRef}
          id="mapContainer"
          center={mainLocation || [-1.4548981866300403, -48.44616551421902]}
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

export default Areas;
