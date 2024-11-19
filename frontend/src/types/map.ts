import { LatLngExpression } from "leaflet";

export interface CreatePoint {
  type: Report;
  position: "left" | "right";
  coordinates: Coordinates;
  description: string;
}

export interface Point {
  id?: string;
  type: Report;
  position?: "left" | "right";
  coordinates: Coordinates;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  description: string;
  createdAt: Date;
}

export interface Coordinates {
  lat: number;
  lng: number;
  alt?: number;
  rotation?: number;
}

export interface Area {
  type: string;
  coordinates: LatLngExpression[];
  pathOptions: {
    fillColor: string;
    color: string;
  };
}

export interface UserLocation extends Coordinates {}

export interface HomeReport {
  image: string;
  type: Report;
  label: string;
}

export type Report = "sanitation" | "courteous" | "trash" | "flood";
