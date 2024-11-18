import styles from "./centralize.module.scss";
import { useMapEvents } from "react-leaflet";
import { Gps } from "@phosphor-icons/react";
import { UserLocation } from "@customtypes/map";
import { useContext } from "react";
import { MapValuesContext } from "@contexts/MapValuesContext";

export const Centralize = ({
  currentPosition,
}: {
  currentPosition: UserLocation | undefined;
}) => {
  const map = useMapEvents({});
  const { setMapCenter } = useContext(MapValuesContext);

  function handleCentralize() {
    if (currentPosition) {
      map.flyTo(currentPosition, map.getZoom());
      setMapCenter(currentPosition);
    }
  }

  return (
    <button className={styles.centralize} onClick={handleCentralize}>
      <Gps size={24} />
    </button>
  );
};
