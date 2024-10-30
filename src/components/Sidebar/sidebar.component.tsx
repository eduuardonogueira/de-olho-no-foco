import { LatLngExpression } from "leaflet";
import styles from "./sidebar.module.scss";
import { Minus } from "@phosphor-icons/react";

interface IListCoordinates {
  coordinates?: LatLngExpression[];
  removeLine: (beforeLine: number, line: number) => void;
}

interface ISidebar {
  coordinates?: LatLngExpression[];
  removeLine: (beforeLine: number, line: number) => void;
  setColor: (color: string) => void;
}

const ListCoordinates = ({ coordinates, removeLine }: IListCoordinates) => {
  function handleRemoveLine(line: number) {
    const beforeLine = line === 0 ? -1 : 0;
    removeLine(beforeLine, line);
  }

  return coordinates?.length !== 0 ? (
    <ul className={styles.coordinates}>
      {coordinates?.map((latLng: LatLngExpression, id) => (
        <li className={styles.line} key={id}>
          <span>{id + 1}</span>
          <span key={id}>{latLng.toString()}</span>
          <button
            className={styles.removeButton}
            key={`button${id}`}
            onClick={() => handleRemoveLine(id)}
          >
            <Minus />
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <span>Desenhe para listar as coordenadas aqui</span>
  );
};

export const Sidebar = ({ coordinates, removeLine, setColor }: ISidebar) => {
  function handleSetColor(color: string) {
    setColor(color);
  }

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Tools</h1>

      <section className={styles.tools}>
        <div className={styles.coordinatesWrapper}>
          <h3 className={styles.coordinatesTitle}>Coordinates:</h3>
          <ListCoordinates coordinates={coordinates} removeLine={removeLine} />
        </div>

        <div className={styles.lineColorWrapper}>
          <input
            type="color"
            onChange={(e) => handleSetColor(e.target.value)}
          />
        </div>
      </section>

      <button>Done</button>
    </aside>
  );
};

export default Sidebar;
