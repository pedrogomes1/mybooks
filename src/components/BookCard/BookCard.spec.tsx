import { render, screen } from "@testing-library/react";
import { BookCard } from ".";

describe("BookCard component", () => {
  beforeEach(() => {
    render(<BookCard />);
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
});
