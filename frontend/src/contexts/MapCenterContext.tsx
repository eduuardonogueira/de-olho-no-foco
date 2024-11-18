import { Coordinates } from "@customtypes/map";
import { createContext } from "react";

export type SetMapCenterType = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => void;

export interface IMapCenterContextProps extends Coordinates {
  setMapCenter: SetMapCenterType
}

// eslint-disable-next-line react-refresh/only-export-components
export const MAP_CENTER_CONTEXT_INITIAL_STATE: IMapCenterContextProps =
  {
    setMapCenter: () => {},
    lat: -1.4184647000387454,
    lng: -48.462753295898445,
  };

export const MapCenterContext = createContext(
  MAP_CENTER_CONTEXT_INITIAL_STATE
);
