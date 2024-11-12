import styles from "./inputField.module.scss";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  type,
  placeholder,
  value,
  label,
  onChange,
}: InputFieldProps) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        id={label}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
