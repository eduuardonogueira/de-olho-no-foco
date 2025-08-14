import styles from "./centralize.module.scss";
import { useMapEvents } from "react-leaflet";
import { Gps } from "@phosphor-icons/react";
import { IUserLocation } from "@customtypes/map";
import { useContext } from "react";
import { MapValuesContext } from "@contexts/MapValues/MapValuesContext";

export const Centralize = ({
  currentPosition,
}: {
  currentPosition: IUserLocation | undefined;
}) => {
  const map = useMapEvents({});
  const { setMapCenter } = useContext(MapValuesContext);

  function handleCentralize() {
    if (currentPosition) {
      map.flyTo(currentPosition, 17);
      setMapCenter(currentPosition);
    }
  }

  return (
    <button className={styles.centralize} onClick={handleCentralize}>
      <Gps size={24} />
    </button>
  );
};
