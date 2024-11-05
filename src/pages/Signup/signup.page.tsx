import { useState } from "react";
import styles from "./signup.module.scss";

export const Signup = () => {
  const [text, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordStrength(value.length < 8 ? 'Fraca' : 'Forte');

  }
  return (

    <div className={styles.container}>
      <h2>Criar conta</h2>

      <form>
        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <input 
          type="text" 
          placeholder="John Doe" 
          onChange={(e) => setName(e.target.value)}
          required
          />
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
          <span className={`${styles.passwordStrength} ${passwordStrength === 'Fraca' ? styles.weak : styles.strong}`}>
            {passwordStrength}
          </span>
        </div>
        
        <div className={styles.inputGroup}>
          <label>Confirme sua senha</label>
          <input 
          type="password" 
          placeholder="Digite sua senha" 
          />
        </div>
        
        <button  className={styles.submitButton}
          type="submit"
          >Criar Conta
        </button>
      </form>
    </div>
  )
}