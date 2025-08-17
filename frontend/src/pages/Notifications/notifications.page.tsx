import styles from "./notifications.module.scss";
import { Bell } from "@phosphor-icons/react";
import { Loader, NotificationCard } from "@components/index";
import { useApi } from "@hooks/index";
import { useEffect, useState } from "react";
import { INotificationWithStatus } from "@customtypes/index";
import { Tabs } from "antd";
import { Button } from "../../components/Button/button.component";

interface NotificationData {
  notifications: INotificationWithStatus[];
  total: number;
}

export const Notifications = () => {
  const { getUserNotification } = useApi();

  const [isLoading, setIsLoading] = useState(false);
  const [allNotifications, setAllNotifications] = useState<NotificationData>();
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
      setAllNotifications({
        notifications: [
          ...isNewNotificationData.notifications,
          ...isReadedNotificationData.notifications,
        ],
        total: isNewNotificationData.total + isReadedNotificationData.total,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const markAsRead = (notificationId: string) => {
  //   setNotifications((prev) =>
  //     prev.map((n) => (n.id === notificationId ? { ...n, userStatus: { ...n.userStatus, isRead: true } } : n)),
  //   )
  // }

  // const markAsUnread = (notificationId: string) => {
  //   setNotifications((prev) =>
  //     prev.map((n) => (n.id === notificationId ? { ...n, userStatus: { ...n.userStatus, isRead: false } } : n)),
  //   )
  // }

  // const deleteNotification = (notificationId: string) => {
  //   setNotifications((prev) =>
  //     prev.map((n) => (n.id === notificationId ? { ...n, userStatus: { ...n.userStatus, isDeleted: true } } : n)),
  //   )
  // }

  // const markAllAsRead = () => {
  //   setNotifications((prev) => prev.map((n) => ({ ...n, userStatus: { ...n.userStatus, isRead: true } })))
  // }

  const mapNotifications = (notifications: NotificationData | undefined) => {
    if (isLoading)
      return <Loader text="Carregando..." className={styles.loader} />;

    if (notifications && notifications?.total > 0)
      return (
        <ul className={styles.notificationContent}>
          {notifications.notifications.map((notification) => (
            <NotificationCard key={notification.id} data={notification} />
          ))}
        </ul>
      );

    return <p>Sem notificações</p>;
  };

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <section className={styles.titleWrapper}>
          <div className={styles.titleContent}>
            <Bell size={24} weight="fill" />
            <h1>Notificações</h1>
          </div>

          <div className={styles.titleButton}>
            <Button>Marcar todas como lida</Button>
          </div>
        </section>

        <section className={styles.content}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: `Todos (${allNotifications?.total ?? 0})`,
                children: mapNotifications(allNotifications),
              },
              {
                key: "2",
                label: `Não lidas (${newNotifications?.total ?? 0})`,
                children: mapNotifications(newNotifications),
              },
              {
                key: "3",
                label: `Lidas (${readedNotifications?.total ?? 0})`,
                children: mapNotifications(readedNotifications),
              },
            ]}
          />
        </section>
      </section>
    </main>
  );
};

export default Notifications;
