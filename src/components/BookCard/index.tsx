import { Heart } from "phosphor-react";
import { ChipCategories } from "../ChipCategories";

import { BookProps } from "../../hooks/useBooks";
import notFoundBookImage from "../../assets/book-not-found.jpg";

import styles from "./BookCard.module.css";

interface BookCardProps {
  book: BookProps;
  onToggleBookDialogDetail: () => void;
  onSelectBook: (book: BookProps) => void;
  onRemoveFavoriteBookToList?: (bookId: string) => void;
  isFavorite?: boolean;
}

export function BookCard({
  book,
  onToggleBookDialogDetail,
  onSelectBook,
  onRemoveFavoriteBookToList,
  isFavorite = false,
}: BookCardProps) {
  function handleClickDetailsBook() {
    onToggleBookDialogDetail();
    onSelectBook(book);
  }

  function handleAddBookToFavorite(book: BookProps) {
    const booksAlreadyFavorites = localStorage.getItem("mybooks") || "[]";
    const books = JSON.parse(booksAlreadyFavorites);

    const newBooks = [...books, book];
    localStorage.setItem("mybooks", JSON.stringify(newBooks));

    if (onRemoveFavoriteBookToList) onRemoveFavoriteBookToList(book.id);
  }

  return (
    <div className={styles.container}>
      <img
        src={book.imageLinks?.thumbnail || notFoundBookImage}
        alt="Imagem representativa do livro"
        loading="lazy"
      />
      <div className={styles.content}>
        <ul className={styles.categoryChipList}>
          {book.categories?.length && (
            <li>
              <ChipCategories categories={book.categories} />
            </li>
          )}
          <button
            title={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            className={styles.favoriteButton}
            onClick={() => handleAddBookToFavorite(book)}
          >
            <Heart
              data-testid="heart-svg"
              size={30}
              weight={isFavorite ? "fill" : "regular"}
            />
          </button>
        </ul>

        <h3 data-testid="book-title">{book.title}</h3>
        <p data-testid="book-description" className={styles.description}>
          {book.description}
        </p>
        <div className={styles.containerPublishDate}>
          <h4>Publicado em:</h4>
          <time dateTime={book.publishedDate} data-testid="book-publishedAt">
            {book.publishedDate}
          </time>
        </div>
        <button
          onClick={handleClickDetailsBook}
          className={styles.detailsButton}
        >
          Detalhes
        </button>
      </div>
    </div>
  );
}
