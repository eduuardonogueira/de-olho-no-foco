
import React from 'react';
import styles from './SocialLoginButton.module.scss';
import googleIcon from '../../assets/icons/googleIcon.png';

interface SocialLoginButtonProps {
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.googleButton}>
      <img src={googleIcon} alt="Google logo" className={styles.googleIcon} />
      Continuar com o Google
    </button>
  );
};

export default SocialLoginButton;
