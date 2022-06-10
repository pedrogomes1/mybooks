import { useState, useEffect } from "react";
import axios from "axios";
import BeatSpinnerLoader from "react-spinners/BeatLoader";

import { Header } from "../../components/Header";
import { BooksList } from "../../components/BooksList";
import { InputSearch } from "../../components/InputSearch";

import styles from "./Home.module.css";
import useDebounce from "../../hooks/useDebounce";

export interface BookProps {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  previewLink: string;
  imageLinks?: {
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

export enum RequestStatus {
  idle = "idle",
  empty = "empty",
  loading = "loading",
  success = "success",
  error = "error",
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
  const { idle, empty, error, loading, success } = RequestStatus;

  const [bookNameSearch, setBookNameSearch] = useState("react");
  const [books, setBooks] = useState<BookProps[]>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);

  const debouncedValue = useDebounce<string>(
    bookNameSearch,
    TIME_IN_MILLISECONDS_FOR_DEBOUNCE
  );

  const URL_GET_BOOKS = `https://www.googleapis.com/books/v1/volumes?q=${bookNameSearch}&key=${process.env.VITE_API_KEY}`;

  useEffect(() => {
    async function fetchBooks() {
      setStatus(loading);
      try {
        const { data } = await axios.get<RequestBookProps>(URL_GET_BOOKS);

        const allFavoriteBooksIds = getAllIdsOfFavoriteBooks();
        const booksFormatted = getBooksFormatted(data);

        const booksWithoutFavorites = filterBooksWithoutFavorites(
          booksFormatted,
          allFavoriteBooksIds
        );

        setBooks(booksWithoutFavorites);
        setStatus(booksWithoutFavorites.length ? success : empty);
      } catch (err) {
        setStatus(error);
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
        {status === loading ? (
          <div className={styles.feedback}>
            <BeatSpinnerLoader color="#996DFF" />
          </div>
        ) : status === error ? (
          <h3 className={styles.feedback}>
            Erro ao carregar os livros. Por favor, tente novamente mais tarde.
          </h3>
        ) : status === empty ? (
          <h3 className={styles.feedback}>Nenhum livro encontrado.</h3>
        ) : (
          <BooksList
            books={books}
            onRemoveFavoriteBookToList={handleRemoveFavoriteBookToList}
          />
        )}
      </main>
    </>
  );
}
