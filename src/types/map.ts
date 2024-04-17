import { LatLngExpression } from "leaflet";


export type IHostArray = {
    hostname: string;
    coordinates: LatLngExpression;
    connections: {
      fiberCoordinates: LatLngExpression[];
      fiberOptions: { color: string };
    }[];
}[];
