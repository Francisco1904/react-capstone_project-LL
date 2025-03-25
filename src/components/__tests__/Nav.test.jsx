import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../Nav";

describe("Nav component", () => {
  test("renders all navigation links", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    // Check if all expected links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
    expect(screen.getByText("Order Online")).toBeInTheDocument();
  });

  test("links have correct routes", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    // Check if links point to the correct routes
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("About").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByText("Menu").closest("a")).toHaveAttribute(
      "href",
      "/menu"
    );
    expect(screen.getByText("Reservations").closest("a")).toHaveAttribute(
      "href",
      "/reservations"
    );
    expect(screen.getByText("Order Online").closest("a")).toHaveAttribute(
      "href",
      "/order-online"
    );
  });
});
