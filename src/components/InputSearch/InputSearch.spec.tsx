import { render, screen } from "@testing-library/react";
import { InputSearch } from ".";

describe("InputSearch component", () => {
  beforeEach(() => {
    render(<InputSearch />);
  });

  it("should render input text", () => {
    expect(
      screen.getByPlaceholderText("Digite um livro para a busca")
    ).toBeInTheDocument();
  });

  it("should render text with some options", () => {
    expect(
      screen.getByText("(Ex: React, Javascript, Java)")
    ).toBeInTheDocument();
  });
});