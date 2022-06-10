import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookBookmark } from "phosphor-react";

import { BookProps } from "../../hooks/useBooks";
import { BooksList } from "../../components/BooksList";

import styles from "./Favorites.module.css";

export function Favorites() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    function getAllFavoriteBooks() {
      const booksAlreadyFavorites = localStorage.getItem("mybooks") || "[]";
      const favoriteBooks = JSON.parse(booksAlreadyFavorites);

      setBooks(favoriteBooks);
    }
    getAllFavoriteBooks();
  }, []);

  function handleNavigateToHome() {
    navigate("/");
  }

  function handleRemoveFavoriteBookToList(bookId: string) {
    const newBooks = books.filter((book) => book.id !== bookId);
    setBooks(newBooks);
    localStorage.setItem("mybooks", JSON.stringify(newBooks));
  }

  return (
    <main className={styles.container}>
      <header>
        <button title="Voltar para home" onClick={handleNavigateToHome}>
          <ArrowLeft size={40} />
        </button>
        <h1>
          Meus Favoritos
          <BookBookmark size={30} />
        </h1>
      </header>

      <BooksList
        books={books}
        onRemoveFavoriteBookToList={handleRemoveFavoriteBookToList}
        isFavorite
      />
    </main>
  );
}
