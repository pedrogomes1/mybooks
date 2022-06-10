import { Heart } from "phosphor-react";
import { ChipCategories } from "../ChipCategories";

import { BookProps } from "../Books";

import styles from "./BookCard.module.css";

interface BookCardProps {
  book: BookProps;
  onToggleBookDialogDetail: () => void;
  onSelectBook: (book: BookProps) => void;
}

export function BookCard({
  book,
  onToggleBookDialogDetail,
  onSelectBook,
}: BookCardProps) {
  function handleClickDetailsBook() {
    onToggleBookDialogDetail();
    onSelectBook(book);
  }

  return (
    <div className={styles.container}>
      <img
        src={book.imageLinks.thumbnail}
        alt="Imagem representativa do livro"
      />
      <div className={styles.content}>
        <ul className={styles.categoryChipList}>
          <li>
            <ChipCategories />
          </li>
          <button
            title="Adicionar aos favoritos"
            className={styles.favoriteButton}
          >
            <Heart size={30} />
          </button>
        </ul>

        <h3 data-testid="book-title">{book.title}</h3>
        <p data-testid="book-description" className={styles.description}>
          {book.description}
        </p>
        <div className={styles.containerPublishDate}>
          <h4>Publicado em:</h4>
          <time data-testid="book-publishedAt">{book.publishedDate}</time>
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
