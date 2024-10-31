import { Icon, LatLngExpression } from "leaflet";

export type Point = {
  type: string;
  icon: Icon;
  coordinates: LatLngExpression;
  description: string;
  createdAt: Date;
};

export type Area = {
  type: string;
  coordinates: LatLngExpression[];
  pathOptions: {
    fillColor: string;
    color: string;
  };
};
