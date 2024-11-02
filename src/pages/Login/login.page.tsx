import React, { useState } from "react";
import styles from "./login.module.scss";
import { LoginBackground, Logo } from "@assets/img";
import googleIcon from "@assets/icons/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, SIGNUP_ROUTE } from "../../constants/routes";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate(HOME_ROUTE);
  };

  return (
    <main className={styles.container}>
      <img src={LoginBackground} alt="" className={styles.loginBackground} />

      <section className={styles.header}>
        <img src={Logo} alt="Logo De olho no foco" className={styles.logo} />
        <h1>De olho no foco</h1>
        <p>Faça login para reportar e compartilhar focos de queimadas</p>
      </section>

      <form onSubmit={handleLogin} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.btn}>
          Entrar
        </button>

        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleButton}>
            <img
              src={googleIcon}
              alt="Google logo"
              className={styles.googleIcon}
            />
            Continuar com o Google
          </button>
        </div>

        <p className={styles.signup}>
          Não possui uma conta? <Link to={SIGNUP_ROUTE}>Crie conta</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
