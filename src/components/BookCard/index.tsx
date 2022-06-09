import { Heart } from "phosphor-react";
import { ChipCategories } from "../ChipCategories";

import styles from "./BookCard.module.css";

export function BookCard() {
  return (
    <div className={styles.container}>
      <img src={"https://github.com/pedrogomes1.png"} alt="Card" />
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

        <h3>React.Js Essentials</h3>
        <p className={styles.description}>
          A fast-paced guide to designing and building scalable and maintainable
          web apps with React.jsAbout This Book• Build maintainable and
          performant user interfaces for your web applications using React.js•
          Create reusable React.js components to save time and effort in
          maintaining your user interfaces• Learn how to build a ready-to-deploy
        </p>
        <div className={styles.containerPublishDate}>
          <h4>Publicado em:</h4>
          <time>2021-01-05</time>
        </div>
        <button className={styles.detailsButton}>Detalhes</button>
      </div>
    </div>
  );
}
