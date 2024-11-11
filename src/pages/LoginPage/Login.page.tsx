import React, { useState } from 'react';
import styles from './login.module.scss';
import icon from '../../assets/icons/image 1.png';
import InputField from '../../components/InputField/InputField.components';
import Button from '../../components/Button/Button.components';
import SocialLoginButton from '../../components/SocialLoginButton/SocialLoginButton.components';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    // Simulação de atraso para o carregamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert("Login com sucesso!"); // Exibe o alerta de sucesso
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={icon} alt="Logo De olho no foco" className={styles.logo} />
        <h1>De olho no foco</h1>
        <p>Faça login para reportar e compartilhar focos de queimadas</p>
      </div>
      
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <InputField
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <InputField
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button type="submit">Entrar</Button>
        
        <div className={styles.socialLogin}>
          <SocialLoginButton onClick={handleGoogleLogin} isLoading={isLoading} />
        </div>
        
        <div className={styles.footer}>
          Não possui uma conta? <a href="#">Crie conta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
