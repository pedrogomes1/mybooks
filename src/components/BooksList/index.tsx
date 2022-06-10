import { BookCard } from "../BookCard";
import { BookProps } from "../Books";
import styles from "./BooksList.module.css";

interface BooksList {
  books: BookProps[];
  onSelectBook: (book: BookProps) => void;
  onToggleBookDialogDetail: () => void;
  onRemoveFavoriteBookToList?: (bookId: string) => void;
  isFavorite?: boolean;
}

export function BooksList({
  books,
  onSelectBook,
  onToggleBookDialogDetail,
  onRemoveFavoriteBookToList,
  isFavorite,
}: BooksList) {
  return (
    <ul className={styles.booksList}>
      {books.map((book) => (
        <li key={book.id}>
          <BookCard
            book={book}
            onSelectBook={onSelectBook}
            onToggleBookDialogDetail={onToggleBookDialogDetail}
            onRemoveFavoriteBookToList={onRemoveFavoriteBookToList}
            isFavorite={isFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
