// SocialLoginButton.tsx
import styles from "./googleLoginButton.module.scss";
import googleIcon from "@assets/icons/google-icon.svg";

interface GoogleLoginButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const GoogleLoginButton = ({
  onClick,
  isLoading,
}: GoogleLoginButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.googleButton}
      // disabled={isLoading}
      disabled
    >
      {isLoading ? (
        <div className={styles.spinner}></div> // Spinner
      ) : (
        <>
          <img
            src={googleIcon}
            alt="Google logo"
            className={styles.googleIcon}
          />
          Continuar com o Google
        </>
      )}
    </button>
  );
};
