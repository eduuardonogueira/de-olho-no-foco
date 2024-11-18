import { ChangeEvent, ReactNode } from "react";
import styles from "./input.module.scss";
import cn from "classnames";

interface IInputProps {
  id?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  icon?: ReactNode;
  value?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  containerClassName?: string;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  type,
  icon,
  value,
  onBlur,
  onChange,
  required,
  className,
  placeholder,
  containerClassName,
}: IInputProps) => {
  const customStyles = cn(styles.input, className);
  const customContainerStyles = cn(styles.inputContainer, containerClassName);

  if (icon)
    return (
      <div className={customContainerStyles}>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          className={customStyles}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          {...(onBlur ? { onBlur: (e) => onBlur(e) } : {})}
        />
        {icon}
      </div>
    );

  return (
    <input
      id={id}
      type={type}
      value={value}
      required={required}
      className={customStyles}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
};
