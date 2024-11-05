import styles from "./createButton.module.scss";
import { Plus } from "@phosphor-icons/react";

export const CreateButton = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  return (
    <button className={styles.createButton} onClick={() => setOpenModal(true)}>
      <Plus size={32} weight="bold" />
    </button>
  );
};
