import styles from "./mapPoints.module.scss";
import { Point } from "@customtypes/map";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import {
  CourteusIcon,
  CourteusShortIcon,
  FloodIcon,
  FloodShortIcon,
  TrashIcon,
  TrashShortIcon,
  SanitationIcon,
  SanitationShortIcon,
} from "@assets/icons";

const PointIcons: Record<string, string> = {
  sanitation: SanitationIcon,
  courteous: CourteusIcon,
  trash: TrashIcon,
  flood: FloodIcon,
};

const PointShortIcons: Record<string, string> = {
  sanitation: SanitationShortIcon,
  courteous: CourteusShortIcon,
  trash: TrashShortIcon,
  flood: FloodShortIcon,
};

export const MapPoints = ({
  points,
  zoom,
}: {
  points?: Point[];
  zoom: number;
}) => {
  if (points && points.length > 0) {
    return (
      <>
        {points.map((point) => {
          const pinIcon = new L.Icon({
            iconUrl: PointIcons[point.type],
            iconAnchor: [0, 40],
            iconSize: [40, 40],
          });

          const pinShortIcon = new L.Icon({
            iconUrl: PointShortIcons[point.type],
            iconSize: [20, 20],
            iconAnchor: [10, 20],
          });

          const createdAt = point.createdAt.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          return (
            <Marker
              position={point.coordinates}
              key={point.id}
              icon={zoom <= 14 ? pinShortIcon : pinIcon}
            >
              <Tooltip>{point.type}</Tooltip>
              <Popup>
                <h1 className={styles.pointTitle}>{point.type}</h1>
                <p>{`descrição: ${point.description}`}</p>
                <p>{`criado em: ${createdAt}`}</p>
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  }
};
