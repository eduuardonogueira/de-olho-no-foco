import { Marker, Polyline, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { IHostArray } from "../../types/map";

export const Map = ({ hostArray }: { hostArray: IHostArray }) => {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hostArray.length === 0
        ? ""
        : hostArray.map((host) => (
            <Marker position={host.coordinates}>
              <Popup>{host.hostname}</Popup>
              {host.connections.map((link) => (
                <Polyline
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
