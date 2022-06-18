import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function Pagination({
  currentPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;

  return (
    <div className={styles.actionsButton}>
      <button
        className={styles.button}
        onClick={onPreviousPage}
        disabled={isFirstPage}
      >
        Anterior
      </button>
      <span>{currentPage}</span>
      <button className={styles.button} onClick={onNextPage}>
        Próxima
      </button>
    </div>
  );
}
