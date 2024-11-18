import { MagnifyingGlass } from "@phosphor-icons/react";
import styles from "./searchBar.module.scss";

export const SearchBar = () => {
  return (
    <section className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Procure aqui..."
      ></input>
      <MagnifyingGlass size={24} weight="bold" className={styles.searchIcon} />
    </section>
  );
};

export default SearchBar;
