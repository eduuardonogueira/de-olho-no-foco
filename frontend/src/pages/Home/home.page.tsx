import {
  Menu,
  MyMap,
  SearchBar,
  CreateButton,
  Loader,
  Modal,
  MapPin,
} from "@components/index";
import styles from "./home.module.scss";
import { MapContainer } from "react-leaflet";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Point, Report, AlertProps, CreatePoint } from "@customtypes/index";
import { useApi, useLocalStorage, useReports } from "@hooks/index";
import { LatLngExpression } from "leaflet";
import { Alert, Modal as AntModal } from "antd";
import { CurrentLocationContext } from "@contexts/CurrentLocationContext";
import { MapValuesContext } from "@contexts/MapValuesContext";

export const Home = () => {
  const currentLocation = useContext(CurrentLocationContext);
  const mapCenter = useContext(MapValuesContext);

  const { getPointsNearby, createPoint } = useApi();
  const { getLocalPoints, updateLocalPoints } = useLocalStorage();
  const { homeReport } = useReports();

  const [openReportsModal, setOpenReportsModal] = useState<boolean>(false);
  const [openLocationModal, setOpenLocationModal] = useState<boolean>(false);
  const [openGetLocationModal, setOpenGetLocationModal] =
    useState<boolean>(false);
  const [center, setCenter] = useState<LatLngExpression>();
  const [pinPosition, setPinPosition] = useState<LatLngExpression>();
  const [points, setPoints] = useState<Point[]>([]);
  const [reportPoint, setReportPoint] = useState<CreatePoint>();
  const [alert, setAlert] = useState<AlertProps>({
    isOpen: false,
    type: undefined,
    message: "",
  });

  const renderAlert = () => {
    if (alert.isOpen)
      return (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          className={styles.alert}
          onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        />
      );
  };

  async function fetchPoints() {
    try {
      if (currentLocation) {
        const { lat, lng } = mapCenter;
        const maxDistance = (20 - mapCenter.zoom) * 1000;
        const data = await getPointsNearby(lat, lng, maxDistance);

        // console.log("maxDistance: ", maxDistance);
        // console.log("zoom: ", currentLocation.zoom);
        // console.log(currentLocation);

        updateLocalPoints("lastPoints", data);
        setPoints(data);
      } else {
        const localPoints = getLocalPoints("lastPoints");
        setPoints(localPoints);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleCreateButtonClick() {
    if (currentLocation) {
      setOpenReportsModal(true);
      return;
    }
    setOpenGetLocationModal(true);
  }

  function handleReportClick(reportType: Report) {
    if (currentLocation) {
      setOpenReportsModal(false);
      setOpenLocationModal(true);
      setPinPosition(currentLocation);
      const { lat, lng } = currentLocation;
      setReportPoint({
        type: reportType,
        coordinates: { lat, lng },
        position: "left",
        description: "Sem Descrição",
      });
    }
  }

  function handleGetLocationModalClick() {
    setOpenGetLocationModal(false);
  }

  function handleModalClose() {
    setOpenReportsModal(false);
    setOpenLocationModal(false);
    setPinPosition(undefined);
  }

  async function handleFormSubmit(e?: FormEvent) {
    if (e) e.preventDefault();

    if (reportPoint) {
      try {
        const response = await createPoint(reportPoint);

        if (response.status === 201) {
          updateLocalPoints("lastPoints", response.data);
          fetchPoints();
          setAlert({
            isOpen: true,
            type: "success",
            message: "Denúncia criada com sucesso!",
          });
        } else {
          setAlert({
            isOpen: true,
            type: "error",
            message: "Erro ao criar denúncia!",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleModalClose();
  }

  useEffect(() => {
    setCenter(currentLocation);
    fetchPoints();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter.zoom, mapCenter]);

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
        {renderAlert()}
        <SearchBar />
        {center ? (
          <MapContainer
            id="mapContainer"
            center={center}
            zoom={15}
            className={styles.mapContainer}
            zoomControl={false}
          >
            <MyMap className={styles.map} points={points} />
            <CreateButton onClick={handleCreateButtonClick} />
            {pinPosition ? <MapPin position={pinPosition} /> : ""}
          </MapContainer>
        ) : (
          <Loader text={"Carregando Mapa"} />
        )}
        <Menu />

        <Modal
          openModal={openReportsModal}
          setOpenModal={setOpenReportsModal}
          classNameModalContainer={styles.modalContainer}
          classNameModalContent={styles.modalContent}
        >
          <h2 className={styles.modalTitle}>Qual é a sua denúncia?</h2>

          <section className={styles.reportWrapper}>
            {homeReport.map((report) => (
              <div
                className={styles.report}
                key={report.label}
                onClick={() => handleReportClick(report.type)}
              >
                <img src={report.image} alt={report.label} />
                <h3>{report.label}</h3>
              </div>
            ))}
          </section>
        </Modal>

        <Modal
          openModal={openLocationModal}
          setOpenModal={setOpenLocationModal}
          classNameModalContainer={styles.modalContainer}
          classNameModalContent={styles.modalContent}
          onClose={() => {
            setReportPoint(undefined);
            setPinPosition(undefined);
          }}
        >
          <form className={styles.form}>
            <h2 className={styles.formTitle}>
              Confirme a localização da denúncia
            </h2>
            <button
              type="button"
              className={styles.formButton}
              onClick={handleFormSubmit}
            >
              Ok
            </button>
          </form>
        </Modal>

        <Modal
          openModal={openLocationModal}
          setOpenModal={setOpenLocationModal}
          classNameModalContainer={styles.modalContainer}
          classNameModalContent={styles.modalContent}
          onClose={() => {
            setReportPoint(undefined);
            setPinPosition(undefined);
          }}
        >
          <form className={styles.form}>
            <h2 className={styles.formTitle}>
              Confirme a localização da denúncia
            </h2>
            <button
              type="button"
              className={styles.formButton}
              onClick={handleFormSubmit}
            >
              Ok
            </button>
          </form>
        </Modal>

        <AntModal
          title="Localização não encontrada!"
          open={openGetLocationModal}
          onOk={handleGetLocationModalClick}
          onCancel={() => setOpenGetLocationModal(false)}
          cancelText="Cancelar"
          okText="Obter Localização"
          centered={true}
        >
          <p>
            Você deve habilitar a sua localização para que possamos ter acesso
            ao local da sua denúncia.
          </p>
        </AntModal>
      </main>
    </div>
  );
};

export default Home;
