import { Point } from "@customtypes/map";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import {
  CutTreeIcon,
  FloodIcon,
  GarbageBagIcon,
  SanitationIcon,
} from "@assets/icons";

const PointIcons: Record<string, string> = {
  sanitation: SanitationIcon,
  courteous: CutTreeIcon,
  trash: GarbageBagIcon,
  flood: FloodIcon,
};

export const MapPoints = ({ points }: { points?: Point[] }) => {
  return (
    <>
      {!points || points.length === 0
        ? ""
        : points.map((point) => {
            const iconUrl = PointIcons[point.type];
            const pinIcon = new L.Icon({
              iconUrl: iconUrl,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
            });

            return (
              <Marker
                position={point.coordinates}
                key={`${point.type}-${point.coordinates}`}
                icon={pinIcon}
              >
                <Popup>
                  {point.type}
                  <Tooltip>{point.description}</Tooltip>
                  <Tooltip>{point.createdAt.toISOString()}</Tooltip>
                </Popup>
              </Marker>
            );
          })}
    </>
  );
};
