import { MagnifyingGlass } from "@phosphor-icons/react";
import styles from "./notifications.module.scss";
import { Menu } from "@components/index";

const notifications = [
  {
    title: "Incêndios próximos à sua localização!",
    message:
      "⚠️ Fique atento(a), Mantenha-se informado(a) através dos canais de emergência!",
    icon: "",
  },
  {
    title: "Incêndios próximos à sua localização!",
    message:
      "⚠️ Fique atento(a), Mantenha-se informado(a) através dos canais de emergência!",
    icon: "",
  },
];

export const Notifications = () => {
  return (
    <main className={styles.notificationsContainer}>
      <section className={styles.notifications}>
        <hgroup className={styles.notificationTitle}>
          <h1>Notifications</h1>
          <MagnifyingGlass />
        </hgroup>

        <section className={styles.notificationContent}>

        </section>
      </section>
      <Menu />
    </main>
  );
};

export default Notifications;
