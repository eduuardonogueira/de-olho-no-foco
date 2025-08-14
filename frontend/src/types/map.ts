import { RcFile } from "antd/es/upload";
import { LatLngExpression } from "leaflet";

export enum EnumPointStatus {
  PENDING,
  APPROVED,
  IN_PROGRESS,
  RESOLVED,
  REJECTED,
}

export type PointPosition = "left" | "right";

export interface ICreatePoint {
  type: Report;
  position: PointPosition;
  coordinates: ICoordinates;
  title: string;
  description?: string;
  isAnonymous?: boolean;
  images?: RcFile[];
}

export interface IPoint {
  id: string;
  type: Report;
  position?: PointPosition;
  images?: string[];
  title: string;
  status: EnumPointStatus;
  description: string;
  isActive: boolean;
  isAnonymous: boolean;
  coordinates: ICoordinates;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IMapPoint {
  id: string;
  type: Report;
  position?: "left" | "right";
  coordinates: ICoordinates;
}

export interface ICoordinates {
  lat: number;
  lng: number;
  alt?: number;
  rotation?: number;
}

export interface IArea {
  type: string;
  coordinates: LatLngExpression[];
  pathOptions: {
    fillColor: string;
    color: string;
  };
}

export interface IUserLocation extends ICoordinates {}

export interface IListReport {
  image: string;
  type: Report;
  label: string;
}

export type Report = "sanitation" | "courteous" | "trash" | "flood";
