import { MagnifyingGlass } from "phosphor-react";
import styles from "./InputSearch.module.css";

export function InputSearch() {
  return (
    <>
      <div className={styles.containerSearch}>
        <input type="text" placeholder="Digite um livro para a busca" />
        <MagnifyingGlass size={32} color="#8d8d99" />
      </div>
      <i className={styles.suggestionsBooks}>(Ex: React, Javascript, Java)</i>
    </>
  );
}
