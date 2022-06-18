import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";
import { RequestStatus } from "../types/status";

function getAllIdsOfFavoriteBooks(): string[] {
  const booksAlreadyFavorites = localStorage.getItem("mybooks") || "[]";
  const books = JSON.parse(booksAlreadyFavorites);
  return books.map((book: BookProps) => book.id);
}

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

export interface BookProps {
  id: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  previewLink: string;
  imageLinks?: {
    thumbnail: string;
  };
  categories?: string[];
}
export interface RequestBookProps {
  items: {
    id: string;
    volumeInfo: BookProps;
  }[];
}

const { idle, empty, error, loading, success } = RequestStatus;

const TIME_IN_MILLISECONDS_FOR_DEBOUNCE = 800;
const MAX_RESULTS_PER_PAGE = 10;

export const useBooks = (bookNameSearch: string) => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);

  const [startIndex, setStartIndex] = useState(MAX_RESULTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const URL_GET_BOOKS = `https://www.googleapis.com/books/v1/volumes?q=${bookNameSearch}&startIndex=${startIndex}`;

  const debouncedValue = useDebounce<string>(
    bookNameSearch,
    TIME_IN_MILLISECONDS_FOR_DEBOUNCE
  );

  const handleNextPage = useCallback(() => {
    setStartIndex((prevStartIndex) => prevStartIndex + MAX_RESULTS_PER_PAGE);
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setStartIndex((prevStartIndex) => prevStartIndex - MAX_RESULTS_PER_PAGE);
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }, []);

  const fetchBooks = useCallback(async () => {
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
  }, [debouncedValue, startIndex]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    setBooks,
    status,
    currentPage,
    handleNextPage,
    handlePreviousPage,
  };
};
