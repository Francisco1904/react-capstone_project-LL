import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header component", () => {
  test("renders logo and navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check logo
    expect(
      screen.getByAltText("Little Lemon Restaurant Logo")
    ).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
  });

  test("toggles mobile menu when hamburger icon is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Find hamburger button
    const menuButton = screen.getByLabelText("Open menu");

    // Check initial state
    expect(screen.queryByRole("navigation")).not.toHaveClass(
      "mobile-menu-open"
    );

    // Click menu button
    fireEvent.click(menuButton);

    // Check menu is now open
    expect(screen.getByRole("navigation")).toHaveClass("mobile-menu-open");
  });
});
