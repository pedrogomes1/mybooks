import styles from "./ChipCategories.module.css";

export function ChipCategories({ categories }: { categories: string[] }) {
  return (
    <div className={styles.container} title="Computer">
      {categories.map((category) => (
        <span key={category}>{category}</span>
      ))}
    </div>
  );
}
