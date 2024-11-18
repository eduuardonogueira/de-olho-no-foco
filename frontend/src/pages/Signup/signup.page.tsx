import { useState } from "react";
import { AsYouType } from "libphonenumber-js";
import styles from "./signup.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "@constants/routes";
import {
  ArrowCircleLeft,
  EnvelopeSimple,
  Eye,
  EyeClosed,
  IdentificationBadge,
  LockSimple,
  Phone,
} from "@phosphor-icons/react";
import { Button, Input } from "@components/index";
import cn from "classnames";
import { useApi } from "@hooks/useApi";
import { ICreateUser } from "@customtypes/user";
import { Alert } from "antd";

interface PasswordOptions {
  passwordCompared: string;
  passwordIsConfirmed: boolean | null;
  passwordStrength: {
    label: string;
    width: number;
    color: string;
  };
  passwordComparedVisibility: boolean;
  passwordVisibility: boolean;
}

interface AlertProps {
  isOpen: boolean;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
}

export const Signup = () => {
  const navigate = useNavigate();
  const { createUser } = useApi();

  const [alert, setAlert] = useState<AlertProps>({
    isOpen: false,
    type: undefined,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formattedPhone, setformattedPhone] = useState("");
  const [user, setUser] = useState<ICreateUser>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "adventure",
  });
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    passwordCompared: "",
    passwordIsConfirmed: null,
    passwordStrength: {
      label: "",
      width: 0,
      color: "",
    },
    passwordComparedVisibility: false,
    passwordVisibility: false,
  });

  function handlePhoneNumberFormatter() {
    const formattedPhone = new AsYouType("BR").input(user.phone);
    setformattedPhone(formattedPhone);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser((prev) => ({ ...prev, password: value }));

    if (!value) {
      setPasswordOptions((prev) => ({
        ...prev,
        passwordStrength: {
          label: "",
          width: 0,
          color: "",
        },
      }));
    } else {
      setPasswordOptions((prev) => ({
        ...prev,
        passwordStrength: checkPasswordStrength(value),
      }));
    }
  }

  function checkPasswordStrength(password: string): {
    label: string;
    width: number;
    color: string;
  } {
    let strength = 0;

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (hasLowerCase) strength++;
    if (hasUpperCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;
    if (isLongEnough) strength++;

    if (strength <= 2) {
      return { label: "Fácil", width: 33, color: "#EB4335" };
    } else if (strength === 3 || strength === 4) {
      return { label: "Média", width: 66, color: "#E9BA00" };
    } else if (strength === 5) {
      return { label: "Forte", width: 100, color: "#34C759" };
    }

    return { label: "Fácil", width: 33, color: "#EB4335" };
  }

  function togglePasswordVisibility(prop: keyof PasswordOptions) {
    setPasswordOptions((prev) => ({
      ...prev,
      [prop]: !prev[prop],
    }));
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (user.password != passwordOptions.passwordCompared) {
      setPasswordOptions((prev) => ({ ...prev, passwordIsConfirmed: false }));
      setIsLoading(false);
      return;
    } else {
      setPasswordOptions((prev) => ({ ...prev, passwordIsConfirmed: true }));
    }

    const response = await createUser(user);
    setIsLoading(false);

    if (response.status === 201) {
      setAlert({
        isOpen: true,
        type: "success",
        message: "Login realizado com sucesso!",
      });

      setTimeout(() => {
        navigate(HOME_ROUTE);
      }, 2000);
    }

    if (response.status === 409) {
      setAlert({
        isOpen: true,
        type: "error",
        message: response.data.message,
      });
    } else {
      setAlert({
        isOpen: true,
        type: "error",
        message: "Erro ao realizar cadastro",
      });
    }
  }

  const renderPasswordVisibilityIcons = (prop: keyof PasswordOptions) => {
    return (
      <>
        {passwordOptions[prop] ? (
          <Eye size={16} onClick={() => togglePasswordVisibility(prop)} />
        ) : (
          <EyeClosed size={16} onClick={() => togglePasswordVisibility(prop)} />
        )}
      </>
    );
  };

  const renderPasswordStrength = () => {
    if (passwordOptions.passwordStrength.label)
      return (
        <>
          <div className={styles.passwordStrengthWrapper}>
            <div className={styles.passwordStrengthLineBackground}>
              <span
                className={styles.passwordStrengthLine}
                style={{
                  width: `${passwordOptions.passwordStrength.width}%`,
                  background: passwordOptions.passwordStrength.color,
                }}
              />
            </div>
            <span
              className={styles.passwordStrengthText}
              style={{
                color: passwordOptions.passwordStrength.color,
              }}
            >
              {passwordOptions.passwordStrength.label}
            </span>
          </div>
        </>
      );
  };

  const renderPasswordIsEquals = () => {
    if (passwordOptions.passwordIsConfirmed === false)
      return (
        <span className={styles.passwordIsEqualsText}>
          As senhas devem ser iguais!
        </span>
      );
  };

  return (
    <div className={styles.container}>
      {alert.isOpen ? (
        <Alert
          type={alert.type}
          message={alert.message}
          className={styles.alert}
          closable
          showIcon
          onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        />
      ) : (
        ""
      )}
      <main className={styles.signupContainer}>
        <section className={styles.titleWrapper}>
          <Link to={LOGIN_ROUTE}>
            <ArrowCircleLeft size={32} weight="bold" className={styles.icon} />
          </Link>
          <h2 className={styles.title}>Criar conta</h2>
        </section>

        <form onSubmit={(e) => handleFormSubmit(e)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Primeiro Nome</label>
            <Input
              type="text"
              placeholder="John"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, firstName: e.target.value }))
              }
              value={user.firstName}
              icon={<IdentificationBadge />}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Último Nome</label>
            <Input
              type="text"
              placeholder="Doe"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, lastName: e.target.value }))
              }
              value={user.lastName}
              icon={<IdentificationBadge />}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Telefone</label>
            <Input
              type="tel"
              placeholder="+XX (XX) XXXX-XXX"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, phone: e.target.value }));
                setformattedPhone("");
              }}
              onBlur={handlePhoneNumberFormatter}
              value={formattedPhone ? formattedPhone : user.phone}
              icon={<Phone />}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <Input
              type="email"
              placeholder="johndoe@example.com"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              value={user.email}
              icon={<EnvelopeSimple />}
              required
            />
          </div>

          <div className={cn(styles.inputGroup, styles.passwordInput)}>
            <label>Senha</label>
            <Input
              type={passwordOptions.passwordVisibility ? "text" : "password"}
              placeholder="Digite sua senha"
              onChange={(e) => handlePasswordChange(e)}
              value={user.password}
              icon={<LockSimple />}
              required
            />
            {renderPasswordVisibilityIcons("passwordVisibility")}
            {renderPasswordStrength()}
          </div>

          <div className={cn(styles.inputGroup, styles.passwordInput)}>
            <label>Confirme sua senha</label>
            <Input
              type={
                passwordOptions.passwordComparedVisibility ? "text" : "password"
              }
              placeholder="Digite sua senha"
              onChange={(e) =>
                setPasswordOptions((prev) => ({
                  ...prev,
                  passwordCompared: e.target.value,
                }))
              }
              icon={<LockSimple />}
              required
            />
            {renderPasswordVisibilityIcons("passwordComparedVisibility")}
            {renderPasswordIsEquals()}
          </div>

          <Button label="Criar Conta" isLoading={isLoading} type="submit" />
        </form>
      </main>
    </div>
  );
};
