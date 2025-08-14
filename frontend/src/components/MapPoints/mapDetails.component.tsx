import styles from "./mapDetails.module.scss";
import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import { AlertContext, RoutingContext } from "@contexts/index";
import { EnumUserRoles, IPoint, IUser } from "@customtypes/index";
import cn from "classnames";
import {
  useDateFormatter,
  useUserFormatter,
  useApi,
  useReports,
} from "@hooks/index";
import { Carousel, Divider, Spin } from "antd";
import {
  CalendarBlank,
  CircleNotch,
  EyeSlash,
  Info,
  MapPin,
  UserCircle,
  UserCircleGear,
} from "@phosphor-icons/react";

interface IMapDetailsProps {
  pointId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapDetails = ({ pointId, setIsOpen }: IMapDetailsProps) => {
  const { dateFormatter } = useDateFormatter();
  const { getUsername } = useUserFormatter();
  const { translateType, translateStatus } = useReports();
  const { getProfile, getPoint, deletePoint } = useApi();

  const { setEnd } = useContext(RoutingContext);
  const { setAlert } = useContext(AlertContext);

  const [pointDetails, setPointDetails] = useState<IPoint | null>();
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    async function fetchPointDetails() {
      const data = await getPoint(pointId);
      setPointDetails(data);
    }

    async function fetchUser() {
      const data = await getProfile();
      setUser(data);
    }
    console.log("chamou");
    fetchPointDetails();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointId]);

  function handleRouteToPoint({ lat, lng }: { lat: number; lng: number }) {
    setEnd(new L.LatLng(lat, lng));
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }

  async function handleDeletePoint(pointId: string) {
    const response = await deletePoint(pointId);

    if (response.status !== 200) {
      setAlert({
        isOpen: true,
        message: "Erro ao deletar denúncia!",
        description: response.data.message,
      });
      return;
    }

    setAlert({
      isOpen: true,
      message: "Sucesso!",
      description: "Denúncia deletada com sucesso",
    });

    setPointDetails(null);
  }

  // TODO: Create a function that destroy the PopUp component, because the calls
  return (
    <>
      {!pointDetails || !user ? (
        <Spin
          className={styles.spinWrapper}
          indicator={<CircleNotch size={32} className={styles.spinIcon} />}
          size="large"
        />
      ) : (
        <article className={styles.pointDetailsWrapper}>
          <section className={styles.titleWrapper}>
            <div className={styles.pointDetails}>
              <Info size={24} />
              <span>Detalhes do incidente</span>
            </div>
            <span className={styles.pointStatus}>
              {translateStatus(pointDetails.status)}
              {pointDetails.status}
            </span>
            <h1 className={styles.pointTitle}>{pointDetails.title}</h1>
            <h2 className={styles.pointType}>
              {translateType(pointDetails.type)}
            </h2>
            <div className={styles.pointDate}>
              <CalendarBlank size={24} />
              <p>{dateFormatter(pointDetails.createdAt)}</p>
            </div>
            <div className={styles.pointCreator}>
              {pointDetails.isAnonymous ? (
                <EyeSlash size={24} />
              ) : (
                <UserCircle size={24} />
              )}
              <p>
                {pointDetails.isAnonymous
                  ? "Anônimo"
                  : getUsername(pointDetails.user)}
              </p>
            </div>
          </section>

          <Divider />

          <section className={styles.pointDetailsContentWrapper}>
            {pointDetails.description && (
              <hgroup className={styles.pointDescription}>
                <h3>Descrição</h3>
                <p>{pointDetails.description}</p>
              </hgroup>
            )}

            {pointDetails.images && pointDetails.images.length > 0 && (
              <hgroup className={styles.pointImages}>
                <h3>Evidências visuais</h3>
                <Carousel
                  autoplay
                  arrows={pointDetails.images.length > 1}
                  dots={pointDetails.images.length > 1}
                  adaptiveHeight
                >
                  {pointDetails.images.map((image, index) => (
                    <img key={index} src={image} />
                  ))}
                </Carousel>
              </hgroup>
            )}

            <hgroup className={styles.pointLocation}>
              <div>
                <MapPin size={24} />
                <h3>Localização</h3>
              </div>
              <hgroup className={styles.pointCoordinates}>
                <h4>Coordenadas:</h4>
                <p>
                  {pointDetails.coordinates.lat}, {pointDetails.coordinates.lng}
                </p>
              </hgroup>
              <button
                className={styles.locationButton}
                onClick={() => handleRouteToPoint(pointDetails.coordinates)}
              >
                Criar rota
              </button>
            </hgroup>

            {user?.role === EnumUserRoles.ADMIN && (
              <section className={styles.pointAdminWrapper}>
                <div>
                  <UserCircleGear size={24} />
                  <h3>Administrador</h3>
                </div>
                <button
                  className={cn(styles.deleteButton, styles.locationButton)}
                  onClick={() => handleDeletePoint(pointDetails.id ?? "")}
                >
                  Deletar denúncia
                </button>
              </section>
            )}
          </section>
        </article>
      )}
    </>
  );
};

export default MapDetails;
