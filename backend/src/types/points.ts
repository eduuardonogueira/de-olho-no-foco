import { ICoordinates } from './coordinates';

export enum EnumPointType {
  SANITATION = 'sanitation',
  COURTEOUS = 'courteous',
  TRASH = 'trash',
  FLOOD = 'flood',
}

export enum EnumPointPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum EnumPointStatus {
  PENDING = 'PEDNING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export type PointStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED';

export type PointPosition = 'left' | 'right';
export type PointType = 'sanitation' | 'courteous' | 'trash' | 'flood';

export interface INearbyPoints {
  id: string;
  type: PointType;
  position: PointPosition;
  coordinates: ICoordinates;
  distance: number;
}
