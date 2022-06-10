import { Heart } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();

  function handleNavigateToFavoritesPage() {
    navigate("/favorites");
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img
          src={logo}
          alt="Logo da aplicação contendo símbolo de chaves da cor roxa, e com o nome MyBooks no centro e da cor cinza claro"
        />
        <button
          className={styles.favoriteButton}
          onClick={handleNavigateToFavoritesPage}
        >
          <Heart size={24} />
          Favoritos
        </button>
      </div>
    </header>
  );
}
