import { Modal as Dialog } from "react-responsive-modal";

import { BookProps } from "../../hooks/useBooks";
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
  const hasManyAuthors = book.authors.length > 1;

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
        <div>
          <h4>Autores:</h4>
          <span data-testid="authors">
            {book.authors.map((author) =>
              hasManyAuthors ? `${author} | ` : author
            )}
          </span>
        </div>
        <div>
          <h4>Editor(a):</h4>
          <span data-testid="editors">{book.publisher}</span>
        </div>
      </main>

      <p className={styles.description}>{book.description}</p>
    </Dialog>
  );
}
