import styles from "./profile.module.scss";
import { Menu } from "@components/index";
import { LOGIN_ROUTE } from "@constants/routes";
import { Link } from "react-router-dom";
import { AUTH_CONTEXT_INITIAL_STATE, AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export const Profile = () => {
  const { setAuth } = useContext(AuthContext);

  function handleLogout() {
    setAuth({
      accessKey: AUTH_CONTEXT_INITIAL_STATE.accessKey,
      isLogged: AUTH_CONTEXT_INITIAL_STATE.isLogged,
    });
  }

  return (
    <main className={styles.profileContainer}>
      <section className={styles.profile}>
        <h1>Profile Page</h1>
        <Link to={LOGIN_ROUTE} onClick={handleLogout}>
          Sair
        </Link>
      </section>
      <Menu />
    </main>
  );
};

export default Profile;
