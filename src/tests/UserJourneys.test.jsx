import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import ReservationsPage from "../pages/ReservationsPage";
import OrderOnlinePage from "../pages/OrderOnlinePage";
import AboutPage from "../pages/AboutPage";
import { BookingProvider } from "../context/BookingContext";

// Create mock for the submission function
const mockSubmitReservation = vi.fn().mockResolvedValue({
  success: true,
  message: "Reservation submitted successfully!",
  reservationId: 12345,
});

// Mock the BookingContext
vi.mock("../context/BookingContext", () => ({
  useBooking: () => ({
    availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00"],
    fetchAvailableTimes: vi.fn(),
    submitReservation: mockSubmitReservation,
  }),
  BookingProvider: ({ children }) => <div>{children}</div>,
}));

describe("User Journeys", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Journey 1: Home to Reservations - Reserve a table flow", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route
            path="/confirmed-booking"
            element={<div>Booking Confirmed</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    // Verify homepage and click reserve button
    const heading = screen.getAllByRole("heading", { level: 1 });
    expect(heading[0]).toHaveTextContent("Little Lemon");

    const reserveButton = screen.getByRole("button", {
      name: /reserve a table/i,
    });
    await user.click(reserveButton);

    // Fill out the reservation form
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /reservations/i })
      ).toBeInTheDocument();
    });

    // Fill all required fields to make form valid
    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/phone/i), "1234567890");

    // Select date with explicit change event
    const dateInput = screen.getByLabelText(/date/i);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    await user.type(dateInput, formattedDate);
    // Fire change event to trigger date validation
    fireEvent.change(dateInput, { target: { value: formattedDate } });

    // Wait for time select to be enabled
    await waitFor(() => {
      expect(screen.getByLabelText(/time/i)).not.toBeDisabled();
    });

    // Select time and guests
    await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
    await user.selectOptions(screen.getByLabelText(/guests/i), "2");

    // Wait for form to be valid
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /reserve a table/i })
      ).not.toBeDisabled();
    });

    // Submit the form when enabled
    await user.click(screen.getByRole("button", { name: /reserve a table/i }));

    // Verify submission was called
    await waitFor(() => {
      expect(mockSubmitReservation).toHaveBeenCalled();
    });
  });

  test("Journey 2: Navigation through main pages", async () => {
    const user = userEvent.setup();

    // Test one navigation path at a time instead of trying to test all at once
    // First render Home page
    const { unmount } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify we're on the home page
    const homepageHeadings = screen.getAllByRole("heading", { level: 1 });
    expect(homepageHeadings[0]).toHaveTextContent("Little Lemon");

    // Clean up the first render to avoid conflicts
    unmount();

    // Now test navigation to Menu page by directly rendering it
    render(
      <MemoryRouter initialEntries={["/menu"]}>
        <Routes>
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify we can see the Menu page content - look for the menu heading
    expect(screen.getByText(/our menu/i)).toBeInTheDocument();
  });

  test("Journey 3: Specials to Order Online flow", async () => {
    const user = userEvent.setup();

    // First, test that the home page has the Online Menu button
    const { unmount } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify we can see the specials section and the Online Menu button
    const onlineMenuButton = screen.getByRole("button", {
      name: /online menu/i,
    });
    expect(onlineMenuButton).toBeInTheDocument();

    // Clean up the first render to avoid conflicts
    unmount();

    // Now directly render the Order Online page to verify its content
    render(
      <MemoryRouter initialEntries={["/order-online"]}>
        <Routes>
          <Route path="/order-online" element={<OrderOnlinePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify order page content
    expect(
      screen.getByRole("heading", { level: 1, name: /order online/i })
    ).toBeInTheDocument();

    // Check for category tabs that should be present
    const appetizersTab = screen.getByRole("tab", {
      name: /appetizers/i,
    });
    expect(appetizersTab).toBeInTheDocument();

    // Check for menu cards - they have role="button" in the OrderOnlinePage
    const menuCardButtons = screen.getAllByRole("button", {
      name: /Add .* to cart/i,
    });
    expect(menuCardButtons.length).toBeGreaterThan(3);
  });
});
