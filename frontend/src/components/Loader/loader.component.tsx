import styles from "./loader.module.scss";
import { CircleNotch } from "@phosphor-icons/react";

export const Loader = ({ text }: { text: string }) => {
  return (
    <div className={styles.container}>
      <CircleNotch size={32} className={styles.icon} />
      <h3 className={styles.text}>{text}</h3>
    </div>
  );
};
