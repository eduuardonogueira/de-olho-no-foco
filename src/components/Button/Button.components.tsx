
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
