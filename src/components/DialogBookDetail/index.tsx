import { Modal as Dialog } from "react-responsive-modal";

import { BookProps } from "../../pages/Home";
import notFoundBookImage from "../../assets/book-not-found.jpg";

import styles from "./DialogBookDetail.module.css";
import "react-responsive-modal/styles.css";

interface DialogBookDetailProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookProps;
}

export function DialogBookDetail({
  isOpen,
  onClose,
  book,
}: DialogBookDetailProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      center
      classNames={{
        overlay: styles.overlay,
        modal: styles.dialog,
        closeIcon: styles.closeIcon,
      }}
      aria-labelledby={book.title}
      aria-describedby={book.description}
    >
      <main>
        <img
          src={book.imageLinks?.thumbnail || notFoundBookImage}
          alt="Imagem representativa do livro"
        />
        <h2 data-testid="title">{book.title}</h2>
        {book.subtitle && <h4>{book.subtitle}</h4>}
        <span data-testid="authors">
          Autores: {book.authors.map((author) => author)}
        </span>
        <span data-testid="editors">Editor(a): {book.publisher}</span>
      </main>

      <p className={styles.description}>{book.description}</p>
    </Dialog>
  );
}
