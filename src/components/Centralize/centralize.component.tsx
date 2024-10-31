import styles from './centralize.module.scss'
import { useMapEvents } from "react-leaflet";
import { Gps } from "@phosphor-icons/react";
import { LatLngExpression } from 'leaflet';

export const Centralize = ({currentPosition}: {currentPosition: LatLngExpression | undefined}) => {

  const map = useMapEvents({});

  function handleCentralize() {
    if(currentPosition) {
      map.flyTo(currentPosition, map.getZoom())
    }
  }

  return (
    <button className={styles.centralize} onClick={handleCentralize}>
      <Gps size={32} />
    </button>
  )
}