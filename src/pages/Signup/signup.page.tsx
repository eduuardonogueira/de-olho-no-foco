import { useState } from "react";
import styles from "./signup.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "@constants/routes";
import { ArrowCircleLeft, IdentificationBadge } from "@phosphor-icons/react";

export const Signup = () => {
  const navigate = useNavigate();
  const [text, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordStrength(value.length < 8 ? "Fraca" : "Forte");

    //   const handlePhoneChange = (value: string) => {
    //   let cleaned = value.replace(/\D/g, '');

    //   if (cleaned.length > 2) cleaned = +${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)} ;
    //   if (cleaned.length > 6) cleaned += ) ${cleaned.slice(4, 8)};
    //   if (cleaned.length > 10) cleaned += -${cleaned.slice(8, 11)};

    //   return cleaned;
    // };
  };

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(HOME_ROUTE);
  }

  return (
    <div className={styles.container}>
      <main className={styles.signupContainer}>
        <div className={styles.titleWrapper}>
          <Link to={LOGIN_ROUTE}>
            <ArrowCircleLeft size={30}  className={styles.icon}/>
          </Link>
          <h2>Criar conta</h2>
        </div>

        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className={styles.inputGroup}>
            <label>Nome Completo</label>

            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
              <div className={styles.IdentificationBadge}>
              <IdentificationBadge size={22} className={styles.badge}/>
              </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Telefone</label>
            <input
              type="tel" 
              placeholder="+XX (XX) XXXX-XXX" 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="johndoe@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className={`${styles.passwordStrength} ${
                passwordStrength === "Fraca" ? styles.weak : styles.strong
              }`}
            >
              {passwordStrength}
            </span>
          </div>

          <div className={styles.inputGroup}>
            <label>Confirme sua senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" />
          </div>

          <button className={styles.submitButton} type="submit">
            Criar Conta
          </button>
        </form>
      </main>
    </div>
  );
};
