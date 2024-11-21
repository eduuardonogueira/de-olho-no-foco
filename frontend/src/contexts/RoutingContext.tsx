import { LatLng, Map } from "leaflet";
import { createContext } from "react";
import L from "leaflet";

export type SetLatLng = React.Dispatch<React.SetStateAction<LatLng | null>>;
export type SetMapInstance = React.Dispatch<React.SetStateAction<Map | null>>;
export type SetRoutingMachine = React.Dispatch<
  React.SetStateAction<L.Routing.Control | null>
>;

export interface IRoutingContextProps {
  mapInstance: Map | null;
  start: LatLng | null;
  end: LatLng | null;
  routingMachine: L.Routing.Control | null;
  setStart: SetLatLng;
  setEnd: SetLatLng;
  setMapInstance: SetMapInstance;
  setRoutingMachine: SetRoutingMachine;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTING_CONTEXT_INITIAL_STATE: IRoutingContextProps = {
  mapInstance: null,
  start: null,
  end: null,
  routingMachine: null,
  setStart: () => {},
  setEnd: () => {},
  setMapInstance: () => {},
  setRoutingMachine: () => {},
};

export const RoutingContext = createContext(ROUTING_CONTEXT_INITIAL_STATE);
