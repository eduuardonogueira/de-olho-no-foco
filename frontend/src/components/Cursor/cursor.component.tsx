import styles from "./cursor.module.scss";
import { Circle, Marker } from "react-leaflet";
import { CursorIcon, CursorPointerIcon } from "@assets/icons/index";
import L from "leaflet";
import { useContext } from "react";
import { CurrentLocationContext } from "@contexts/CurrentLocationContext";

export const Cursor = ({ zoom }: { zoom: number }) => {
  const currentLocation = useContext(CurrentLocationContext);
  const iconSize = zoom <= 14 ? 25 : 50;
  const iconRotation =
    currentLocation && currentLocation.rotation ? -currentLocation.rotation : 0;
  const iconSrc = zoom <= 14 ? CursorIcon : CursorPointerIcon;

  const cursorIcon = new L.DivIcon({
    html: `<img src="${iconSrc}" style="transform: rotate(${iconRotation}deg); width: ${iconSize}px; height: ${iconSize}px;" />`,
    iconSize: [iconSize, iconSize],
    className: styles.cursorIcon,
  });

  if (currentLocation) {
    return (
      <div>
        <Marker position={currentLocation} icon={cursorIcon} />
        {zoom <= 15 ? (
          ""
        ) : (
          <Circle
            center={currentLocation}
            pathOptions={{ color: "#fff", fillColor: "#0004FF" }}
            radius={150}
          />
        )}
      </div>
    );
  }
};

export default Cursor;
