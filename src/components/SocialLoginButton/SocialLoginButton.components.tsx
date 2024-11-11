// SocialLoginButton.tsx
import React from 'react';
import styles from './SocialLoginButton.module.scss';
import googleIcon from '../../assets/icons/googleIcon.png';

interface SocialLoginButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button type="button" onClick={onClick} className={styles.googleButton} disabled={isLoading}>
      {isLoading ? (
        <div className={styles.spinner}></div> // Spinner
      ) : (
        <>
          <img src={googleIcon} alt="Google logo" className={styles.googleIcon} />
          Continuar com o Google
        </>
      )}
    </button>
  );
};

export default SocialLoginButton;
