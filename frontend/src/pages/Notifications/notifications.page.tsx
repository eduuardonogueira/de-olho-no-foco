import styles from "./notifications.module.scss";
import { Menu } from "@components/index";

export const Notifications = () => {
  return (
    <main className={styles.notificationsContainer}>
      <section className={styles.notifications}>
        <h1>Notifications</h1>
      </section>
      <Menu />
    </main>
  );
};

export default Notifications;
