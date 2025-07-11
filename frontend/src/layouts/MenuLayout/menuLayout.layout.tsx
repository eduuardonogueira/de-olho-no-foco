import styles from "./menuLayout.module.scss";
import { Menu } from "@components/index";
import { Outlet } from "react-router-dom";

export const MenuLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Menu />
    </div>
  );
};

export default MenuLayout;
