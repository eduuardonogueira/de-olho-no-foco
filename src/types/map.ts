import { LatLngExpression } from "leaflet";

export type Point = {
  type: Report;
  coordinates: LatLngExpression;
  description: string;
  createdAt: Date;
};

export type CreatePoint = {
  type: Report;
  coordinates: LatLngExpression;
  description: string;
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

export interface HomeReport {
  image: string;
  type: Report;
  label: string;
}

export type Report = "sanitation" | "courteous" | "trash" | "flood";
