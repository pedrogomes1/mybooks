import { useState } from "react";

import { BookProps } from "../../hooks/useBooks";
import { BookCard } from "../BookCard";
import { DialogBookDetail } from "../DialogBookDetail";

import styles from "./BooksList.module.css";

interface BooksListProps {
  books: BookProps[];
  onRemoveFavoriteBookToList?: (bookId: string) => void;
  isFavorite?: boolean;
}

export function BooksList({
  books,
  onRemoveFavoriteBookToList,
  isFavorite,
}: BooksListProps) {
  const [isOpenBookDialogDetail, setIsOpenBookDialogDetail] = useState(false);
  const [bookSelected, setBookSelected] = useState({} as BookProps);

  function handleToggleBookDialogDetail() {
    setIsOpenBookDialogDetail((prev) => !prev);
  }

  function handleSelectBook(book: BookProps) {
    setBookSelected(book);
  }

  return (
    <>
      <ul data-testid="books-list" className={styles.booksList}>
        {books.map((book) => (
          <li data-testid="books-listitem" key={book.id}>
            <BookCard
              book={book}
              onSelectBook={handleSelectBook}
              onToggleBookDialogDetail={handleToggleBookDialogDetail}
              onRemoveFavoriteBookToList={onRemoveFavoriteBookToList}
              isFavorite={isFavorite}
            />
          </li>
        ))}
      </ul>

      {isOpenBookDialogDetail && (
        <DialogBookDetail
          isOpen={isOpenBookDialogDetail}
          onClose={handleToggleBookDialogDetail}
          book={bookSelected}
        />
      )}
    </>
  );
}
