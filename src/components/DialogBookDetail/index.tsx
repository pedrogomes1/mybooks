import Dialog from "react-modal";
import { X } from "phosphor-react";

import { BookProps } from "../../pages/Home";
import notFoundBookImage from "../../assets/book-not-found.jpg";

import styles from "./DialogBookDetail.module.css";

Dialog.setAppElement("#root");

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
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.dialog}
      overlayClassName={styles.overlay}
    >
      <header>
        <button title="Fechar detalhes" onClick={onClose}>
          <X size={30} />
        </button>
      </header>

      <main>
        <img src={book.imageLinks?.thumbnail || notFoundBookImage} />
        <h2>{book.title}</h2>
        <h4>{book.subtitle}</h4>
        <span>Autores: {book.authors.map((author) => author)}</span>
        <span>Editor(a): {book.publisher}</span>
      </main>

      <p className={styles.description}>{book.description}</p>
    </Dialog>
  );
}
