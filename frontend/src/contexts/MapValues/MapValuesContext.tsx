import { ICoordinates } from "@customtypes/map";
import { createContext } from "react";

export type SetMapCenterType = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => void;

export type SetMapZoomType = (zoom: number) => void;

export interface IMapValuesContextProps extends ICoordinates {
  zoom: number;
  setMapCenter: SetMapCenterType;
  setMapZoom: SetMapZoomType;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MAP_VALUES_CONTEXT_INITIAL_STATE: IMapValuesContextProps = {
  setMapZoom: () => {},
  setMapCenter: () => {},
  lat: -1.4184647000387454,
  lng: -48.462753295898445,
  zoom: 15,
};

export const MapValuesContext = createContext(MAP_VALUES_CONTEXT_INITIAL_STATE);
