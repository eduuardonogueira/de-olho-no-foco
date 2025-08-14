import cn from "classnames";
import styles from "./mapPoints.module.scss";
import { IMapPoint, Report } from "@customtypes/index";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import {
  CourteousIcon,
  CourteousShortIcon,
  FloodIcon,
  FloodShortIcon,
  TrashIcon,
  TrashShortIcon,
  SanitationIcon,
  SanitationShortIcon,
} from "@assets/icons";
import { useRef, useState } from "react";
import { useReports } from "@hooks/index";
import MapDetails from "./mapDetails.component";
import { Modal } from "antd";

const PointIcons: Record<string, string> = {
  sanitation: SanitationIcon,
  courteous: CourteousIcon,
  trash: TrashIcon,
  flood: FloodIcon,
};

const PointShortIcons: Record<string, string> = {
  sanitation: SanitationShortIcon,
  courteous: CourteousShortIcon,
  trash: TrashShortIcon,
  flood: FloodShortIcon,
};

type AnimatablePoint = IMapPoint & { animate?: boolean };

export const MapPoints = ({
  points,
  zoom,
}: {
  points?: AnimatablePoint[];
  zoom: number;
}) => {
  const [renderedPointIds, setRenderedPointIds] = useState<Set<string>>(
    new Set()
  );

  const { translateType } = useReports();

  const [mapDetailsModalIsOpen, setMapDetailsModalIsOpen] = useState(false);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  const markerRefs = useRef<Record<string, L.Marker>>({});

  const handleCloseMapDetailsModal = () => setMapDetailsModalIsOpen(false);
  const handleOpenMapDetailsModal = (pointId: string) => {
    setMapDetailsModalIsOpen(true);
    setSelectedPointId(pointId);
  };

  if (points && points.length > 0) {
    return (
      <>
        {points.map((point) => {
          const isNewPoint = !renderedPointIds.has(point.id ?? "");

          if (isNewPoint) {
            setRenderedPointIds((prev) => new Set(prev).add(point.id ?? ""));
          }

          const divIcon = (type: Report, zoom: number) => {
            const iconUrl =
              zoom <= 13 ? PointShortIcons[type] : PointIcons[type];
            const size = zoom <= 13 ? 20 : 40;

            return new L.DivIcon({
              className: styles.pointMarker,
              html: `<img class="${cn({
                [styles.pointImage]: point.animate,
              })}" src="${iconUrl}" width="${size}" height="${size}" />`,
              iconAnchor: [zoom <= 13 ? size / 2 : 0, size],
            });
          };

          return (
            <Marker
              key={point.id}
              position={point.coordinates}
              icon={divIcon(point.type, zoom)}
              ref={(ref) => {
                if (ref && point.id) {
                  markerRefs.current[point.id] = ref;
                }
              }}
              eventHandlers={{
                click: () => handleOpenMapDetailsModal(point.id),
              }}
            >
              <Tooltip direction="left">{translateType(point.type)}</Tooltip>
            </Marker>
          );
        })}

        <Modal
          open={mapDetailsModalIsOpen}
          onCancel={handleCloseMapDetailsModal}
          className={styles.mapDetailsModal}
          footer={false}
          destroyOnClose
          centered
        >
          {selectedPointId && (
            <MapDetails
              pointId={selectedPointId}
              setModalIsOpen={setMapDetailsModalIsOpen}
            />
          )}
        </Modal>
      </>
    );
  }
};
