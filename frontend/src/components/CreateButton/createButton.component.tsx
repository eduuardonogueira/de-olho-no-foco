import styles from "./createButton.module.scss";
import { Plus } from "@phosphor-icons/react";

export const CreateButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button className={styles.createButton} onClick={onClick}>
      <Plus size={32} weight="bold" />
    </button>
  );
};
