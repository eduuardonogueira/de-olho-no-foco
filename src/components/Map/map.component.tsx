import styles from "./map.module.scss";
import { Marker, Polyline, Popup, Tooltip } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { IHost } from "@customtypes/map";
import pinSvg from "@assets/icons/pin.svg";
import L from "leaflet";

const pinIcon = new L.Icon({
  iconUrl: pinSvg,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export const Map = ({ hostArray }: { hostArray?: IHost[] }) => {
  if (!hostArray || hostArray.length === 0) {
    return (
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    );
  }

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hostArray.length === 0
        ? ""
        : hostArray.map((host) => (
            <Marker
              position={host.coordinates}
              key={host.hostname}
              icon={pinIcon}
            >
              <Popup>
                {host.hostname}
                <Tooltip>{host.description}</Tooltip>
              </Popup>

              {host.connections.map((link, id) => (
                <Polyline
                  key={id}
                  positions={link.fiberCoordinates}
                  pathOptions={link.fiberOptions}
                />
              ))}
            </Marker>
          ))}
    </>
  );
};

export default Map;
