import styles from "./appLayout.module.scss";
import { Alert, Menu } from "@components/index";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Menu />
      <Alert />
    </div>
  );
};

export default AppLayout;
