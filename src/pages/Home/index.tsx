import { useState } from "react";
import BeatSpinnerLoader from "react-spinners/BeatLoader";

import { Header } from "../../components/Header";
import { BooksList } from "../../components/BooksList";
import { InputSearch } from "../../components/InputSearch";

import styles from "./Home.module.css";
import { useBooks } from "../../hooks/useBooks";

export function Home() {
  const [bookNameSearch, setBookNameSearch] = useState("react");

  const { books, setBooks, status } = useBooks(bookNameSearch);

  function handleRemoveFavoriteBookToList(bookId: string) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  }

  function handleSearchBook(bookName: string) {
    setBookNameSearch(bookName);
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <InputSearch onChange={handleSearchBook} />
        {status === "loading" ? (
          <div className={styles.feedback}>
            <BeatSpinnerLoader color="#996DFF" />
          </div>
        ) : status === "error" ? (
          <h3 className={styles.feedback}>
            Erro ao carregar os livros. Por favor, tente novamente mais tarde.
          </h3>
        ) : status === "empty" ? (
          <h3 className={styles.feedback}>Nenhum livro encontrado.</h3>
        ) : (
          <BooksList
            books={books}
            onRemoveFavoriteBookToList={handleRemoveFavoriteBookToList}
          />
        )}
      </main>
    </>
  );
}
