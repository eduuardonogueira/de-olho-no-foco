import { MagnifyingGlass, TrashSimple } from "@phosphor-icons/react";
import styles from "./notifications.module.scss";
import { Loader } from "@components/index";
import { useApi, useDateFormatter } from "@hooks/index";
import { useEffect, useState } from "react";
import { INotification } from "@customtypes/index";

interface NotificationData {
  notifications: INotification[];
  total: number;
}

export const Notifications = () => {
  const { getUserNotification } = useApi();
  const { getRelativeTime } = useDateFormatter();

  const [isLoading, setIsLoading] = useState(false);
  const [newNotifications, setNewNotifications] = useState<NotificationData>();
  const [readedNotifications, setReadedNotifications] =
    useState<NotificationData>();

  async function fetchNotifications() {
    setIsLoading(true);
    const isNewNotificationData = await getUserNotification({
      isRead: false,
      isDeleted: false,
    });

    const isReadedNotificationData = await getUserNotification({
      isRead: true,
      isDeleted: false,
    });

    if (isNewNotificationData && isReadedNotificationData) {
      setNewNotifications(isNewNotificationData);
      setReadedNotifications(isReadedNotificationData);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapNotifications = (
    notifications: NotificationData | undefined,
    title: string
  ) => {
    if (isLoading)
      return (
        <>
          <hgroup className={styles.contentTitle}>
            <h2>{title}</h2>
            <h5>{notifications?.total}</h5>
          </hgroup>
          <Loader text="Carregando..." className={styles.loader} />
        </>
      );

    return (
      <>
        <hgroup className={styles.contentTitle}>
          <h2>{title}</h2>
          <h5>{notifications?.total || 0}</h5>
        </hgroup>

        {notifications && notifications?.total > 0 ? (
          <>
            <ul className={styles.notificationContent}>
              {notifications.notifications.map((notification) =>
                renderNotifications(notification)
              )}
            </ul>
          </>
        ) : (
          <p>Sem notificações</p>
        )}
      </>
    );
  };

  const renderNotifications = (notification: INotification) => (
    <li
      key={notification.id}
      className={styles.notification}
      style={{
        background: notification.userStatus[0].isRead ? "#F5F5F5" : "#E1FFE9",
      }}
    >
      {
        <img
          src={notification.type.imageUrl}
          className={styles.notificationIcon}
        />
      }
      <div className={styles.notificationTitleWrapper}>
        <h4 className={styles.notificationTitle}>{notification.title}</h4>
        <p className={styles.notificationMessage}>{notification.message}</p>
      </div>
      <div className={styles.notificationWrapper}>
        <TrashSimple
          weight="fill"
          size={14}
          className={styles.notificationDelete}
        />
        <p className={styles.notificationDate}>
          {getRelativeTime(notification.createdAt)}
        </p>
      </div>
    </li>
  );

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <hgroup className={styles.titleWrapper}>
          <h1>Notificações</h1>
          <MagnifyingGlass className={styles.notificationSearch} size={30} />
        </hgroup>

        <section className={styles.content}>
          {mapNotifications(newNotifications, "Novas")}
          {mapNotifications(readedNotifications, "Lidas")}
        </section>
      </section>
    </main>
  );
};

export default Notifications;
