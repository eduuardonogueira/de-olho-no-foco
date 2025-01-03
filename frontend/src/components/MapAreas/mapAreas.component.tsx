import { Area } from "@customtypes/map";
import { Polyline } from "react-leaflet";

export const MapAreas = ({ areas }: { areas?: Area[] }) => {
  if (areas && areas.length > 0) {
    return (
      <>
        {areas.map((area, index) => (
          <Polyline
            key={index}
            positions={area.coordinates}
            pathOptions={area.pathOptions}
          />
        ))}
      </>
    );
  }
};
