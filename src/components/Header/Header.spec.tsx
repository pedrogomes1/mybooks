import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from ".";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("should render elements", () => {
    const imageLogo = screen.getByRole("img", {
      name: "Logo da aplicação contendo símbolo de chaves da cor roxa, e com o nome MyBooks no centro e da cor cinza claro",
    });
    const favoriteButton = screen.getByRole("button", { name: "Favoritos" });

    expect(imageLogo).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it("should redirect to my favorites page when click favorites button", async () => {
    const user = userEvent.setup();
    const favoriteButton = screen.getByRole("button", { name: "Favoritos" });

    await user.click(favoriteButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/favorites");
  });
});
