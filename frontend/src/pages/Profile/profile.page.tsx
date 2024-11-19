import styles from "./profile.module.scss";
import { Menu } from "@components/index";
import { Link } from "react-router-dom";
import { useLinks } from "@hooks/useLinks";
import { UserCirclePlus } from "@phosphor-icons/react";

export const Profile = () => {
  const { profileLinks } = useLinks();

  return (
    <div className={styles.profileContainer}>
      <section className={styles.profile}>
        <div className={styles.header}>
          <h1>Perfil</h1>
          <UserCirclePlus className={styles.profileImage} size={40} />
        </div>
        <ul className={styles.menu}>
          {profileLinks.map((link, index) => (
            <li key={index} className={styles.menuItem}>
              <Link to={link.route}>
                {<link.icon className={styles.icon} size={30} />}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Menu />
    </div>
  );
};

export default Profile;
