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
} from '../../assets/index.ts' ;



const menuItems = [
  { label: 'Meus dados', route: '/profile/data', icon: IconMeusDados },
  { label: 'Histórico', route: '/profile/history', icon: IconHistorico },
  { label: 'Configurações', route: '/profile/settings', icon: IconConfiguracoes },
  { label: 'Conquistas', route: '/profile/achievements', icon: IconConquistas },
  { label: 'Ajuda', route: '/profile/help', icon: IconAjuda },
];

export const Profile = () => {
  return (
    <main className={styles.profileContainer}>
      <section className={styles.profile}>
        <h1>Perfil</h1>
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <Link to={item.route}>
                <img src={item.icon} alt={`${item.label} icon`} className={styles.icon} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.bottomMenu}>
          <Link 
          to={LOGIN_ROUTE}> <img src={IconSair} alt="Ícone de Sair" className={styles.icon} /> Sair
          </Link>
        </div>
      </section>
      <Menu />
    </main>
  );
};

export default Profile;
