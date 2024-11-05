import styles from "./modal.module.scss";
import { ReactNode } from "react";

export const Modal = ({
  openModal,
  setOpenModal,
  children,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  children: ReactNode;
}) => {
  if (openModal)
    return (
      <div
        className={styles.modalContainer}
        onClick={() => setOpenModal(false)}
      >
        <div className={styles.modalContent}>{children}</div>
      </div>
    );
};
