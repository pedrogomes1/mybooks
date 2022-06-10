import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookBookmark } from "phosphor-react";

import { BooksList } from "../../components/BooksList";
import { DialogBookDetail } from "../../components/DialogBookDetail";

import styles from "./Favorites.module.css";
import { BookProps } from "../../components/Books";

export function Favorites() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookProps[]>([]);
  const [isOpenBookDialogDetail, setIsOpenBookDialogDetail] = useState(false);
  const [bookSelected, setBookSelected] = useState({} as BookProps);

  useEffect(() => {
    function getAllFavoriteBooks() {
      const booksAlreadyFavorites = localStorage.getItem("mybooks") || "[]";
      const favoriteBooks = JSON.parse(booksAlreadyFavorites);

      setBooks(favoriteBooks);
    }
    getAllFavoriteBooks();
  }, []);

  function handleToggleBookDialogDetail() {
    setIsOpenBookDialogDetail((prev) => !prev);
  }

  function handleNavigateToHome() {
    navigate("/");
  }

  function handleSelectBook(book: BookProps) {
    setBookSelected(book);
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
        onSelectBook={handleSelectBook}
        onToggleBookDialogDetail={handleToggleBookDialogDetail}
        onRemoveFavoriteBookToList={handleRemoveFavoriteBookToList}
        isFavorite
      />

      {isOpenBookDialogDetail && (
        <DialogBookDetail
          isOpen={isOpenBookDialogDetail}
          onClose={handleToggleBookDialogDetail}
          book={bookSelected}
        />
      )}
    </main>
  );
}
