import { LatLngExpression } from "leaflet";

export type Point = {
  type: "sanitation" | "courteous" | "trash" | "flood";
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

export interface UserLocation {
  coordinates: LatLngExpression;
  rotation: number;
}
