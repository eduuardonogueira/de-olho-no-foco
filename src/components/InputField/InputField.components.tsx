
import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputGroup}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
