import { Map } from "@components/index";
import styles from "./home.module.scss";
import { IHostArray } from "../../types/map";
import { MapContainer, Polyline, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

export const Home = () => {
  const hostsArray: IHostArray = [
    {
      hostname: "UFRA",
      coordinates: [-1.4752083704157242, -48.45592221201885],
      connections: [
        {
          fiberCoordinates: [
            [-1.4752083704157242, -48.45592221201885],
            [-1.4755741170765255, -48.45575104445286],
            [-1.4755210296583634, -48.45543051767683],
            [-1.475411062857627, -48.45480843018389],
            [-1.4746644791586079, -48.45514680313697],
            [-1.474289333920556, -48.455316388062485],
            [-1.4738293723510079, -48.45539307370553],
            [-1.4725081097048407, -48.45496002540835],
            [-1.4728012226395573, -48.45408941784694],
            [-1.4727110340463287, -48.45269554364038],
            [-1.4724043928020394, -48.45181140336697],
            [-1.471047053812838, -48.45056187852246],
            [-1.4709343179942374, -48.450453616428085],
            [-1.466938956426038, -48.4482522875333],
            [-1.460616710529368, -48.44486007578157],
            [-1.4602758454992721, -48.44467867124539],
            [-1.4596430496725152, -48.444474823354284],
            [-1.4592368170628116, -48.44444507112658],
            [-1.458709943588511, -48.44444586285419],
            [-1.458709943588511, -48.44444586285419],
            [-1.4578143759259592, -48.44469799050851],
            [-1.457181579390193, -48.44507886419822],
            [-1.4562270215794177, -48.44564749251522],
            [-1.4552349245536798, -48.44607128154555],
          ],
          fiberOptions: { color: "blue" },
        },
      ],
    },
  ];

  function DrawFunction() {
    const [position, setPosition] = useState<LatLngExpression[]>([]);
    useMapEvents({
      click(e) {
        const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
        if (position) {
          setPosition((prevLine) => [...prevLine, newPosition]);
        }
      },
    });

    return position === null ? null : (
      <Polyline positions={position} pathOptions={{ color: "blue" }} />
    );
  }

  return (
    <section>
      <h1 className={styles.title}>Metrobel</h1>
      <MapContainer
        center={[-1.4688582141013906, -48.45580618259812]}
        zoom={15}
        // scrollWheelZoom={false}
        style={{ height: 800 }}
      >
        <Map hostArray={hostsArray} />
        <DrawFunction />
      </MapContainer>
    </section>
  );
};

export default Home;
