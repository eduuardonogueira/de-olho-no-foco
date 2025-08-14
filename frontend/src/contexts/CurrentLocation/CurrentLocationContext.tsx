import { ICoordinates } from "@customtypes/map";
import { createContext } from "react";

export type SetCurrentLocationType = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => void;

export interface ICurrentLocationContextProps extends ICoordinates {}

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
  };

export const CurrentLocationContext = createContext(
  CURRENT_LOCATION_CONTEXT_INITIAL_STATE
);
