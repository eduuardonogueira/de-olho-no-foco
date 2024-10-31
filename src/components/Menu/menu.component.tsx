import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import { useLinks } from "@hooks/useLinks";

export const Menu = () => {
  const { menuLinks } = useLinks()

  return (
    <header className={styles.menuContainer}>
      <nav className={styles.menu}>
        {menuLinks.map((link) => (
          <Link key={link.label} to={link.route} className={styles.menuLink}>
            {<link.icon size={40}/>}
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
