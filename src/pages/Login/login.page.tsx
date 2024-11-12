import React, { useState } from "react";
import styles from "./login.module.scss";
import { LoginBackground, Logo } from "@assets/img";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, SIGNUP_ROUTE } from "@constants/routes";
import { InputField, GoogleLoginButton } from "@components/index";
import { Alert } from "antd";

interface AlertProps {
  isOpen: boolean;
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({
    isOpen: false,
    type: undefined,
    message: "",
  });

  function slowNavigate() {
    setTimeout(() => {
      navigate(HOME_ROUTE);
    }, 2000);
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email:", email);
    console.log("Password:", password);

    setIsLoading(false);
    setAlert({
      isOpen: true,
      type: "success",
      message: "Login realizado com sucesso!",
    });

    slowNavigate();
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsGoogleLoading(false);
      setAlert({
        isOpen: true,
        type: "success",
        message: "Login realizado com sucesso!",
      });

      slowNavigate();
    } catch (error) {
      console.error(error);

      setIsGoogleLoading(false);
      setAlert({
        isOpen: true,
        type: "error",
        message: "Usuário ou senha incorretos!",
      });
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.loginWrapper}>
        <img src={LoginBackground} alt="" className={styles.loginBackground} />
        {alert.isOpen ? (
          <Alert
            message={alert.message}
            type={alert.type}
            showIcon
            closable
            className={styles.alert}
            onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
          />
        ) : (
          ""
        )}

        <section className={styles.header}>
          <img src={Logo} alt="Logo De olho no foco" className={styles.logo} />
          <h1>De olho no foco</h1>
          <p>Faça login para reportar e compartilhar focos de queimadas</p>
        </section>

        <form onSubmit={handleLogin} className={styles.formContainer}>
          <div className={styles.inputWrapper}>
            <InputField
              type="email"
              placeholder="Digite seu email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type="password"
              placeholder="Digite sua senha"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.btn}>
            {isLoading ? <div className={styles.spinner}></div> : "Entrar"}
          </button>

          <div className={styles.socialLogin}>
            <GoogleLoginButton
              onClick={handleGoogleLogin}
              isLoading={isGoogleLoading}
            />
          </div>

          <p className={styles.signup}>
            Não possui uma conta? <Link to={SIGNUP_ROUTE}>Crie conta</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
