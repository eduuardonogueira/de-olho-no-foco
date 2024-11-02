import { useState } from "react";
import styles from "./signup.module.scss";

export const Signup = () => {
  const [name, setName] = useState("");

  console.log(name);

  return (
    <main>
      <h1 className={styles.title}>Criar conta</h1>
      <form action="" className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name" className={styles.label}>
            Nome completo
          </label>
          <input
            name="name"
            type="text"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
    </main>
  );
};
