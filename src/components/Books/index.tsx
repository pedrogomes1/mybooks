import { BookCard } from "../BookCard";
import { InputSearch } from "../InputSearch";

import styles from "./Books.module.css";

export function Books() {
  return (
    <main className={styles.container}>
      <InputSearch />
      <ul className={styles.booksList}>
        <li>
          <BookCard />
        </li>
      </ul>
    </main>
  );
}
