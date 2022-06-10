import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { BookCard } from ".";

const bookMocked = {
  id: "MWkOEAAAQBAJ",
  title: "React Aprenda Praticando",
  subtitle:
    "Desenvolva aplicações web reais com uso da biblioteca React e de seus módulos auxiliares",
  authors: ["Mauricio Samy Silva"],
  publisher: "Novatec Editora",
  publishedDate: "2021-01-05",
  description:
    "React é uma biblioteca para a criação de sites, interfaces gráficas e aplicações web, criada pelo Facebook, e seu uso tem crescido muito, sendo usada por grandes empresas, como Netflix, Walmart e The New York Times. Neste livro, eminentemente prático, Maujor, com sua reconhecida didática, fornece ao leitor uma visão detalhada dos conceitos básicos e recursos da biblioteca React. Você aprenderá a desenvolver aplicativos React completos, passo a passo, desde o zero até a hospedagem em um servidor remoto. Cada capítulo apresenta um novo recurso do React, com exercícios práticos para consolidar os conceitos estudados. Destina-se a desenvolvedores com conhecimentos básicos de HTML, CSS3 e JavaScript, interessados na criação de sites tanto na área de design quanto na de desenvolvimento e programação. O livro também poderá ser útil como material de referência do React. A estrutura de pastas dos projetos desenvolvidos no livro encontra-se em https://github.com/Maujor/livro-react e o respectivo material de apoio aos projetos está disponível no site do livro em https://kwz.me/h1m.",
  categories: ["Business & Economics"],
  previewLink: "",
  imageLinks: {
    thumbnail:
      "http://books.google.com/books/content?id=MWkOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
};

const mockedOnToggleBookDialogDetail = jest.fn();
const mockedOnSelectBook = jest.fn();
const mockedOnRemoveFavoriteBookToList = jest.fn();
const setItem = jest.spyOn(Storage.prototype, "setItem");

describe("BookCard component", () => {
  beforeEach(() => {
    render(
      <BookCard
        book={bookMocked}
        onSelectBook={mockedOnSelectBook}
        onToggleBookDialogDetail={mockedOnToggleBookDialogDetail}
        onRemoveFavoriteBookToList={mockedOnRemoveFavoriteBookToList}
      />
    );
  });

  it("should render card information", () => {
    const bookImage = screen.getByRole("img", {
      name: "Imagem representativa do livro",
    });
    const categoriesList = screen.getByRole("list");
    const favoriteButton = screen.getByTitle("Adicionar aos favoritos");
    const bookTitle = screen.getByTestId("book-title");
    const bookDescription = screen.getByTestId("book-description");
    const publishDate = screen.getByTestId("book-publishedAt");
    const detailsButton = screen.getByRole("button", { name: "Detalhes" });

    expect(bookImage).toBeInTheDocument();
    expect(categoriesList).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(bookTitle).toBeInTheDocument();
    expect(bookDescription).toBeInTheDocument();
    expect(publishDate).toBeInTheDocument();
    expect(detailsButton).toBeInTheDocument();
  });

  it("should render click on details button", async () => {
    const user = userEvent.setup();

    const detailsButton = screen.getByRole("button", { name: "Detalhes" });

    await user.click(detailsButton);

    expect(mockedOnToggleBookDialogDetail).toHaveBeenCalled();
    expect(mockedOnSelectBook).toHaveBeenCalledWith(bookMocked);
  });

  it("should display the filled heart icon and change its title to 'Remover dos favoritos' when using isFavorite prop", () => {
    render(
      <BookCard
        book={bookMocked}
        onSelectBook={mockedOnSelectBook}
        onToggleBookDialogDetail={mockedOnToggleBookDialogDetail}
        onRemoveFavoriteBookToList={mockedOnRemoveFavoriteBookToList}
        isFavorite
      />
    );
    const favoriteButton = screen.getByTitle("Remover dos favoritos");
    const heartIcon = screen.getAllByTestId("heart-svg")[0];

    expect(heartIcon.getAttribute("stroke")).not.toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it("should mark the book as a favorite", async () => {
    const user = userEvent.setup();

    const favoriteButton = screen.getByTitle("Adicionar aos favoritos");

    await user.click(favoriteButton);

    expect(setItem).toHaveBeenCalledWith(
      "mybooks",
      JSON.stringify([bookMocked])
    );
  });

  it("should render a default image when there is no thumbnail", () => {
    const { imageLinks, ...rest } = bookMocked;
    render(
      <BookCard
        book={rest}
        onSelectBook={mockedOnSelectBook}
        onToggleBookDialogDetail={mockedOnToggleBookDialogDetail}
        onRemoveFavoriteBookToList={mockedOnRemoveFavoriteBookToList}
        isFavorite
      />
    );

    const bookImage = screen.getAllByRole("img", {
      name: "Imagem representativa do livro",
    });

    expect(bookImage[0]).toBeInTheDocument();
  });
});
