import { IArea } from "@customtypes/map";
import { Polyline } from "react-leaflet";

export const MapAreas = ({ areas }: { areas?: IArea[] }) => {
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
