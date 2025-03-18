import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Card from "../Card";

describe("Card Component", () => {
  const mockProps = {
    title: "Greek Salad",
    price: 12.99,
    description: "Fresh and delicious Greek salad with feta cheese",
    imageSrc: "/mock-image.jpg",
    imageAlt: "Greek Salad",
  };

  it("renders card with correct content", () => {
    render(
      <BrowserRouter>
        <Card {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Greek Salad")).toBeInTheDocument();
    expect(screen.getByText("$12.99")).toBeInTheDocument();
    expect(
      screen.getByText("Fresh and delicious Greek salad with feta cheese")
    ).toBeInTheDocument();
    expect(screen.getByText("Order a delivery")).toBeInTheDocument();

    const image = screen.getByAltText("Greek Salad");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/mock-image.jpg");
  });
});
