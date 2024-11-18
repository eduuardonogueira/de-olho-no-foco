import styles from "./cursor.module.scss";
import { UserLocation } from "@customtypes/map";
import { Circle, Marker } from "react-leaflet";
import { CursorIcon, CursorPointerIcon } from "@assets/icons/index";
import L from "leaflet";

export const Cursor = ({
  userLocation,
  zoom,
}: {
  userLocation?: UserLocation;
  zoom: number;
}) => {
  const iconSize = zoom <= 14 ? 25 : 50;
  const iconRotation =
    userLocation && userLocation.rotation ? -userLocation.rotation : 0;
  const iconSrc = zoom <= 14 ? CursorIcon : CursorPointerIcon;

  const cursorIcon = new L.DivIcon({
    html: `<img src="${iconSrc}" style="transform: rotate(${iconRotation}deg); width: ${iconSize}px; height: ${iconSize}px;" />`,
    iconSize: [iconSize, iconSize],
    className: styles.cursorIcon,
  });

  if (userLocation) {
    return (
      <div>
        <Marker position={userLocation} icon={cursorIcon} />
        {zoom <= 15 ? (
          ""
        ) : (
          <Circle
            center={userLocation}
            pathOptions={{ color: "#fff", fillColor: "#0004FF" }}
            radius={150}
          />
        )}
      </div>
    );
  }
};

export default Cursor;
