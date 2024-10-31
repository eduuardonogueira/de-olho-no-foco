import React, { useState } from 'react';
import styles from './login.module.scss';
import icon from '../../assets/icons/image 1.png';
import googleIcon from '../../assets/icons/googleIcon.png'; // Adicione o caminho do ícone do Google

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={icon} alt="Logo De olho no foco" className={styles.logo} />
        <h1>De olho no foco</h1>
        <p>Faça login para reportar e compartilhar focos de queimadas</p>
      </div>
      
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className={styles.btn}>Entrar</button>
        
        <div className={styles.socialLogin}>
          <button type="button" className={styles.googleButton}>
            <img src={googleIcon} alt="Google logo" className={styles.googleIcon} /> {/* Ícone do Google */}
            Continuar com o Google
          </button>
        </div>
        
        <div className={styles.footer}>
          Não possui uma conta? <a href="#">Crie conta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
