import { useState, useCallback } from "react";
import BeatSpinnerLoader from "react-spinners/BeatLoader";

import { Header } from "../../components/Header";
import { BooksList } from "../../components/BooksList";
import { InputSearch } from "../../components/InputSearch";

import { useBooks } from "../../hooks/useBooks";
import { RequestStatus } from "../../types/status";

import styles from "./Home.module.css";

const { error, loading, empty } = RequestStatus;

export function Home() {
  const [bookNameSearch, setBookNameSearch] = useState("react");

  const { books, setBooks, status } = useBooks(bookNameSearch);

  const handleRemoveFavoriteBookToList = useCallback(
    (bookId: string) => {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    },
    [setBooks]
  );

  const handleSearchBook = useCallback((bookName: string) => {
    const bookNameSearch = bookName.trimEnd();

    if (bookNameSearch.length) {
      setBookNameSearch(bookNameSearch);
    }
  }, []);

  return (
    <>
      <Header />
      <main className={styles.container}>
        <InputSearch onChange={handleSearchBook} />
        {status === loading ? (
          <div data-testid="spinner" className={styles.spinner}>
            <BeatSpinnerLoader color="#996DFF" />
          </div>
        ) : status === error ? (
          <h3 className={styles.feedback}>
            Erro ao carregar os livros. Por favor, tente novamente mais tarde.
          </h3>
        ) : status === empty ? (
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
