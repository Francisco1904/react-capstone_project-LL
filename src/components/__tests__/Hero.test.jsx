import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "../Hero";

describe("Hero component", () => {
  test("renders hero content correctly", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    // Check main heading
    expect(screen.getByText("Little Lemon")).toBeInTheDocument();

    // Check subheading
    expect(screen.getByText("Chicago")).toBeInTheDocument();

    // Check description text
    expect(
      screen.getByText(/family-owned Mediterranean restaurant/i)
    ).toBeInTheDocument();

    // Check if the image is rendered
    expect(
      screen.getByAltText("Delicious Mediterranean Dish")
    ).toBeInTheDocument();
  });

  test("CTA button links to reservations page", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    // Find the button
    const reserveButton = screen.getByRole("button", {
      name: /reserve a table/i,
    });
    expect(reserveButton).toBeInTheDocument();

    // Check if the button is inside a Link with the correct 'to' prop
    const linkElement = reserveButton.closest("a");
    expect(linkElement).toHaveAttribute("href", "/reservations");
  });
});
