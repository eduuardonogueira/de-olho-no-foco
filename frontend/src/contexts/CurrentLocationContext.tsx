import { Coordinates } from "@customtypes/map";
import { createContext } from "react";

export type SetCurrentLocationType = ({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) => void;

export interface ICurrentLocationContextProps extends Coordinates {
  zoom: number;
}

export interface ICurrentLocationContextState
  extends ICurrentLocationContextProps {
  setCurrentLocation: SetCurrentLocationType;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CURRENT_LOCATION_CONTEXT_INITIAL_STATE: ICurrentLocationContextState =
  {
    setCurrentLocation: () => {},
    lat: -1.4184647000387454,
    lng: -48.462753295898445,
    zoom: 10,
  };

export const CurrentLocationContext = createContext(
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE
);
