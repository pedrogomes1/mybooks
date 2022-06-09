import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("should render image app logo", () => {
    expect(
      screen.getByRole("img", {
        name: "Logo da aplicação contendo símbolo de chaves da cor roxa, e com o nome MyBooks no centro e da cor cinza claro",
      })
    ).toBeInTheDocument();
  });

  it("should render image button favorite link", () => {
    expect(screen.getByRole("link", { name: "Favoritos" })).toBeInTheDocument();
  });
});
