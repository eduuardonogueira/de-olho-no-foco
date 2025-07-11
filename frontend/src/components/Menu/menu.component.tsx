import { NavLink } from "react-router-dom";
import styles from "./menu.module.scss";
import cn from "classnames";
import { useLinks } from "@hooks/useLinks";

export const Menu = () => {
  const { menuLinks } = useLinks();

  return (
    <header className={styles.menuContainer}>
      <nav className={styles.menu}>
        {menuLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.route}
            className={({ isActive }) =>
              cn(styles.menuLink, { [styles.activeMenuLink]: isActive })
            }
          >
            {<link.icon size={40} weight="fill"/>}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
