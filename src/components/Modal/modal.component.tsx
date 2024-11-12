import styles from "./modal.module.scss";
import { ReactNode } from "react";
import cn from "classnames";

export const Modal = ({
  openModal,
  setOpenModal,
  children,
  onClose,
  classNameModalContainer,
  classNameModalContent,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  onClose?: () => void;
  classNameModalContainer?: string;
  classNameModalContent?: string;
}) => {
  if (openModal) {
    const containerStyles = cn(styles.modalContainer, classNameModalContainer);
    const contentStyles = cn(styles.modalContent, classNameModalContent);

    return (
      <div
        className={containerStyles}
        onClick={() => {
          setOpenModal(false), onClose ? onClose() : "";
        }}
      >
        <div className={contentStyles}>{children}</div>
      </div>
    );
  }
};
