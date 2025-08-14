import {
  MyMap,
  SearchBar,
  CreateButton,
  Loader,
  MapPin,
  ReportSteps,
} from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { IMapPoint } from "@customtypes/index";
import { useApi, useLocalStorage } from "@hooks/index";
import { LatLngExpression, Map } from "leaflet";
import { Modal, Button, Divider } from "antd";
import {
  AlertContext,
  CurrentLocationContext,
  MapValuesContext,
  RoutingContext,
} from "@contexts/index";

export const Home = () => {
  const currentLocation = useContext(CurrentLocationContext);
  const mapCenter = useContext(MapValuesContext);
  const { setMapInstance } = useContext(RoutingContext);
  const { setAlert } = useContext(AlertContext);

  const { getPointsNearby } = useApi();
  const { getLocalPoints, updateLocalPoints } = useLocalStorage();

  const mapRef = useRef<Map | null>(null);

  const [openReportsModal, setOpenReportsModal] = useState<boolean>(false);
  const [openGetLocationModal, setOpenGetLocationModal] =
    useState<boolean>(false);
  const [center, setCenter] = useState<LatLngExpression>();
  const [pinPosition, setPinPosition] = useState<LatLngExpression>();
  const [points, setPoints] = useState<IMapPoint[]>([]);
  const renderedPointIds = useRef<Set<string>>(new Set());

  function getPointKey(point: IMapPoint): string {
    if (point.id) return point.id;
    return `${point.coordinates.lat}_${point.coordinates.lng}`;
  }

  const fetchPoints = useCallback(async () => {
    try {
      if (currentLocation) {
        const { lat, lng } = mapCenter;
        const maxDistance = (20 - mapCenter.zoom) * 1000;
        const data = await getPointsNearby(lat, lng, maxDistance);

        const newPoints = data.map((point: IMapPoint) => {
          const key = getPointKey(point);
          const isNew = !renderedPointIds.current.has(key);
          if (isNew) renderedPointIds.current.add(key);

          return {
            ...point,
            animate: isNew,
          };
        });

        updateLocalPoints("lastPoints", data);
        setPoints(newPoints);
      } else {
        const localPoints = getLocalPoints("lastPoints");
        setPoints(localPoints);
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    currentLocation,
    getLocalPoints,
    getPointsNearby,
    mapCenter,
    updateLocalPoints,
  ]);

  function handleOpenReportsModal() {
    if (currentLocation) {
      setOpenReportsModal(true);
      return;
    }
    setOpenGetLocationModal(true);
  }

  function handleGetLocationModalClick() {
    setOpenGetLocationModal(false);
  }

  function handleCloseReportsModal() {
    setOpenReportsModal(false);
    setPinPosition(undefined);
  }

  useEffect(() => {
    setAlert({
      message: "Carregando...",
      description: "Estamos carregando a localização dos pontos!",
      isOpen: true,
      duration: 2,
    });
  }, [setAlert]);

  useEffect(() => {
    setCenter(currentLocation);
    fetchPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter.zoom, mapCenter]);

  return (
    <main className={styles.pointsContainer}>
      <SearchBar />
      {center ? (
        <MapContainer
          id="mapContainer"
          center={center}
          zoom={15}
          className={styles.mapContainer}
          zoomControl={false}
          ref={(el) => {
            if (el && !mapRef.current) {
              mapRef.current = el;
            }
          }}
          whenReady={() => {
            setTimeout(() => {
              setMapInstance(mapRef.current);
            }, 2000);
          }}
        >
          <MyMap className={styles.map} points={points} />
          <CreateButton onClick={handleOpenReportsModal} />
          {pinPosition ? <MapPin position={pinPosition} /> : ""}
        </MapContainer>
      ) : (
        <Loader text={"Carregando Mapa"} />
      )}

      <Modal
        open={openReportsModal}
        onCancel={handleCloseReportsModal}
        cancelText="Cancelar"
        footer={[
          <Button key="cancel" onClick={handleCloseReportsModal}>
            Cancelar
          </Button>,
        ]}
      >
        <ReportSteps closeModal={handleCloseReportsModal} />
        <Divider />
      </Modal>

      <Modal
        title="Localização não encontrada!"
        open={openGetLocationModal}
        onOk={handleGetLocationModalClick}
        onCancel={() => setOpenGetLocationModal(false)}
        cancelText="Cancelar"
        okText="Obter Localização"
        centered={true}
      >
        <p>
          Você deve habilitar a sua localização para que possamos ter acesso ao
          local da sua denúncia.
        </p>
      </Modal>
    </main>
  );
};

export default Home;
