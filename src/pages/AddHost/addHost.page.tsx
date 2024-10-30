import { MapContainer, Polyline, useMapEvents } from "react-leaflet";
import styles from "./addHost.module.scss";
import { Map, Sidebar } from "@components/index";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { IHost } from "@customtypes/index";

const AddHost = () => {
  const [host, setHost] = useState<IHost>();
  const [hostCoordinates, sethostCoordinates] = useState<LatLngExpression>();
  const [drawCoordinates, setDrawCoordinates] = useState<LatLngExpression[]>(
    []
  );
  const [lineColor, setLineColor] = useState({ color: "blue" });

  const map = document.getElementById("mapContainer");

  function DrawFunction() {
    useMapEvents({
      click(e) {
        const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
        setDrawCoordinates((prevLine) => [...prevLine, newPosition]);
      },
      mouseover() {
        if (map) {
          map.style.cursor = "initial";
        }
      },

      drag() {
        if (map) {
          map.style.cursor = "grabbing";
        }
      },

      dragend() {
        if (map) {
          map.style.cursor = "initial";
        }
      },
    });

    return drawCoordinates == null ? null : (
      <Polyline positions={drawCoordinates} pathOptions={lineColor} />
    );
  }

  function handleRemoveLine(beforeLine: number, line: number) {
    setDrawCoordinates((prevLine) => prevLine.slice(beforeLine, line));
  }

  function handleSetColor(color: string) {
    setLineColor({ color: color });
  }

  return (
    <div className={styles.container}>
      <main className={styles.mapContainer}>
        <h1 className={styles.title}>Metrobel</h1>
        <MapContainer
          id="mapContainer"
          center={[-1.4688582141013906, -48.45580618259812]}
          zoom={15}
          style={{ height: 800 }}
        >
          <Map hostArray={[]} />
          <DrawFunction />
        </MapContainer>
      </main>
      <Sidebar
        coordinates={drawCoordinates}
        removeLine={handleRemoveLine}
        setColor={handleSetColor}
      />
    </div>
  );
};

export default AddHost;
