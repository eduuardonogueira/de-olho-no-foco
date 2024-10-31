import styles from "./profile.module.scss";
import { Menu } from "@components/index";
import { LOGIN_ROUTE } from "@constants/routes";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <main className={styles.profileContainer}>
      <section className={styles.profile}>
        <h1>Profile Page</h1>
        <Link to={LOGIN_ROUTE}>Sair</Link>
      </section>
      <Menu />
    </main>
  );
};

export default Profile;
