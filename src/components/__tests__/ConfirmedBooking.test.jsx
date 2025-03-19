import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ConfirmedBooking from "../ConfirmedBooking";

describe("ConfirmedBooking Component", () => {
  it("renders confirmation message without reservation data", () => {
    render(
      <MemoryRouter>
        <ConfirmedBooking />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /booking confirmed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/successfully submitted/i)).toBeInTheDocument();
  });

  it("renders confirmation message with reservation data", () => {
    // Create a mock location with state
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/confirmed-booking",
            state: {
              reservationData: {
                name: "John Doe",
                date: "2023-06-15",
                time: "19:00",
                guests: "4",
                occasion: "Birthday",
                reservationId: "12345",
              },
            },
          },
        ]}
      >
        <Routes>
          <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /booking confirmed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/19:00/)).toBeInTheDocument();
    expect(screen.getByText(/Birthday/)).toBeInTheDocument();
    expect(screen.getByText(/12345/)).toBeInTheDocument();
  });
});
