import { MagnifyingGlass } from "phosphor-react";
import { ChangeEvent } from "react";
import styles from "./InputSearch.module.css";

interface InputSearchProps {
  onChange: (value: string) => void;
}

export function InputSearch({ onChange }: InputSearchProps) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <>
      <div className={styles.containerSearch}>
        <MagnifyingGlass
          className={styles.iconSearch}
          size={32}
          color="#8d8d99"
        />
        <input
          autoFocus
          type="text"
          placeholder="Digite um livro para a busca"
          onChange={handleInputChange}
        />
      </div>
      <i className={styles.suggestionsBooks}>(Ex: React, Javascript, Java)</i>
    </>
  );
}
