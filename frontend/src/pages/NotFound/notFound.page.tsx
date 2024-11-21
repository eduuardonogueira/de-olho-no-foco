import { LOGIN_ROUTE } from "@constants/routes";
import styles from "./notFound.module.scss";
import { Link } from "react-router-dom";
import { NotFoundImage } from "@assets/img";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <section className={styles.notFountWrapper}>
        <img src={NotFoundImage} className={styles.image} alt="Page not found image" />
        <h1 className={styles.title}>OPS! NÃO ENCONTRAMOS ESSA PÁGINA!</h1>
        <Link to={LOGIN_ROUTE} className={styles.button}>Voltar para o ínicio</Link>
      </section>
    </div>
  );
};
