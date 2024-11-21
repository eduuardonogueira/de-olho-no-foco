import styles from "./loader.module.scss";
import { CircleNotch } from "@phosphor-icons/react";
import cn from "classnames";

export const Loader = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={cn(styles.container, className)}>
      <CircleNotch size={32} className={styles.icon} />
      <h3 className={styles.text}>{text}</h3>
    </div>
  );
};
