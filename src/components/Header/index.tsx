import { Heart } from "phosphor-react";
import logo from "../../assets/logo.svg";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img
          src={logo}
          alt="Logo da aplicação contendo símbolo de chaves da cor roxa, e com o nome MyBooks no centro e da cor cinza claro"
        />
        <a href="#" className={styles.favoriteLink}>
          <Heart size={24} />
          Favoritos
        </a>
      </div>
    </header>
  );
}
