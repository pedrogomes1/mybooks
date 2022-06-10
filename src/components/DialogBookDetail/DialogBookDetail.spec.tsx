import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { DialogBookDetail } from ".";

const mockedOnClose = jest.fn();

const bookMocked = {
  id: "MWkOEAAAQBAJ",
  title: "React Aprenda Praticando",
  subtitle:
    "Desenvolva aplicações web reais com uso da biblioteca React e de seus módulos auxiliares",
  authors: ["Mauricio Samy Silva", "Jose da Silva"],
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

describe("DialogBookDetail component", () => {
  beforeEach(() => {
    render(
      <DialogBookDetail isOpen onClose={mockedOnClose} book={bookMocked} />
    );
  });

  it("should render elements", () => {
    const bookImage = screen.getByRole("img", {
      name: "Imagem representativa do livro",
    });
    const bookTitle = screen.getByTestId("title");
    const bookAuthors = screen.getByTestId("authors");
    const bookEditors = screen.getByTestId("editors");

    expect(bookImage).toBeInTheDocument();
    expect(bookTitle).toBeInTheDocument();
    expect(bookAuthors).toBeInTheDocument();
    expect(bookEditors).toBeInTheDocument();
  });

  it("should close modal when close button is pressed", async () => {
    const user = userEvent.setup();
    const closeButton = screen.getByTestId("close-button");

    await user.click(closeButton);

    expect(mockedOnClose).toHaveBeenCalled();
  });

  it("should render a default image when there is no thumbnail", () => {
    const { imageLinks, ...rest } = bookMocked;
    render(<DialogBookDetail isOpen onClose={mockedOnClose} book={rest} />);

    const bookImage = screen.getAllByRole("img", {
      name: "Imagem representativa do livro",
    });

    expect(bookImage[0]).toBeInTheDocument();
  });
});
