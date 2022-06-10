import { useState, useEffect } from "react";
import axios from "axios";

import { Header } from "../../components/Header";
import { BooksList } from "../../components/BooksList";
import { InputSearch } from "../../components/InputSearch";

import styles from "./Home.module.css";
import useDebounce from "../../hooks/useDebounce";

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
export interface RequestBookProps {
  items: {
    id: string;
    volumeInfo: BookProps;
  }[];
}

const TIME_IN_MILLISECONDS_FOR_DEBOUNCE = 800;

function getBooksFormatted(data: RequestBookProps) {
  const books = data.items.map(({ id, volumeInfo }) => {
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
      authors,
      categories,
      description,
      imageLinks,
      previewLink,
      publishedDate: new Date(publishedDate).toLocaleDateString("pt-br", {
        timeZone: "UTC",
      }),
      publisher,
    };
  });

  return books;
}

function filterBooksWithoutFavorites(
  books: BookProps[],
  allFavoriteBooksIds: string[]
) {
  return books.filter((book) => !allFavoriteBooksIds.includes(book.id));
}

export function Home() {
  const [bookNameSearch, setBookNameSearch] = useState("react");
  const [books, setBooks] = useState<BookProps[]>([]);

  const debouncedValue = useDebounce<string>(
    bookNameSearch,
    TIME_IN_MILLISECONDS_FOR_DEBOUNCE
  );

  const URL_GET_BOOKS = `https://www.googleapis.com/books/v1/volumes?q=${bookNameSearch}&key=${
    import.meta.env.VITE_API_KEY
  }`;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await axios.get<RequestBookProps>(URL_GET_BOOKS);

        const allFavoriteBooksIds = getAllIdsOfFavoriteBooks();
        const booksFormatted = getBooksFormatted(data);

        const booksWithoutFavorites = filterBooksWithoutFavorites(
          booksFormatted,
          allFavoriteBooksIds
        );

        setBooks(booksWithoutFavorites);
      } catch (error) {
        alert(error);
      }
    }
    fetchBooks();
  }, [debouncedValue]);

  function getAllIdsOfFavoriteBooks() {
    const booksAlreadyFavorites = localStorage.getItem("mybooks") || "[]";
    const books = JSON.parse(booksAlreadyFavorites);
    return books.map((book: BookProps) => book.id);
  }

  function handleRemoveFavoriteBookToList(bookId: string) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  }

  function handleSearchBook(bookName: string) {
    setBookNameSearch(bookName);
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <InputSearch onChange={handleSearchBook} />
        {!!books.length && (
          <BooksList
            books={books}
            onRemoveFavoriteBookToList={handleRemoveFavoriteBookToList}
          />
        )}
      </main>
    </>
  );
}
