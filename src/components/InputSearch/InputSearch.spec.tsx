import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { InputSearch } from ".";

const onChange = jest.fn();

describe("InputSearch component", () => {
  beforeEach(() => {
    render(<InputSearch onChange={onChange} />);
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

  it("should call the onChange function to fetch a new book", async () => {
    const user = userEvent.setup();
    const inputSearch = screen.getByPlaceholderText(
      "Digite um livro para a busca"
    );

    await user.type(inputSearch, "React native");
    expect(onChange).toHaveBeenCalledWith("React native");
  });
});
