import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Favorites } from ".";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("Favorites page", () => {
  beforeEach(() => {
    render(<Favorites />);
  });

  it("should render elements", () => {
    const buttonToBackHome = screen.getByTitle("Voltar para home");
    const title = screen.getByRole("heading", { name: "Meus Favoritos" });

    expect(buttonToBackHome).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should navigate to home page", async () => {
    const user = userEvent.setup();
    const buttonToBackHome = screen.getByTitle("Voltar para home");

    await user.click(buttonToBackHome);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
