// SocialLoginButton.tsx
import cn from "classnames";
import styles from "./button.module.scss";

interface IButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  label: string;
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
}

export const Button = ({
  onClick,
  isLoading,
  type,
  label,
  className,
}: IButtonProps) => {
  const customButtonStyles = cn(styles.button, className);
  return (
    <button
      type={type}
      onClick={onClick}
      className={customButtonStyles}
      disabled={isLoading}
    >
      {isLoading ? <div className={styles.spinner}></div> : label}
    </button>
  );
};
