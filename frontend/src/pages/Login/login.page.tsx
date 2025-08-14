import styles from "./login.module.scss";
import React, { useContext, useState } from "react";
import { LoginBackground, Logo } from "@assets/img";
import { useApi, useBreakpoints } from "@hooks/index";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { AlertContext, AuthContext } from "@contexts/index";
import { HOME_ROUTE, SIGNUP_ROUTE } from "@constants/routes";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleLoginButton, Button, Input, Alert } from "@components/index";

export const Login = () => {
  const alertSuccess = {
    message: "Sucesso!",
    description: "Login realizado com sucesso.",
    isOpen: true,
  };

  const alertError = {
    message: "Error!",
    description: "Usuário ou senha incorretos.",
    isOpen: true,
  };

  const navigate = useNavigate();
  const { login } = useApi();
  const { isMobile } = useBreakpoints();

  const { setAuth, isLogged } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(user);

      if (response.status === 201) {
        setAlert(alertSuccess);

        setAuth({ accessKey: response.data, isLogged: true });
        setIsLoading(false);

        navigate(HOME_ROUTE);
      }

      setAlert(alertError);
      setIsLoading(false);
    } catch (err) {
      setAlert(alertError);
      setIsLoading(false);
      console.error(err);
    }
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsGoogleLoading(false);
      setAlert(alertSuccess);

      navigate(HOME_ROUTE);
    } catch (error) {
      console.error(error);
      setIsGoogleLoading(false);
      setAlert(alertError);
    }
  }

  function togglePasswordVisibility() {
    setPasswordIsVisible((prev) => !prev);
  }

  const renderLoginHeader = () => (
    <section className={styles.header}>
      <img src={Logo} alt="Logo De olho no foco" className={styles.logo} />
      <h1>De olho no foco</h1>
      <p>Faça login para reportar e compartilhar denúncias ambientais!</p>
    </section>
  );

  const renderPasswordVisibilityIcons = () => {
    return (
      <>
        {passwordIsVisible ? (
          <Eye size={16} onClick={togglePasswordVisibility} />
        ) : (
          <EyeClosed size={16} onClick={togglePasswordVisibility} />
        )}
      </>
    );
  };

  if (isLogged) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return (
    <div className={styles.container}>
      <Alert />
      <main className={styles.loginWrapper}>
        <img
          src={LoginBackground}
          alt="floresta bem verde"
          className={styles.loginBackground}
        />

        {isMobile ? renderLoginHeader() : ""}

        <form onSubmit={handleLogin} className={styles.form}>
          {!isMobile ? renderLoginHeader() : ""}
          <div className={styles.formContainer}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={user.username}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, username: e.target.value }))
                  }
                  required
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="password">Senha</label>
                <Input
                  id="password"
                  type={passwordIsVisible ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={user.password}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
                />
                {renderPasswordVisibilityIcons()}
              </div>
            </div>

            <Button
              label="Entrar"
              isLoading={isLoading}
              type="submit"
              className={styles.loginButton}
            />

            <div className={styles.socialLogin}>
              <GoogleLoginButton
                onClick={handleGoogleLogin}
                isLoading={isGoogleLoading}
              />
            </div>

            <div className={styles.formFooter}>
              <p className={styles.signup}>
                Não possui uma conta? <Link to={SIGNUP_ROUTE}>Criar conta</Link>
              </p>
              <p className={styles.signup}>
                Conta para organizações?
                <Link to={SIGNUP_ROUTE}> Clique aqui</Link>
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
