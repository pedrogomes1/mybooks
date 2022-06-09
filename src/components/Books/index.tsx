import { useState, useEffect } from "react";
import axios from "axios";

import { DialogBookDetail } from "../DialogBookDetail";
import { BookCard } from "../BookCard";
import { InputSearch } from "../InputSearch";

import styles from "./Books.module.css";

const URL_GET_BOOKS = `https://www.googleapis.com/books/v1/volumes?q=react&key=${
  import.meta.env.VITE_API_KEY
}`;

export interface BookProps {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  previewLink: string;
  imageLinks: {
    thumbnail: string;
  };
  categories: string[];
}
export interface IRequestBookProps {
  items: {
    id: string;
    volumeInfo: BookProps;
  }[];
}

export function Books() {
  const [bookNameSearch, setBookNameSearch] = useState("");
  const [isOpenBookDialogDetail, setIsOpenBookDialogDetail] = useState(true);
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await axios.get<IRequestBookProps>(URL_GET_BOOKS);
        const booksData = data.items.map(({ id, volumeInfo }) => {
          const {
            title,
            subtitle,
            authors,
            categories,
            description,
            imageLinks,
            previewLink,
            publishedDate,
            publisher,
          } = volumeInfo;
          return {
            id,
            title,
            subtitle,
            categories,
            authors,
            publisher,
            publishedDate: new Date(publishedDate).toLocaleDateString("pt-br", {
              timeZone: "UTC",
            }),
            description,
            previewLink,
            imageLinks,
          };
        });
        setBooks(booksData);
      } catch (error) {
        alert(error);
      }
    }
    fetchBooks();
  }, []);

  const handleToggleBookDialogDetail = () => {
    setIsOpenBookDialogDetail((prev) => !prev);
  };

  return (
    <main className={styles.container}>
      <InputSearch />
      {!!books.length && (
        <ul className={styles.booksList}>
          {books.map((book) => (
            <li key={book.id}>
              <BookCard
                book={book}
                onToggleBookDialogDetail={handleToggleBookDialogDetail}
              />
            </li>
          ))}
        </ul>
      )}

      {isOpenBookDialogDetail && (
        <DialogBookDetail
          isOpen={isOpenBookDialogDetail}
          onClose={handleToggleBookDialogDetail}
        />
      )}
    </main>
  );
}
