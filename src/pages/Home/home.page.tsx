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
import { FormEvent, useEffect, useState } from "react";
import useUserLocation from "@hooks/useUserLocation";
import { CreatePoint, Point, Report } from "@customtypes/map";
import { useApi, useLocalStorage, useReports } from "@hooks/index";
import { LatLngExpression } from "leaflet";
import { Modal as AntModal } from "antd";

export const Home = () => {
  const { getPoints, createPoint } = useApi();
  const { userLocation, getUserLocation } = useUserLocation();
  const { getLocation } = useLocalStorage();
  const { homeReport } = useReports();
  const [openReportsModal, setOpenReportsModal] = useState<boolean>(false);
  const [openLocationModal, setOpenLocationModal] = useState<boolean>(false);
  const [openGetLocationModal, setOpenGetLocationModal] =
    useState<boolean>(false);
  const [center, setCenter] = useState<LatLngExpression>();
  const [pinPosition, setPinPosition] = useState<LatLngExpression>();
  const [points, setPoints] = useState<Point[]>([]);
  const [reportPoint, setReportPoint] = useState<CreatePoint>();

  async function fetchPoints() {
    try {
      const data = await getPoints();
      setPoints(data);
    } catch (error) {
      console.error(error);
    }
  }

  function getCenterLocation() {
    if (userLocation?.coordinates) {
      setCenter(userLocation.coordinates);
    } else {
      const location = getLocation("userLocation");
      setCenter(location);
    }
  }

  function handleCreateButtonClick() {
    if (userLocation) {
      setOpenReportsModal(true);
      return;
    }
    setOpenGetLocationModal(true);
  }

  function handleReportClick(reportType: Report) {
    if (userLocation) {
      const currentLocation = userLocation.coordinates;

      setOpenReportsModal(false);
      setOpenLocationModal(true);
      setPinPosition(currentLocation);
      setPinPosition(currentLocation);
      setReportPoint({
        type: reportType,
        coordinates: currentLocation,
        description: "",
      });
    }
  }

  function handleGetLocationModalClick() {
    setOpenGetLocationModal(false);
    getUserLocation();
  }

  function handleModalClose() {
    setOpenReportsModal(false);
    setOpenLocationModal(false);
    setPinPosition(undefined);
  }

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    handleModalClose();
    if (reportPoint) {
      try {
        createPoint(reportPoint);
        fetchPoints();
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getCenterLocation();
      fetchPoints();
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.pointsContainer}>
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
          <h2>Qual é a sua denúncia?</h2>

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
          onClose={handleModalClose}
          classNameModalContainer={styles.modalContainer}
          classNameModalContent={styles.modalContent}
        >
          <form action="POST" onSubmit={(e) => handleFormSubmit(e)} className={styles.form}>
            <h2 className={styles.formTitle}>
              Confirme a localização da denúncia
            </h2>
            <button type="submit" className={styles.formButton}>
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
