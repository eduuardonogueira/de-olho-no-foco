import {
  Fire,
  Gear,
  GlobeHemisphereEast,
  Icon,
  MagnifyingGlass,
  TrashSimple,
  Tree,
} from "@phosphor-icons/react";
import styles from "./notifications.module.scss";
import { Menu } from "@components/index";

const notifications = [
  {
    title: "Incêndios próximos à sua localização!",
    message:
      "⚠️ Fique atento(a), Mantenha-se informado(a) através dos canais de emergência!",
    icon: Fire,
    isRead: false,
    date: "32m",
  },
  {
    title: "Manutenção Programada",
    message:
      "O sistema estará em manutenção em [data] das [horário]. Algumas funcionalidades podem ficar indisponíveis.",
    icon: Gear,
    isRead: false,
    date: "6h",
  },
  {
    title: "Dica do Dia!",
    message:
      "Plante uma árvore e ajude o meio ambiente! Além de purificar o ar, você contribui para um planeta mais verde e sustentável! 🌍🌿",
    icon: Tree,
    isRead: true,
    date: "1d",
  },
  {
    title: "Dica do dia",
    message:
      "Recicle hoje para um amanhã melhor! 🌍Separe seus resíduos e contribua para a redução de lixo no planeta. Cada atitude conta! 💚",
    icon: GlobeHemisphereEast,
    isRead: true,
    date: "2d",
  },
];

export const Notifications = () => {
  const readedNotifications = notifications.filter(
    (notification) => notification.isRead === true
  );

  const newNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  const renderNotifications = (notification: {
    title: string;
    message: string;
    icon: Icon;
    isRead: boolean;
    date: string;
  }) => (
    <li
      className={styles.notification}
      style={{ background: notification.isRead ? "#F5F5F5" : "#E1FFE9" }}
    >
      {
        <notification.icon
          weight="fill"
          size={30}
          className={styles.notificationIcon}
        />
      }
      <div className={styles.notificationTitleWrapper}>
        <h4 className={styles.notificationTitle}>{notification.title}</h4>
        <p className={styles.notificationMessage}>{notification.message}</p>
      </div>
      <div className={styles.notificationWrapper}>
        <TrashSimple weight="fill" size={14} className={styles.notificationDelete} />
        <p className={styles.notificationDate}>{notification.date}</p>
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
          {notifications ? (
            <>
              <h2 className={styles.contentTitle}>Novas</h2>
              {newNotifications.map((notification) =>
                renderNotifications(notification)
              )}
              {readedNotifications ? (
                <>
                  <h2 className={styles.contentTitle}>Lidas</h2>
                  {readedNotifications.map((notification) =>
                    renderNotifications(notification)
                  )}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <p>Sem notificações</p>
          )}
        </section>
      </section>
      <Menu />
    </main>
  );
};

export default Notifications;
