import styles from "./profile.module.scss";
import { Link } from "react-router-dom";
import { useLinks, useApi } from "@hooks/index";
import { UserCirclePlus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { IUser } from "@customtypes/index";

export const Profile = () => {
  const { profileLinks } = useLinks();
  const { getProfile } = useApi();

  const [userData, setUserData] = useState<IUser>();

  const username = userData ? `${userData.firstName} ${userData.lastName}` : "";

  async function fetchProfile() {
    const data = await getProfile();
    setUserData(data);
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.profileContainer}>
      <section className={styles.profile}>
        <div className={styles.header}>
          <h1>Perfil</h1>
          <div className={styles.headerProfile}>
            <p>{username}</p>
            <UserCirclePlus className={styles.profileImage} size={40} />
          </div>
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
    </div>
  );
};

export default Profile;
