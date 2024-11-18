import styles from "./areas.module.scss";
import { Menu, MyMap, SearchBar } from "@components/index";
import { MapContainer } from "react-leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { LatLngExpression, Map as TypeMap } from "leaflet";
import { CurrentLocationContext } from "@contexts/CurrentLocationContext";

export const Areas = () => {
  const mapRef: React.LegacyRef<TypeMap> | undefined = useRef(null);
  // const map = document.getElementById("mapContainer");

  const [center, setCenter] = useState<LatLngExpression>();
  const currentLocation = useContext(CurrentLocationContext);

  useEffect(() => {
    setCenter(currentLocation)
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
        {center ? (
          <MapContainer
            ref={mapRef}
            id="mapContainer"
            center={center}
            zoom={15}
            className={styles.mapContainer}
            zoomControl={false}
          >
            <MyMap className={styles.map} />
          </MapContainer>
        ) : (
          ""
        )}
        <Menu />
      </main>
    </div>
  );
};

export default Areas;
