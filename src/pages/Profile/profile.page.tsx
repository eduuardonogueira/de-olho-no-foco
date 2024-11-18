import styles from "./profile.module.scss";
import { Menu } from "@components/index";
import { LOGIN_ROUTE } from "@constants/routes";
import { Link } from "react-router-dom";
import {
  IconMeusDados,
  IconHistorico,
  IconConfiguracoes,
  IconConquistas,
  IconAjuda,
  IconSair
} from '../../assets/index.ts';
import Perfil from "../../assets/Perfil/Perfil.png"

const menuItems = [
  { label: 'Meus dados', route: '/profile/data', icon: IconMeusDados },
  { label: 'Histórico', route: '/profile/history', icon: IconHistorico },
  { label: 'Configurações', route: '/profile/settings', icon: IconConfiguracoes },
  { label: 'Conquistas', route: '/profile/achievements', icon: IconConquistas },
  { label: 'Ajuda', route: '/profile/help', icon: IconAjuda },
  { label: 'Sair', route: LOGIN_ROUTE, icon: IconSair, isLogout: true }
];

export const Profile = () => {
  return (
    <main className={styles.profileContainer}>
      <section className={styles.profile}>
        <div className={styles.header}>
          <h1>Perfil</h1>
          <img src={Perfil} alt="Foto de perfil" className={styles.profileImage} />
        </div>
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <Link to={item.route}>
                <img src={item.icon} alt={`${item.label} icon`} className={styles.icon} />
                {item.label}
              </Link>
            </li>
          ))}
          <li className={styles.menuItem}>
          </li>
        </ul>
      </section>
      <Menu />
    </main>
  );
};

export default Profile;