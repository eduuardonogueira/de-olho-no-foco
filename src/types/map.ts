import { LatLngExpression } from "leaflet";

export type IHost = {
    hostname: string;
    coordinates: LatLngExpression;
    description: string;
    connections: {
      fiberCoordinates: LatLngExpression[];
      fiberOptions: { color: string };
    }[];
};

export type IHostDb = {
  host: IHost
}
