import Dialog from "react-modal";
import { X } from "phosphor-react";
import styles from "./DialogBookDetail.module.css";

Dialog.setAppElement("#root");

interface DialogBookDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DialogBookDetail({ isOpen, onClose }: DialogBookDetailProps) {
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
        <img src="https://books.google.com/books/content?id=MWkOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        <h2>React.Js Essentials</h2>
        <h4>
          Desenvolva aplicações web reais com uso da biblioteca React e de seus
          módulos auxiliares
        </h4>
        <span>Autores: Mauricio Samy Silva</span>
        <span>Editora: Novatec Editora</span>
      </main>

      <p className={styles.description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos magni
        nisi temporibus iusto tempore unde, sint beatae qui inventore, saepe ea
        reiciendis laboriosam dolorum! Facilis quos rerum nulla sapiente fuga.
      </p>
    </Dialog>
  );
}
