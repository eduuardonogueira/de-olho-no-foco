import { ReactNode, useState } from "react";
import {
  ROUTING_CONTEXT_INITIAL_STATE,
  RoutingContext,
} from "./RoutingContext";
import L from "leaflet";

export const RoutingProvider = ({ children }: { children: ReactNode }) => {
  const [mapInstance, setMapInstance] = useState(
    ROUTING_CONTEXT_INITIAL_STATE.mapInstance
  );
  const [start, setStart] = useState(ROUTING_CONTEXT_INITIAL_STATE.start);
  const [end, setEnd] = useState(ROUTING_CONTEXT_INITIAL_STATE.end);
  const [routingMachine, setRoutingMachine] =
    useState<L.Routing.Control | null>(null);

  return (
    <RoutingContext.Provider
      value={{
        routingMachine,
        mapInstance,
        start,
        end,
        setEnd,
        setStart,
        setMapInstance,
        setRoutingMachine,
      }}
    >
      {children}
    </RoutingContext.Provider>
  );
};
