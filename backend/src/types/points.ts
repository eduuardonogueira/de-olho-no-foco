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

export type PointPosition = 'left' | 'right';
export type PointType = 'sanitation' | 'courteous' | 'trash' | 'flood';

export interface INearbyPoints {
  id: string;
  type: PointType;
  position: PointPosition;
  coordinates: ICoordinates;
  distance: number;
}
